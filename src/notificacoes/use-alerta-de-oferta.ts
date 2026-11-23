import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { useEffect } from 'react';
import { Vibration } from 'react-native';
import somDaOferta from '../../assets/sons/oferta.wav';

/** Vibra 0,6 s, para 0,4 s, e repete enquanto o alerta tocar. */
const PADRAO_DE_VIBRACAO = [0, 600, 400];

/**
 * O alerta da oferta com o app aberto (documento 01 §5): o som próprio em repetição e a vibração,
 * até a tela fechar (aceitou, recusou ou expirou). Toca mesmo com o iPhone no silencioso e abaixa
 * a música de outro app enquanto toca. O volume é o de mídia do celular: o app não o altera.
 */
export function useAlertaDeOferta(ativo: boolean): void {
  useEffect(() => {
    if (!ativo) return;
    const player = createAudioPlayer(somDaOferta);
    const tocar = async (): Promise<void> => {
      await setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'duckOthers' }).catch(
        () => undefined,
      );
      player.loop = true;
      player.volume = 1;
      player.play();
    };
    void tocar();
    Vibration.vibrate(PADRAO_DE_VIBRACAO, true);
    return () => {
      Vibration.cancel();
      player.pause();
      player.remove();
    };
  }, [ativo]);
}
