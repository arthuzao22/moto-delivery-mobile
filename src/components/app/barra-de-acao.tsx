import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FOLGA_MINIMA = 16;

/**
 * Barra inferior fixa com a ação principal, na zona do polegar (documento 01 §4). Usa o
 * `insets.bottom` nos dois sistemas: indicador de home no iPhone, gestos ou botões no Android.
 */
export function BarraDeAcao({ children }: { readonly children: ReactNode }): ReactNode {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="gap-3 border-t border-border bg-background px-4 pt-4"
      style={{ paddingBottom: Math.max(bottom, FOLGA_MINIMA) }}
    >
      {children}
    </View>
  );
}
