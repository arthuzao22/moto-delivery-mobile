import type { ReactNode } from 'react';
import { View } from 'react-native';
import { feita } from '@/lib/parada-atual';
import { cn } from '@/lib/utils';

interface Props {
  readonly paradas: readonly {
    readonly entregaId: string;
    readonly status: string;
    readonly ordem: number | null;
  }[];
  readonly atualId: string | null;
}

/** Uma barra por parada: feita, atual ou pendente (documento 02 §4, StopProgress). */
export function ProgressoDasParadas({ paradas, atualId }: Props): ReactNode {
  const contam = paradas.filter((parada) => parada.status !== 'cancelada');
  return (
    <View className="flex-row gap-1.5" accessibilityElementsHidden>
      {contam.map((parada) => (
        <View
          key={parada.entregaId}
          className={cn(
            'h-1.5 flex-1 rounded-full',
            feita(parada) ? 'bg-foreground' : parada.entregaId === atualId ? 'bg-primary' : 'bg-secondary',
          )}
        />
      ))}
    </View>
  );
}
