import * as Battery from 'expo-battery';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';
import { enviarPendentes, guardarPontos } from './envio';
import { pontoDe } from './fila-de-pontos';

export const TAREFA_DO_GPS = 'gps-do-turno';

/** Um ponto a cada 15 s ou 30 m (documento 04 M2); a M8 ajusta pela bateria medida em campo. */
const INTERVALO_MS = 15_000;
const DISTANCIA_M = 30;
const ENVIO_MINIMO_MS = 15_000;
const CEM = 100;

let ultimoEnvio = 0;
let assinaturaNoExpoGo: Location.LocationSubscription | null = null;

async function bateriaPct(): Promise<number | null> {
  const nivel = await Battery.getBatteryLevelAsync().catch(() => -1);
  return nivel < 0 ? null : Math.round(nivel * CEM);
}

/**
 * Guarda os pontos e manda no máximo um lote a cada 15 s: o rádio do celular gasta bateria.
 * 'turno_fechado' quer dizer que nem os pontos mais novos cabem num turno (o turno acabou, talvez
 * pela central): o GPS para. A fila já saiu inteira; nada válido é descartado.
 */
export async function receberPontos(locais: readonly Location.LocationObject[]): Promise<void> {
  const bateria = await bateriaPct();
  await guardarPontos(locais.map((local) => pontoDe(local, bateria)));
  if (Date.now() - ultimoEnvio < ENVIO_MINIMO_MS) return;
  ultimoEnvio = Date.now();
  if ((await enviarPendentes()) === 'turno_fechado') await pararRastreamento();
}

/** Precisa estar no escopo do módulo: o sistema acorda o app só para rodar esta tarefa. */
TaskManager.defineTask<{ locations: Location.LocationObject[] }>(TAREFA_DO_GPS, async ({ data, error }) => {
  if (error !== null || data === undefined) return;
  await receberPontos(data.locations);
});

/** No Expo Go do Android não há localização em segundo plano: só com o app aberto. */
export function segundoPlanoDisponivel(): boolean {
  return Constants.executionEnvironment !== ExecutionEnvironment.StoreClient;
}

export type SituacaoDaPermissao = 'ok' | 'negada' | 'sem_segundo_plano' | 'aproximada';

/**
 * A API descarta ponto com precisão pior que 100 m: com a localização aproximada, o motoboy sumiria
 * do mapa sem ninguém saber por quê. Por isso a aproximada impede abrir o turno (documento 05 §4.2).
 */
function precisa(permissao: Location.LocationPermissionResponse): boolean {
  if (Platform.OS === 'android') return permissao.android?.accuracy !== 'coarse';
  return permissao.ios?.accuracy !== 'reduced';
}

export async function situacaoDaPermissao(): Promise<SituacaoDaPermissao> {
  const primeiroPlano = await Location.getForegroundPermissionsAsync();
  if (!primeiroPlano.granted) return 'negada';
  if (!precisa(primeiroPlano)) return 'aproximada';
  if (!segundoPlanoDisponivel()) return 'ok';
  const segundoPlano = await Location.getBackgroundPermissionsAsync();
  return segundoPlano.granted ? 'ok' : 'sem_segundo_plano';
}

/** Em duas etapas: "durante o uso" e depois "o tempo todo" (no Android 11+, só em Ajustes). */
export async function pedirPermissao(): Promise<SituacaoDaPermissao> {
  const primeiroPlano = await Location.requestForegroundPermissionsAsync();
  if (!primeiroPlano.granted) return 'negada';
  if (!precisa(primeiroPlano)) return 'aproximada';
  if (!segundoPlanoDisponivel()) return 'ok';
  const segundoPlano = await Location.requestBackgroundPermissionsAsync();
  return segundoPlano.granted ? 'ok' : 'sem_segundo_plano';
}

async function iniciarNoExpoGo(): Promise<void> {
  if (assinaturaNoExpoGo !== null) return;
  assinaturaNoExpoGo = await Location.watchPositionAsync(
    { accuracy: Location.Accuracy.High, timeInterval: INTERVALO_MS, distanceInterval: DISTANCIA_M },
    (local) => void receberPontos([local]),
  );
}

/** Liga o GPS do turno. Chamado ao abrir o turno e a cada abertura do app com o turno aberto. */
export async function iniciarRastreamento(): Promise<void> {
  if (!segundoPlanoDisponivel()) return iniciarNoExpoGo();
  if (await Location.hasStartedLocationUpdatesAsync(TAREFA_DO_GPS)) return;
  await Location.startLocationUpdatesAsync(TAREFA_DO_GPS, {
    accuracy: Location.Accuracy.High,
    timeInterval: INTERVALO_MS,
    distanceInterval: DISTANCIA_M,
    // iOS: sem isso, o GPS pausa quando a moto para no semáforo.
    pausesUpdatesAutomatically: false,
    activityType: Location.ActivityType.OtherNavigation,
    showsBackgroundLocationIndicator: true,
    // Android: a notificação fixa é obrigatória para o serviço em primeiro plano.
    foregroundService: {
      notificationTitle: 'Turno aberto',
      notificationBody: 'A central vê sua posição enquanto o turno estiver aberto.',
    },
  });
}

/**
 * Desliga o GPS. Os pontos que sobraram ficam na fila: a API os associa ao turno do instante em
 * que foram registrados, então o trajeto até o encerramento (inclusive offline) entra na trilha.
 * Eles saem agora, se houver sinal, ou quando o sinal voltar.
 */
export async function pararRastreamento(): Promise<void> {
  assinaturaNoExpoGo?.remove();
  assinaturaNoExpoGo = null;
  const ligado = await Location.hasStartedLocationUpdatesAsync(TAREFA_DO_GPS).catch(() => false);
  if (ligado) await Location.stopLocationUpdatesAsync(TAREFA_DO_GPS);
  void enviarPendentes().catch(() => undefined);
}
