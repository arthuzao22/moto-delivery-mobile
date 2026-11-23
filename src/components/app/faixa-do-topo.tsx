import { Moon, Smartphone, Sun, type LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { AvisoDeSinal } from './aviso-de-sinal';
import { proximaPreferencia, type PreferenciaDeTema } from '@/lib/preferencia-de-tema';
import { useTema } from '@/lib/provedor-de-tema';
import { COR_DO_CHROME } from '@/lib/tema';

const ICONE_DO_TEMA: Readonly<Record<PreferenciaDeTema, LucideIcon>> = {
  escuro: Moon,
  claro: Sun,
  sistema: Smartphone,
};

const NOME_DO_TEMA: Readonly<Record<PreferenciaDeTema, string>> = {
  escuro: 'Tema escuro',
  claro: 'Tema claro',
  sistema: 'Tema do sistema',
};

const TAMANHO_DO_ICONE = 24;

/**
 * Faixa escura atrás da status bar, nos dois temas (documento 01 §1). No Android 15 o app é
 * sempre edge-to-edge e não dá para pintar a status bar: a faixa faz esse papel (documento 05 §4.6).
 */
export function FaixaDoTopo({ titulo }: { readonly titulo: string }): ReactNode {
  const { top } = useSafeAreaInsets();
  const { preferencia, escolher } = useTema();
  const Icone = ICONE_DO_TEMA[preferencia];
  return (
    <View className="border-b border-chrome-border bg-chrome px-4 pb-2" style={{ paddingTop: top }}>
      <View className="h-12 flex-row items-center justify-between">
        <Text className="font-semibold text-[17px] text-chrome-foreground">{titulo}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${NOME_DO_TEMA[preferencia]}. Toque para trocar.`}
          hitSlop={8}
          className="h-12 w-12 items-center justify-center active:opacity-70"
          onPress={() => escolher(proximaPreferencia(preferencia))}
        >
          <Icone color={COR_DO_CHROME.texto} size={TAMANHO_DO_ICONE} strokeWidth={2} />
        </Pressable>
      </View>
      <AvisoDeSinal />
    </View>
  );
}
