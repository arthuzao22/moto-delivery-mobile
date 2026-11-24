import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useCores } from '@/lib/provedor-de-tema';
import { cn } from '@/lib/utils';
import { Text } from './text';

/**
 * Etiqueta de estado (mesma regra do painel web, 01 §2.4): texto + ícone + tom neutro. Laranja só
 * para "precisa de ação agora"; vermelho só para erro. Sem verde.
 */
const variantesDaEtiqueta = cva('h-6 flex-row items-center gap-1 self-start rounded-full border px-2.5', {
  variants: {
    variante: {
      neutro: 'border-transparent bg-secondary',
      contorno: 'border-border',
      atencao: 'border-attention/40 bg-attention/10',
      apagado: 'border-transparent bg-muted/60',
      destrutivo: 'border-destructive/40 bg-destructive/10',
    },
  },
  defaultVariants: { variante: 'neutro' },
});

const TEXTO = {
  neutro: 'text-secondary-foreground',
  contorno: 'text-foreground',
  atencao: 'text-brand-text',
  apagado: 'text-muted-foreground',
  destrutivo: 'text-destructive',
} as const;

const TAMANHO_DO_ICONE = 13;

export type VarianteDaEtiqueta = NonNullable<VariantProps<typeof variantesDaEtiqueta>['variante']>;

function corDoIcone(variante: VarianteDaEtiqueta, cores: ReturnType<typeof useCores>): string {
  if (variante === 'atencao') return cores.brandText;
  if (variante === 'destrutivo') return cores.destructive;
  if (variante === 'apagado') return cores.muted;
  return cores.foreground;
}

export function Badge(props: {
  readonly rotulo: string;
  readonly variante?: VarianteDaEtiqueta;
  readonly icone?: LucideIcon;
  readonly className?: string;
}): ReactNode {
  const { rotulo, variante = 'neutro', icone: Icone, className } = props;
  const cores = useCores();
  return (
    <View className={cn(variantesDaEtiqueta({ variante }), className)}>
      {Icone === undefined ? null : (
        <Icone color={corDoIcone(variante, cores)} size={TAMANHO_DO_ICONE} strokeWidth={2} />
      )}
      <Text className={cn('font-medium text-xs', TEXTO[variante])}>{rotulo}</Text>
    </View>
  );
}
