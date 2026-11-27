import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { useSyncExternalStore } from 'react';
import { enviarPendentes } from '@/gps/envio';
import { enviarFila, lerEstado, ouvirFila, type EstadoDaFila } from './envio-da-fila';
import { enviarNaOrdem } from './ordem-de-envio';

/**
 * O TanStack Query passa a saber do sinal pelo NetInfo: sem sinal, as consultas esperam (a tela
 * mantém o que já tinha) e voltam sozinhas. Quando o sinal volta, saem os pontos de GPS e depois a fila de ações, na ordem.
 * Chamado uma vez, no escopo do layout raiz.
 */
export function ligarConexao(): void {
  onlineManager.setEventListener((definir) =>
    NetInfo.addEventListener((estado) => {
      const online = estado.isConnected === true && estado.isInternetReachable !== false;
      definir(online);
      if (online) void enviarNaOrdem(enviarPendentes, enviarFila).catch(() => undefined);
    }),
  );
}

/** Sem sinal agora? `null` enquanto o NetInfo ainda não respondeu (não mostra aviso à toa). */
export function useSemSinal(): boolean {
  const { isConnected, isInternetReachable } = useNetInfo();
  return isConnected === false || isInternetReachable === false;
}

export function useEstadoDaFila(): EstadoDaFila {
  return useSyncExternalStore(ouvirFila, lerEstado);
}
