import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { AppState, Linking, Platform } from 'react-native';
import {
  bloqueioPara,
  INTERVALO_DE_CONFERENCIA_MS,
  type AcaoParaLiberar,
  type Bloqueio,
  type SituacaoDaLocalizacao,
} from './localizacao-obrigatoria';
import { pedirPermissao, situacaoDaPermissao } from './rastreamento';

async function situacaoAtual(): Promise<SituacaoDaLocalizacao> {
  if (!(await Location.hasServicesEnabledAsync())) return 'gps_desligado';
  return situacaoDaPermissao();
}

async function podePerguntar(): Promise<boolean> {
  const permissao = await Location.getForegroundPermissionsAsync();
  return permissao.canAskAgain;
}

/** No Android abre o diálogo do sistema "Ligar a localização?"; recusado, cai nos Ajustes. */
async function liberar(acao: AcaoParaLiberar): Promise<void> {
  if (acao === 'ligar_gps') {
    await Location.enableNetworkProviderAsync().catch(async () => Linking.openSettings());
    return;
  }
  if (acao === 'pedir_permissao') {
    await pedirPermissao();
    return;
  }
  await Linking.openSettings();
}

export interface LocalizacaoObrigatoria {
  /** `undefined` enquanto a primeira conferência não terminou; `null` quando está liberado. */
  readonly bloqueio: Bloqueio | null | undefined;
  readonly liberar: () => Promise<void>;
}

/**
 * Confere a localização ao abrir, ao voltar para o app e a cada poucos segundos com ele aberto: o
 * motoboy pode desligar o GPS pela barra de notificações sem sair do app.
 */
export function useLocalizacaoObrigatoria(): LocalizacaoObrigatoria {
  const [bloqueio, setBloqueio] = useState<Bloqueio | null | undefined>(undefined);

  const conferir = useCallback(async (): Promise<void> => {
    const situacao = await situacaoAtual().catch((): SituacaoDaLocalizacao => 'negada');
    const contexto = { android: Platform.OS === 'android', podePerguntar: await podePerguntar() };
    setBloqueio(bloqueioPara(situacao, contexto));
  }, []);

  useEffect(() => {
    // A primeira conferência sai do corpo do efeito (o setState vem depois, de um callback).
    const primeira = setTimeout(() => void conferir(), 0);
    const assinatura = AppState.addEventListener('change', (estado) => {
      if (estado === 'active') void conferir();
    });
    const relogio = setInterval(() => {
      if (AppState.currentState === 'active') void conferir();
    }, INTERVALO_DE_CONFERENCIA_MS);
    return () => {
      clearTimeout(primeira);
      assinatura.remove();
      clearInterval(relogio);
    };
  }, [conferir]);

  const liberarAgora = useCallback(async (): Promise<void> => {
    if (bloqueio === null || bloqueio === undefined) return;
    await liberar(bloqueio.acao).catch(() => undefined);
    await conferir();
  }, [bloqueio, conferir]);

  return { bloqueio, liberar: liberarAgora };
}
