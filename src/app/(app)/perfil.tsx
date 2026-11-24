import { Building2, Mail, Moon, Server, Smartphone, Sun, type LucideIcon } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { BASE_DA_API, VERSAO_DO_APP } from '@/api/cliente';
import { useEu } from '@/api/eu';
import { TelaDeAba } from '@/components/app/barra-de-abas';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { Secao } from '@/components/app/comum/secao';
import { FaixaDoTopo } from '@/components/app/faixa-do-topo';
import { Button } from '@/components/ui/button';
import { Card, LinhaDoCard } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { PREFERENCIAS_DE_TEMA, type PreferenciaDeTema } from '@/lib/preferencia-de-tema';
import { useCores, useTema } from '@/lib/provedor-de-tema';
import { cn } from '@/lib/utils';
import { useSessao } from '@/sessao/provedor-de-sessao';

const TEMAS: Readonly<Record<PreferenciaDeTema, { rotulo: string; icone: LucideIcon }>> = {
  escuro: { rotulo: 'Escuro', icone: Moon },
  claro: { rotulo: 'Claro', icone: Sun },
  sistema: { rotulo: 'Sistema', icone: Smartphone },
};

const TAMANHO_DO_ICONE = 18;

function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  return `${partes[0]?.[0] ?? ''}${partes.length > 1 ? (partes.at(-1)?.[0] ?? '') : ''}`.toUpperCase();
}

/** Perfil (documento 02 §1): conta, aparência, diagnóstico e o sair, disponível também em rota. */
export default function Perfil(): ReactNode {
  const eu = useEu();
  const { sair } = useSessao();
  const [saindo, setSaindo] = useState(false);
  const nome = eu.data?.usuario.nome ?? '';
  return (
    <TelaDeAba>
      <FaixaDoTopo titulo="Perfil" />
      <ScrollView contentContainerClassName="gap-5 px-4 py-6">
        <View className="items-center gap-2 py-2">
          <View className="h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary">
            <Text className="font-bold text-2xl text-heading">{iniciais(nome)}</Text>
          </View>
          <Text variante="titulo">{nome === '' ? ' ' : nome}</Text>
          <Text variante="secundario">Motoboy</Text>
        </View>
        <Secao titulo="Conta">
          <Card>
            <Linha icone={Mail} rotulo="E-mail" valor={eu.data?.usuario.email ?? ''} primeira />
            <Linha icone={Building2} rotulo="Empresa" valor={eu.data?.organizacaoAtiva?.nome ?? ''} />
          </Card>
        </Secao>
        <Secao titulo="Aparência">
          <SeletorDeTema />
        </Secao>
        <Secao titulo="Diagnóstico">
          <Card>
            <Linha icone={Smartphone} rotulo="Versão do app" valor={VERSAO_DO_APP} primeira mono />
            <Linha icone={Server} rotulo="Servidor" valor={BASE_DA_API ?? 'não configurado'} mono />
          </Card>
        </Secao>
      </ScrollView>
      <BarraDeAcao>
        <Button
          variante="contorno"
          disabled={saindo}
          onPress={() => {
            setSaindo(true);
            void sair();
          }}
        >
          <Text>{saindo ? 'Saindo…' : 'Sair da conta'}</Text>
        </Button>
        <Text variante="secundario" className="text-center text-xs">
          Sair desliga o GPS do turno e apaga o que ainda esperava o sinal.
        </Text>
      </BarraDeAcao>
    </TelaDeAba>
  );
}

function Linha(props: {
  readonly icone: LucideIcon;
  readonly rotulo: string;
  readonly valor: string;
  readonly primeira?: boolean;
  readonly mono?: boolean;
}): ReactNode {
  const { icone: Icone } = props;
  const cores = useCores();
  return (
    <LinhaDoCard primeira={props.primeira === true} className="flex-row items-center gap-3">
      <Icone color={cores.muted} size={TAMANHO_DO_ICONE} strokeWidth={2} />
      <View className="flex-1">
        <Text variante="secundario" className="text-xs">
          {props.rotulo}
        </Text>
        <Text variante={props.mono === true ? 'mono' : 'corpo'} numberOfLines={1}>
          {props.valor}
        </Text>
      </View>
    </LinhaDoCard>
  );
}

function SeletorDeTema(): ReactNode {
  const { preferencia, escolher } = useTema();
  const cores = useCores();
  return (
    <View className="flex-row gap-2" accessibilityRole="radiogroup">
      {PREFERENCIAS_DE_TEMA.map((opcao) => {
        const { rotulo, icone: Icone } = TEMAS[opcao];
        const ativo = preferencia === opcao;
        return (
          <Pressable
            key={opcao}
            accessibilityRole="radio"
            accessibilityState={{ selected: ativo }}
            onPress={() => escolher(opcao)}
            className={cn(
              'h-20 flex-1 items-center justify-center gap-1 rounded-2xl border',
              ativo ? 'border-primary bg-primary/10' : 'border-border bg-card',
            )}
          >
            <Icone color={ativo ? cores.brandText : cores.muted} size={22} strokeWidth={2} />
            <Text className={ativo ? 'font-semibold text-brand-text' : 'text-foreground'}>{rotulo}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
