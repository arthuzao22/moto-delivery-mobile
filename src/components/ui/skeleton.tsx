import type { ReactNode } from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

/** Bloco de carregamento no formato do conteúdo (documento 02 §5): cinza, sem animação colorida. */
export function Skeleton({ className }: { readonly className?: string }): ReactNode {
  return <View accessibilityElementsHidden className={cn('rounded-xl bg-muted', className)} />;
}
