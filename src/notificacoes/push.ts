import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { api, VERSAO_DO_APP } from '@/api/cliente';
import { dadosDe } from '@/api/executar';
import { guardarTokenDePush } from '@/sessao/armazem';

/**
 * Canal dos avisos sem som (A5 na API: `rota.transferida` e as decisões sobre a entrega).
 * O canal `ofertas` entra na M3 junto com o `oferta.wav`: no Android, o som de um canal não muda
 * depois de criado, então criá-lo agora sem o som prenderia o canal ao som padrão.
 */
export async function criarCanais(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('avisos', {
    name: 'Avisos da entrega',
    description: 'Decisões da central e do restaurante sobre as suas entregas.',
    importance: Notifications.AndroidImportance.HIGH,
    sound: null,
    vibrationPattern: [0, 250],
  });
}

/** Push remoto não existe no Expo Go (Android, desde o SDK 53) nem em emulador. */
export function pushDisponivel(): boolean {
  return Device.isDevice && Constants.executionEnvironment !== ExecutionEnvironment.StoreClient;
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
 * token na API (`POST /app/dispositivo`). Não pede permissão: quem pede é a tela que explica o motivo.
 */
export async function registrarAparelho(): Promise<SituacaoDoPush> {
  if (!pushDisponivel()) return 'indisponivel';
  await criarCanais();
  const { granted } = await Notifications.getPermissionsAsync();
  if (!granted) return 'sem_permissao';
  const projectId = projetoNoEas();
  if (projectId === null) return 'indisponivel';
  const { data: expoToken } = await Notifications.getExpoPushTokenAsync({ projectId });
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
  const { granted } = await Notifications.requestPermissionsAsync();
  return granted;
}
