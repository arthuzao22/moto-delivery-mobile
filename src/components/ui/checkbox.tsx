import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { COR_DO_CHROME } from '@/lib/tema';
import { cn } from '@/lib/utils';
import { Text } from './text';

interface Props {
  readonly marcado: boolean;
  readonly rotulo: string;
  readonly detalhe?: string;
  aoTrocar(marcado: boolean): void;
}

/** Caixa de 28 px com a linha inteira tocável, 48 px no mínimo (documento 02 §4). */
export function Checkbox({ marcado, rotulo, detalhe, aoTrocar }: Props): ReactNode {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: marcado }}
      accessibilityLabel={rotulo}
      className="min-h-12 flex-row items-center gap-3 py-2 active:opacity-80"
      onPress={() => {
        void Haptics.selectionAsync();
        aoTrocar(!marcado);
      }}
    >
      <View
        className={cn(
          'h-7 w-7 items-center justify-center rounded-md border-2',
          marcado ? 'border-primary bg-primary' : 'border-input bg-card',
        )}
      >
        {marcado ? <Check color={COR_DO_CHROME.fundo} size={20} strokeWidth={3} /> : null}
      </View>
      <View className="flex-1">
        <Text>{rotulo}</Text>
        {detalhe === undefined ? null : <Text variante="secundario">{detalhe}</Text>}
      </View>
    </Pressable>
  );
}
