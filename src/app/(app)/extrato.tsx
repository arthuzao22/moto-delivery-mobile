import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Hourglass,
  Receipt,
  TrendingUp,
  XCircle,
  type LucideIcon,
} from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { Pressable, RefreshControl, ScrollView, View } from 'react-native';
import { useExtrato, useFechamentos, type Extrato, type Fechamento } from '@/api/dinheiro-do-motoboy';
import { ehErroDaApi } from '@/api/erro-da-api';
import { TelaDeAba } from '@/components/app/barra-de-abas';
import { CartaoDeMetrica } from '@/components/app/comum/cartao-de-metrica';
import { EstadoVazio } from '@/components/app/comum/estado-vazio';
import { FiltroDePeriodo } from '@/components/app/comum/filtro-de-periodo';
import { Secao } from '@/components/app/comum/secao';
import { FaixaDoTopo } from '@/components/app/faixa-do-topo';
import { Badge, type VarianteDaEtiqueta } from '@/components/ui/badge';
import { Card, LinhaDoCard } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { formatarData, formatarDia } from '@/lib/datas';
import { formatarReais } from '@/lib/dinheiro';
import { periodoDoAtalho, type Periodo } from '@/lib/periodo';
import { useCores } from '@/lib/provedor-de-tema';

/** Os componentes do cálculo (mesma lista da API), com o nome que o motoboy entende. */
const COMPONENTE: Readonly<Record<string, string>> = {
  fixo_periodo: 'Valor fixo do período',
  por_entrega: 'Por entrega',
  por_km: 'Por km',
  faixa_distancia: 'Faixa de distância',
  parada_adicional: 'Parada adicional',
  retorno: 'Retorno ao restaurante',
  espera: 'Tempo de espera',
  adicional_horario: 'Adicional de horário',
  adicional_dia: 'Adicional do dia',
  adicional_condicao: 'Adicional de condição',
  bonus_meta: 'Bônus de meta',
  garantia_minima: 'Garantia mínima',
  percentual_cobranca: 'Percentual da entrega',
  desconto: 'Desconto',
  cancelamento: 'Cancelamento',
  ajuste: 'Ajuste',
};

const SITUACAO_DO_FECHAMENTO: Readonly<
  Record<string, { rotulo: string; variante: VarianteDaEtiqueta; icone: LucideIcon }>
> = {
  aberto: { rotulo: 'Em aberto', variante: 'contorno', icone: Clock3 },
  em_conferencia: { rotulo: 'Em conferência', variante: 'contorno', icone: Hourglass },
  aprovado: { rotulo: 'Aprovado, a pagar', variante: 'atencao', icone: Clock3 },
  pago: { rotulo: 'Pago', variante: 'neutro', icone: CheckCircle2 },
  cancelado: { rotulo: 'Cancelado', variante: 'apagado', icone: XCircle },
};

/**
 * Extrato (documento 04 M7): quanto ganhou e por quê. A memória de cálculo de cada valor vem
 * pronta da API ("R$ 5,00 por entrega + R$ 1,20 por km"); o app não calcula nada.
 */
export default function TelaDoExtrato(): ReactNode {
  const [periodo, setPeriodo] = useState<Periodo>(() => periodoDoAtalho('semana', new Date()));
  const extrato = useExtrato(periodo);
  const fechamentos = useFechamentos();
  const atualizar = (): void => {
    void extrato.refetch();
    void fechamentos.refetch();
  };
  return (
    <TelaDeAba>
      <FaixaDoTopo titulo="Extrato" />
      <ScrollView
        contentContainerClassName="gap-5 px-4 py-6"
        refreshControl={<RefreshControl refreshing={extrato.isRefetching} onRefresh={atualizar} />}
      >
        <FiltroDePeriodo periodo={periodo} aoMudar={setPeriodo} />
        <Ganhos consulta={extrato} />
        <Fechamentos consulta={fechamentos} />
      </ScrollView>
    </TelaDeAba>
  );
}

