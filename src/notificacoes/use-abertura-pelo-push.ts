import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { moduloDeNotificacoes } from './push';

interface ToqueNoPush {
  readonly notification: {
    readonly request: { readonly content: { readonly data?: Record<string, unknown> | null } };
  };
}

function ofertaDoToque(toque: ToqueNoPush | null): string | null {
  const dados = toque?.notification.request.content.data ?? {};
  const ofertaId = dados.ofertaId;
  return dados.tipo === 'oferta.nova' && typeof ofertaId === 'string' ? ofertaId : null;
}

/**
 * Tocar no push abre a tela certa (documento 05 §4.3): a oferta vai direto para a tela da oferta;
 * os demais avisos abrem o Início, que lê a situação de novo. Vale também quando o toque abriu o
 * app. No Expo Go não há push, e o módulo nem é carregado.
 */
export function useAberturaPeloPush(): void {
  const router = useRouter();

  useEffect(() => {
    let cancelar = (): void => undefined;
    const abrir = (toque: ToqueNoPush | null): void => {
      const id = ofertaDoToque(toque);
      if (id !== null) router.push({ pathname: '/oferta/[id]', params: { id } });
    };
    const ouvir = async (): Promise<void> => {
      const notificacoes = await moduloDeNotificacoes();
      if (notificacoes === null) return;
      abrir(await notificacoes.getLastNotificationResponseAsync());
      await notificacoes.clearLastNotificationResponseAsync().catch(() => undefined);
      const assinatura = notificacoes.addNotificationResponseReceivedListener(abrir);
      cancelar = () => assinatura.remove();
    };
    void ouvir().catch(() => undefined);
    return () => cancelar();
  }, [router]);
}
