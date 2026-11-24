import { useMemo, type ReactNode } from 'react';
import { View } from 'react-native';
import { useEu } from '@/api/eu';
import { Text } from '@/components/ui/text';
import { dataPorExtenso } from '@/lib/datas';

/** As iniciais do nome no círculo, como o avatar do painel web. */
function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? '';
  const ultima = partes.length > 1 ? (partes.at(-1)?.[0] ?? '') : '';
  return `${primeira}${ultima}`.toUpperCase();
}

/** Saudação com o dia por extenso e a empresa, com o avatar à direita. */
export function CabecalhoDoDia(): ReactNode {
  const eu = useEu();
  const hoje = useMemo(() => dataPorExtenso(new Date()), []);
  const nome = eu.data?.usuario.nome ?? '';
  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-1 gap-0.5">
        <Text variante="eyebrow">{hoje}</Text>
        <Text variante="titulo">{nome === '' ? 'Olá!' : `Olá, ${nome.split(' ')[0] ?? nome}!`}</Text>
        <Text variante="secundario">{eu.data?.organizacaoAtiva?.nome ?? ' '}</Text>
      </View>
      {nome === '' ? null : (
        <View className="h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary">
          <Text className="font-semibold text-heading">{iniciais(nome)}</Text>
        </View>
      )}
    </View>
  );
}
