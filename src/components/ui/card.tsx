import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

/** Superfície da marca (documento 01 §4): cantos de 16 px, borda fina, sem sombra. */
export function Card({ className, ...props }: ViewProps & { readonly className?: string }): ReactNode {
  return <View className={cn('rounded-2xl border border-border bg-card', className)} {...props} />;
}

/** Linhas de uma lista dentro do card, separadas por uma borda fina. */
export function LinhaDoCard({
  primeira,
  className,
  ...props
}: ViewProps & { readonly primeira: boolean; readonly className?: string }): ReactNode {
  return <View className={cn('px-4 py-3', !primeira && 'border-t border-border', className)} {...props} />;
}
