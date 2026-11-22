import * as Haptics from 'expo-haptics';
import { ChevronsRight } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { Text } from '@/components/ui/text';
import { COR_DO_CHROME } from '@/lib/tema';
import { cn } from '@/lib/utils';

/** Trilho de 56 px e polegar quadrado do mesmo tamanho (documento 01 §4 e §6). */
const TAMANHO_DO_POLEGAR = 56;
/** Precisa chegar a 90% do trilho: soltar antes volta, para o toque acidental não confirmar. */
const FRACAO_PARA_CONFIRMAR = 0.9;
const MOLA = { damping: 20, stiffness: 300 } as const;

interface Props {
  readonly texto: string;
  readonly desabilitado?: boolean;
  aoConfirmar(): void;
}

/**
 * Deslizar para confirmar (documento 02 §2): para ações irreversíveis com a moto em movimento,
 * como encerrar o turno e concluir a entrega. O polegar acompanha o dedo; soltar antes do fim volta.
 */
export function DeslizarParaConfirmar({ texto, desabilitado = false, aoConfirmar }: Props): ReactNode {
  const [largura, setLargura] = useState(0);
  const deslocamento = useSharedValue(0);
  const percurso = Math.max(largura - TAMANHO_DO_POLEGAR, 0);

  const confirmar = (): void => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    aoConfirmar();
  };

  const gesto = Gesture.Pan()
    .enabled(!desabilitado && percurso > 0)
    .onUpdate((evento) => {
      deslocamento.value = Math.min(Math.max(evento.translationX, 0), percurso);
    })
    .onEnd(() => {
      const chegou = deslocamento.value >= percurso * FRACAO_PARA_CONFIRMAR;
      deslocamento.value = withSpring(chegou ? percurso : 0, MOLA);
      if (chegou) scheduleOnRN(confirmar);
    });

  const estiloDoPolegar = useAnimatedStyle(() => ({ transform: [{ translateX: deslocamento.value }] }));

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={texto}
      accessibilityActions={[{ name: 'activate', label: texto }]}
      onAccessibilityAction={() => !desabilitado && confirmar()}
      onLayout={(evento: LayoutChangeEvent) => setLargura(evento.nativeEvent.layout.width)}
      className={cn('h-14 w-full justify-center rounded-xl bg-secondary', desabilitado && 'opacity-50')}
    >
      <Text className="text-center font-semibold text-[17px] text-muted-foreground">{texto}</Text>
      <GestureDetector gesture={gesto}>
        <Animated.View
          style={estiloDoPolegar}
          className="absolute left-0 h-14 w-14 items-center justify-center rounded-xl bg-primary"
        >
          <ChevronsRight color={COR_DO_CHROME.fundo} size={28} strokeWidth={2.5} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
