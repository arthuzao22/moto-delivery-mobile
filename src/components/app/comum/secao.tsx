import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

/** Título de seção (eyebrow) com uma ação opcional à direita. */
export function Secao(props: {
  readonly titulo: string;
  readonly acao?: ReactNode;
  readonly children: ReactNode;
}): ReactNode {
  return (
    <View className="gap-2">
      <View className="min-h-6 flex-row items-center justify-between">
        <Text variante="eyebrow">{props.titulo}</Text>
        {props.acao}
      </View>
      {props.children}
    </View>
  );
}
