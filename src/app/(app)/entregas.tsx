import { AlertTriangle, Bike, PackageCheck, Store, TrendingUp, User } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useHistorico, type EntregaDoHistorico, type Historico } from '@/api/dinheiro-do-motoboy';
import { ehErroDaApi } from '@/api/erro-da-api';
import { TelaDeAba } from '@/components/app/barra-de-abas';
import { CartaoDeMetrica } from '@/components/app/comum/cartao-de-metrica';
import { EstadoVazio } from '@/components/app/comum/estado-vazio';
import { FiltroDePeriodo } from '@/components/app/comum/filtro-de-periodo';
import { Secao } from '@/components/app/comum/secao';
import { FaixaDoTopo } from '@/components/app/faixa-do-topo';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { diaLocal, formatarDia, formatarHora } from '@/lib/datas';
import { formatarReais } from '@/lib/dinheiro';
import { aparenciaDoEstado, FORMAS_DE_PAGAMENTO } from '@/lib/estados-da-entrega';
import { periodoDoAtalho, type Periodo } from '@/lib/periodo';
import { useCores } from '@/lib/provedor-de-tema';

const TAMANHO_DO_ICONE = 15;

/**
 * Histórico de entregas (GET /app/entregas): o que o motoboy fez no dia, ou no período escolhido,
 * com a situação, o horário e o quanto ganhou em cada uma. Valores prontos da API.
 */
export default function TelaDasEntregas(): ReactNode {
  const [periodo, setPeriodo] = useState<Periodo>(() => periodoDoAtalho('hoje', new Date()));
  const historico = useHistorico(periodo);
  return (
    <TelaDeAba>
      <FaixaDoTopo titulo="Entregas" />
      <ScrollView
        contentContainerClassName="gap-5 px-4 py-6"
        refreshControl={
          <RefreshControl refreshing={historico.isRefetching} onRefresh={() => void historico.refetch()} />
        }
      >
        <FiltroDePeriodo periodo={periodo} aoMudar={setPeriodo} />
        <Conteudo consulta={historico} />
      </ScrollView>
    </TelaDeAba>
  );
}

function Conteudo({ consulta }: { readonly consulta: ReturnType<typeof useHistorico> }): ReactNode {
  if (consulta.isPending) {
    return (
      <>
        <Skeleton className="h-24" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </>
    );
  }
  if (consulta.isError) {
    const texto = ehErroDaApi(consulta.error) ? consulta.error.message : 'Puxe a tela para tentar de novo.';
    return <EstadoVazio icone={AlertTriangle} titulo="Não deu para carregar as entregas" texto={texto} />;
  }
  const historico = consulta.data;
  return (
    <>
      <Resumo historico={historico} />
      {historico.entregas.length === 0 ? (
        <EstadoVazio
          icone={Bike}
          titulo="Nenhuma entrega neste período"
          texto="As entregas que você terminar aparecem aqui, da mais recente para a mais antiga."
        />
      ) : (
        <Lista historico={historico} />
      )}
    </>
  );
}

function Resumo({ historico }: { readonly historico: Historico }): ReactNode {
  const { resumo } = historico;
  const outras = [
    resumo.devolvidas > 0 ? `${resumo.devolvidas} devolvida${resumo.devolvidas === 1 ? '' : 's'}` : null,
    resumo.canceladas > 0 ? `${resumo.canceladas} cancelada${resumo.canceladas === 1 ? '' : 's'}` : null,
  ].filter((texto): texto is string => texto !== null);
  return (
    <View className="flex-row gap-3">
      <CartaoDeMetrica
        rotulo="Entregas feitas"
        icone={PackageCheck}
        valor={String(resumo.entregues)}
        {...(outras.length === 0 ? {} : { detalhe: outras.join(' · ') })}
      />
      <CartaoDeMetrica rotulo="Ganho no período" icone={TrendingUp} valor={formatarReais(resumo.ganho)} />
    </View>
  );
}

/** Agrupa por dia quando o período tem mais de um, para a lista não virar uma parede de cards. */
function Lista({ historico }: { readonly historico: Historico }): ReactNode {
  const dias = new Map<string, EntregaDoHistorico[]>();
  for (const entrega of historico.entregas) {
    const dia = diaLocal(new Date(entrega.finalizadaEm));
    dias.set(dia, [...(dias.get(dia) ?? []), entrega]);
  }
  return (
    <>
      {[...dias.entries()].map(([dia, entregas]) => (
        <Secao key={dia} titulo={`${formatarDia(dia)} · ${entregas.length}`}>
          {entregas.map((entrega) => (
            <CartaoDaEntrega key={entrega.id} entrega={entrega} />
          ))}
        </Secao>
      ))}
    </>
  );
}

function CartaoDaEntrega({ entrega }: { readonly entrega: EntregaDoHistorico }): ReactNode {
  const cores = useCores();
  const estado = aparenciaDoEstado(entrega.status);
  const forma = FORMAS_DE_PAGAMENTO[entrega.pagamento.forma] ?? entrega.pagamento.forma;
  return (
    <Card className="gap-3 p-4">
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-row items-center gap-2">
          <Text variante="mono" className="text-heading">
            {entrega.codigo}
          </Text>
          <Text variante="secundario">{formatarHora(entrega.finalizadaEm)}</Text>
        </View>
        <Badge rotulo={estado.rotulo} variante={estado.variante} icone={estado.icone} />
      </View>
      <View className="gap-1.5">
        <Detalhe
          icone={User}
          cor={cores.muted}
          texto={entrega.bairro === null ? entrega.cliente : `${entrega.cliente} · ${entrega.bairro}`}
        />
        <Detalhe
          icone={Store}
          cor={cores.muted}
          texto={
            entrega.rotaCodigo === null
              ? entrega.restaurante
              : `${entrega.restaurante} · ${entrega.rotaCodigo}`
          }
        />
      </View>
      <View className="flex-row items-center justify-between border-t border-border pt-3">
        <Text variante="secundario">
          {entrega.pagamento.forma === 'pago_online'
            ? forma
            : `${forma} · ${formatarReais(entrega.pagamento.valorACobrar)}`}
        </Text>
        <Text className="font-semibold tabular-nums text-brand-text">
          {entrega.ganho === null ? 'Calculando…' : `+ ${formatarReais(entrega.ganho)}`}
        </Text>
      </View>
    </Card>
  );
}

function Detalhe(props: {
  readonly icone: typeof User;
  readonly cor: string;
  readonly texto: string;
}): ReactNode {
  const { icone: Icone } = props;
  return (
    <View className="flex-row items-center gap-2">
      <Icone color={props.cor} size={TAMANHO_DO_ICONE} strokeWidth={2} />
      <Text className="flex-1" numberOfLines={1}>
        {props.texto}
      </Text>
    </View>
  );
}
