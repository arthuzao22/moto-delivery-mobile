import { AlertTriangle, Banknote, CheckCircle2, Clock3, Receipt, Wallet } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useCaixa, type Caixa } from '@/api/dinheiro-do-motoboy';
import { ehErroDaApi } from '@/api/erro-da-api';
import { TelaDeAba } from '@/components/app/barra-de-abas';
import { CartaoDeMetrica } from '@/components/app/comum/cartao-de-metrica';
import { EstadoVazio } from '@/components/app/comum/estado-vazio';
import { Secao } from '@/components/app/comum/secao';
import { FaixaDoTopo } from '@/components/app/faixa-do-topo';
import { Badge, type VarianteDaEtiqueta } from '@/components/ui/badge';
import { Card, LinhaDoCard } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { formatarHora } from '@/lib/datas';
import { formatarReais } from '@/lib/dinheiro';

const FORMA: Readonly<Record<string, string>> = {
  dinheiro: 'Dinheiro',
  pix: 'Pix',
  cartao_credito: 'Crédito',
  cartao_debito: 'Débito',
  outro: 'Outro',
};

const SITUACAO_DO_ACERTO: Readonly<
  Record<string, { rotulo: string; variante: VarianteDaEtiqueta; icone: typeof Clock3 }>
> = {
  pendente: { rotulo: 'Aguardando conferência', variante: 'atencao', icone: Clock3 },
  conferido: { rotulo: 'Conferido', variante: 'neutro', icone: CheckCircle2 },
  com_divergencia: { rotulo: 'Com diferença', variante: 'destrutivo', icone: AlertTriangle },
  confirmado_restaurante: { rotulo: 'Confirmado', variante: 'neutro', icone: CheckCircle2 },
};

/**
 * Caixa do turno (documento 04 M7): o dinheiro de clientes que está com o motoboy, que é o que ele
 * leva na conferência. Valores prontos da API: o app não soma.
 */
export default function TelaDoCaixa(): ReactNode {
  const caixa = useCaixa();
  return (
    <TelaDeAba>
      <FaixaDoTopo titulo="Caixa" />
      <ScrollView
        contentContainerClassName="gap-5 px-4 py-6"
        refreshControl={
          <RefreshControl refreshing={caixa.isRefetching} onRefresh={() => void caixa.refetch()} />
        }
      >
        <Conteudo consulta={caixa} />
      </ScrollView>
    </TelaDeAba>
  );
}

function Conteudo({ consulta }: { readonly consulta: ReturnType<typeof useCaixa> }): ReactNode {
  if (consulta.isPending) {
    return (
      <>
        <Skeleton className="h-28" />
        <Skeleton className="h-40" />
      </>
    );
  }
  if (consulta.isError) {
    const texto = ehErroDaApi(consulta.error) ? consulta.error.message : 'Puxe a tela para tentar de novo.';
    return <EstadoVazio icone={AlertTriangle} titulo="Não deu para carregar o caixa" texto={texto} />;
  }
  const caixa = consulta.data;
  return (
    <>
      <View className="flex-row gap-3">
        <CartaoDeMetrica
          rotulo="Dinheiro em mãos"
          icone={Banknote}
          valor={formatarReais(caixa.emMaos)}
          destaque={caixa.emMaos !== '0.00'}
          detalhe={caixa.turno === null ? 'Sem turno aberto' : 'A acertar neste turno'}
        />
        <CartaoDeMetrica
          rotulo="Pagamentos recebidos"
          icone={Receipt}
          valor={String(caixa.recebimentos.length)}
          detalhe="Neste turno"
        />
      </View>
      <Recebimentos caixa={caixa} />
      <Acertos caixa={caixa} />
    </>
  );
}

function Recebimentos({ caixa }: { readonly caixa: Caixa }): ReactNode {
  if (caixa.recebimentos.length === 0) {
    return (
      <EstadoVazio
        icone={Wallet}
        titulo="Nenhum pagamento ainda"
        texto="O dinheiro, o Pix e o cartão que você receber dos clientes aparecem aqui."
      />
    );
  }
  return (
    <Secao titulo="Recebimentos do turno">
      <Card>
        {caixa.recebimentos.map((recebimento, indice) => (
          <LinhaDoCard key={recebimento.id} primeira={indice === 0} className="flex-row items-center gap-3">
            <View className="flex-1 gap-1">
              <Text variante="mono">{recebimento.codigo}</Text>
              <View className="flex-row items-center gap-2">
                <Badge rotulo={FORMA[recebimento.forma] ?? recebimento.forma} />
                <Text variante="secundario">{formatarHora(recebimento.recebidoEm)}</Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="font-semibold tabular-nums text-heading">
                {formatarReais(recebimento.valor)}
              </Text>
              {recebimento.trocoDado === '0.00' ? null : (
                <Text className="text-xs text-muted-foreground">{`Troco ${formatarReais(recebimento.trocoDado)}`}</Text>
              )}
            </View>
          </LinhaDoCard>
        ))}
      </Card>
    </Secao>
  );
}

function Acertos({ caixa }: { readonly caixa: Caixa }): ReactNode {
  if (caixa.acertos.length === 0) return null;
  return (
    <Secao titulo="Acertos">
      {caixa.acertos.map((acerto) => {
        const situacao = SITUACAO_DO_ACERTO[acerto.status];
        return (
          <Card key={acerto.id} className="gap-2 p-4">
            <View className="flex-row items-center justify-between gap-3">
              <Text variante="tituloDeCard">
                {acerto.destino === 'empresa' ? 'Com a empresa' : 'Com o restaurante'}
              </Text>
              <Badge
                rotulo={situacao?.rotulo ?? acerto.status}
                variante={situacao?.variante ?? 'neutro'}
                {...(situacao === undefined ? {} : { icone: situacao.icone })}
              />
            </View>
            <Linha rotulo="Previsto" valor={formatarReais(acerto.valorPrevisto)} />
            {acerto.valorEntregue === null ? null : (
              <Linha rotulo="Entregue" valor={formatarReais(acerto.valorEntregue)} />
            )}
            {acerto.diferenca === null || acerto.diferenca === '0.00' ? null : (
              <Linha rotulo="Diferença" valor={formatarReais(acerto.diferenca)} erro />
            )}
          </Card>
        );
      })}
    </Secao>
  );
}

function Linha(props: {
  readonly rotulo: string;
  readonly valor: string;
  readonly erro?: boolean;
}): ReactNode {
  return (
    <View className="flex-row justify-between">
      <Text variante="secundario">{props.rotulo}</Text>
      <Text className={props.erro === true ? 'tabular-nums text-destructive' : 'tabular-nums'}>
        {props.valor}
      </Text>
    </View>
  );
}
