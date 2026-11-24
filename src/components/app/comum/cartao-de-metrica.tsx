import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { useCores } from '@/lib/provedor-de-tema';
import { cn } from '@/lib/utils';

const TAMANHO_DO_ICONE = 16;

/** Card de métrica do painel web (02 §4): ícone num quadrado de cor, rótulo pequeno e número grande. */
export function CartaoDeMetrica(props: {
  readonly rotulo: string;
  /** Null enquanto carrega: mostra o bloco cinza no lugar do número. */
  readonly valor: string | null;
  readonly icone: LucideIcon;
  readonly detalhe?: string;
  readonly destaque?: boolean;
}): ReactNode {
  const { rotulo, valor, icone: Icone, detalhe, destaque = false } = props;
  const cores = useCores();
  return (
    <Card className={cn('flex-1 gap-1 p-4', destaque && 'border-attention/50 bg-attention/5')}>
      <View className="flex-row items-center gap-2">
        <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Icone color={cores.brandText} size={TAMANHO_DO_ICONE} strokeWidth={2} />
        </View>
        <Text className="flex-1 text-xs leading-4 text-muted-foreground" numberOfLines={2}>
          {rotulo}
        </Text>
      </View>
      {valor === null ? (
        <Skeleton className="mt-1 h-7 w-20" />
      ) : (
        <Text
          className="mt-1 font-semibold text-2xl tabular-nums text-heading"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {valor}
        </Text>
      )}
      {detalhe === undefined ? null : <Text className="text-xs text-muted-foreground">{detalhe}</Text>}
    </Card>
  );
}
