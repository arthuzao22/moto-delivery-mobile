import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Device from 'expo-device';
// Só o tipo: o módulo em si é carregado sob demanda, fora do Expo Go.
import type * as ExpoNotifications from 'expo-notifications';
import { Platform } from 'react-native';
import { api, VERSAO_DO_APP } from '@/api/cliente';
import { dadosDe } from '@/api/executar';
import { guardarTokenDePush } from '@/sessao/armazem';

/** Push remoto não existe no Expo Go (Android, desde o SDK 53) nem em emulador. */
export function pushDisponivel(): boolean {
  return Device.isDevice && Constants.executionEnvironment !== ExecutionEnvironment.StoreClient;
}

/**
 * O módulo só é carregado onde o push existe: no Expo Go, só importá-lo já mostra os avisos de
 * "não suportado". Fora do build de desenvolvimento, devolve null.
 */
export async function moduloDeNotificacoes(): Promise<typeof ExpoNotifications | null> {
  return pushDisponivel() ? import('expo-notifications') : null;
}

/**
 * Dois canais (A5 na API): "ofertas", com o som próprio (assets/sons/oferta.wav), importância máxima
 * e vibração longa; "avisos", sem som, para as decisões sobre a entrega. No Android o som de um canal
 * não muda depois de criado: trocar o som da oferta exige um canal com outro id (e a API junto).
 */
async function criarCanais(notificacoes: typeof ExpoNotifications): Promise<void> {
  if (Platform.OS !== 'android') return;
  await notificacoes.setNotificationChannelAsync('ofertas', {
    name: 'Ofertas de rota',
    description: 'Toca alto quando chega uma rota para você aceitar.',
    importance: notificacoes.AndroidImportance.MAX,
    sound: 'oferta.wav',
    vibrationPattern: [0, 600, 400, 600, 400, 600],
    enableVibrate: true,
    lockscreenVisibility: notificacoes.AndroidNotificationVisibility.PUBLIC,
    audioAttributes: { usage: notificacoes.AndroidAudioUsage.NOTIFICATION_RINGTONE },
  });
  await notificacoes.setNotificationChannelAsync('avisos', {
    name: 'Avisos da entrega',
    description: 'Decisões da central e do restaurante sobre as suas entregas.',
    importance: notificacoes.AndroidImportance.HIGH,
    sound: null,
    vibrationPattern: [0, 250],
  });
}

export type SituacaoDoPush = 'indisponivel' | 'sem_permissao' | 'registrado';

function projetoNoEas(): string | null {
  const extra: unknown = Constants.expoConfig?.extra;
  if (typeof extra !== 'object' || extra === null || !('eas' in extra)) return null;
  const { eas } = extra;
  if (typeof eas !== 'object' || eas === null || !('projectId' in eas)) return null;
  return typeof eas.projectId === 'string' ? eas.projectId : null;
}

/**
 * A cada abertura (o Expo pode trocar o token): cria os canais, confere a permissão e registra o
 * token na API (POST /app/dispositivo). Não pede permissão: quem pede é a tela que explica o motivo.
 */
export async function registrarAparelho(): Promise<SituacaoDoPush> {
  const notificacoes = await moduloDeNotificacoes();
  const projectId = projetoNoEas();
  if (notificacoes === null || projectId === null) return 'indisponivel';
  await criarCanais(notificacoes);
  const { granted } = await notificacoes.getPermissionsAsync();
  if (!granted) return 'sem_permissao';
  const { data: expoToken } = await notificacoes.getExpoPushTokenAsync({ projectId });
  const plataforma = Platform.OS === 'ios' ? 'ios' : 'android';
  await dadosDe(
    api.POST('/app/dispositivo', {
      params: { header: { 'Idempotency-Key': `dispositivo-${expoToken}-${Date.now()}` } },
      body: { expoToken, plataforma, appVersao: VERSAO_DO_APP },
    }),
  );
  await guardarTokenDePush(expoToken);
  return 'registrado';
}

/** O pedido do sistema, depois que a tela explicou "para você receber as ofertas" (documento 02 §6). */
export async function pedirPermissao(): Promise<boolean> {
  const notificacoes = await moduloDeNotificacoes();
  if (notificacoes === null) return false;
  const { granted } = await notificacoes.requestPermissionsAsync();
  return granted;
}
