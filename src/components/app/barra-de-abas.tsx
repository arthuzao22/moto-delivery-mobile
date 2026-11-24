import { usePathname, useRouter } from 'expo-router';
import { House, PackageCheck, Receipt, User, Wallet, type LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { COR_DA_ABA_ATIVA, COR_DO_CHROME } from '@/lib/tema';
import { cn } from '@/lib/utils';
import { DentroDasAbas } from './barra-de-acao';

type Caminho = '/' | '/entregas' | '/caixa' | '/extrato' | '/perfil';

const ABAS: readonly { caminho: Caminho; rotulo: string; Icone: LucideIcon }[] = [
  { caminho: '/', rotulo: 'Início', Icone: House },
  { caminho: '/entregas', rotulo: 'Entregas', Icone: PackageCheck },
  { caminho: '/caixa', rotulo: 'Caixa', Icone: Wallet },
  { caminho: '/extrato', rotulo: 'Extrato', Icone: Receipt },
  { caminho: '/perfil', rotulo: 'Perfil', Icone: User },
];

const FOLGA_MINIMA = 8;
const TAMANHO_DO_ICONE = 24;
const TRACO_ATIVO = 2.5;
const TRACO = 2;

/**
 * Barra de abas sempre escura com borda #222 e a ativa em laranja, com traço mais grosso no lugar
 * do ícone preenchido (documento 01 §1). Continua visível durante a rota (documento 02 §1).
 */
function BarraDeAbas(): ReactNode {
  const router = useRouter();
  const atual = usePathname();
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      accessibilityRole="tablist"
      className="flex-row border-t border-chrome-border bg-chrome pt-1"
      style={{ paddingBottom: Math.max(bottom, FOLGA_MINIMA) }}
    >
      {ABAS.map(({ caminho, rotulo, Icone }) => {
        const ativa = atual === caminho;
        return (
          <Pressable
            key={caminho}
            accessibilityRole="tab"
            accessibilityState={{ selected: ativa }}
            accessibilityLabel={rotulo}
            className="min-h-14 flex-1 items-center justify-center gap-1 active:opacity-70"
            onPress={() => (ativa ? undefined : router.replace(caminho))}
          >
            <Icone
              color={ativa ? COR_DA_ABA_ATIVA : COR_DO_CHROME.texto}
              size={TAMANHO_DO_ICONE}
              strokeWidth={ativa ? TRACO_ATIVO : TRACO}
            />
            <Text className={cn('text-xs', ativa ? 'font-semibold text-primary' : 'text-chrome-foreground')}>
              {rotulo}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Uma tela de aba: o conteúdo em cima e a barra de abas embaixo, que cuida da área segura. */
export function TelaDeAba({ children }: { readonly children: ReactNode }): ReactNode {
  return (
    <DentroDasAbas.Provider value>
      <View className="flex-1 bg-background">
        {children}
        <BarraDeAbas />
      </View>
    </DentroDasAbas.Provider>
  );
}