function Ganhos({ consulta }: { readonly consulta: ReturnType<typeof useExtrato> }): ReactNode {
  const [aberto, setAberto] = useState<string | null>(null);
  if (consulta.isPending) {
    return (
      <>
        <Skeleton className="h-24" />
        <Skeleton className="h-32" />
      </>
    );
  }
  if (consulta.isError) {
    const texto = ehErroDaApi(consulta.error) ? consulta.error.message : 'Puxe a tela para tentar de novo.';
    return <EstadoVazio icone={AlertTriangle} titulo="Não deu para carregar o extrato" texto={texto} />;
  }
  const extrato = consulta.data;
  return (
    <>
      <View className="flex-row gap-3">
        <CartaoDeMetrica rotulo="Ganhos no período" icone={TrendingUp} valor={formatarReais(extrato.total)} />
        <CartaoDeMetrica rotulo="Dias trabalhados" icone={Receipt} valor={String(extrato.porDia.length)} />
      </View>
      {extrato.porDia.length === 0 ? (
        <EstadoVazio
          icone={Receipt}
          titulo="Nenhum ganho neste período"
          texto="Os valores aparecem aqui depois que o cálculo da entrega roda."
        />
      ) : (
        <Secao titulo="Por dia">
          {extrato.porDia.map(({ dia, total }) => (
            <Dia
              key={dia}
              dia={dia}
              total={total}
              extrato={extrato}
              aberto={aberto === dia}
              aoTocar={() => setAberto(aberto === dia ? null : dia)}
            />
          ))}
        </Secao>
      )}
    </>
  );
}

function Dia(props: {
  readonly dia: string;
  readonly total: string;
  readonly extrato: Extrato;
  readonly aberto: boolean;
  aoTocar(): void;
}): ReactNode {
  const cores = useCores();
  const itens = props.extrato.itens.filter((item) => item.competencia === props.dia);
  const Seta = props.aberto ? ChevronUp : ChevronDown;
  return (
    <Card>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: props.aberto }}
        accessibilityLabel={`${formatarDia(props.dia)}, ${formatarReais(props.total)}`}
        onPress={props.aoTocar}
        className="min-h-14 flex-row items-center gap-3 px-4 py-3 active:opacity-80"
      >
        <View className="flex-1">
          <Text className="font-semibold text-heading">{formatarDia(props.dia)}</Text>
          <Text variante="secundario">{`${itens.length} ${itens.length === 1 ? 'lançamento' : 'lançamentos'}`}</Text>
        </View>
        <Text className="font-semibold tabular-nums text-brand-text">{formatarReais(props.total)}</Text>
        <Seta color={cores.muted} size={20} />
      </Pressable>
      {props.aberto
        ? itens.map((item) => (
            <LinhaDoCard key={item.id} primeira={false} className="gap-1">
              <View className="flex-row justify-between gap-3">
                <Text className="flex-1">{COMPONENTE[item.componente] ?? item.componente}</Text>
                <Text className="tabular-nums">{formatarReais(item.valor)}</Text>
              </View>
              <Text variante="secundario">{item.memoria}</Text>
            </LinhaDoCard>
          ))
        : null}
    </Card>
  );
}

function Fechamentos({ consulta }: { readonly consulta: ReturnType<typeof useFechamentos> }): ReactNode {
  const lista: readonly Fechamento[] = consulta.data ?? [];
  if (lista.length === 0) return null;
  return (
    <Secao titulo="Fechamentos">
      <Card>
        {lista.map((fechamento, indice) => {
          const situacao = SITUACAO_DO_FECHAMENTO[fechamento.status];
          return (
            <LinhaDoCard key={fechamento.id} primeira={indice === 0} className="gap-2">
              <View className="flex-row items-center justify-between gap-3">
                <Text>{`${formatarData(fechamento.periodoInicio)} a ${formatarData(fechamento.periodoFim)}`}</Text>
                <Text className="font-semibold tabular-nums text-heading">
                  {formatarReais(fechamento.totalLiquido)}
                </Text>
              </View>
              <Badge
                rotulo={situacao?.rotulo ?? fechamento.status}
                variante={situacao?.variante ?? 'neutro'}
                {...(situacao === undefined ? {} : { icone: situacao.icone })}
              />
            </LinhaDoCard>
          );
        })}
      </Card>
    </Secao>
  );
}
