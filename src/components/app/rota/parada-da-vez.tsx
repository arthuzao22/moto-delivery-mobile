import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { Linking, ScrollView, View } from 'react-native';
import { useAcoesDaRota, type Parada, type RotaAtiva } from '@/api/rota';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { DeslizarParaConfirmar } from '@/components/app/deslizar-para-confirmar';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { formatarReais } from '@/lib/dinheiro';
import { linkDoDiscador, linkDoWhatsapp } from '@/lib/navegacao';
import { paradaAtual, progresso } from '@/lib/parada-atual';
import { BotoesDeNavegacao } from './botoes-de-navegacao';
import { ProgressoDasParadas } from './progresso-das-paradas';
import { AvisarACentral, ErroDaAcao } from './acoes-comuns';

const FORMA_PREVISTA: Readonly<Record<string, string>> = {
  pago_online: 'Pago online',
  dinheiro: 'Dinheiro',
  cartao_maquininha: 'Cartão na maquininha',
  pix_na_entrega: 'Pix na entrega',
  misto: 'Pagamento misto',
};

const MAQUININHA: Readonly<Record<string, string>> = {
  restaurante: 'Maquininha do restaurante',
  empresa: 'Maquininha da empresa',
  motoboy: 'Sua maquininha',
};

/** Ausente, recusa e devolução chegam na M5; até lá, a central resolve pelo painel. */
const SITUACOES_DA_M5 = new Set(['cliente_ausente', 'aguardando_decisao', 'retornando']);

export function ParadaDaVez({ rota }: { readonly rota: RotaAtiva }): ReactNode {
  const parada = paradaAtual(rota.paradas);
  const { feitas, total } = progresso(rota.paradas);
  if (parada === null) {
    return (
      <ScrollView contentContainerClassName="gap-4 px-4 py-6">
        <Text variante="titulo">Fechando a rota…</Text>
        <Text variante="secundario">Todas as paradas foram atendidas.</Text>
      </ScrollView>
    );
  }
  return (
    <>
      <ScrollView contentContainerClassName="gap-4 px-4 py-6">
        <ProgressoDasParadas paradas={rota.paradas} atualId={parada.entregaId} />
        <Text variante="eyebrow">{`Parada ${Math.min(feitas + 1, total)} de ${total} · ${parada.codigo}`}</Text>
        <CartaoDaParada parada={parada} />
        <Pagamento parada={parada} />
        {parada.comprovante.pendente ? (
          <Aviso texto="Esta entrega exige comprovante. A foto pelo app chega na próxima etapa; até lá, fale com a central." />
        ) : null}
        {SITUACOES_DA_M5.has(parada.status) ? (
          <Aviso texto="Aguarde a decisão da central ou do restaurante sobre esta entrega." />
        ) : null}
        {parada.status === 'a_caminho' ? (
          <BotoesDeNavegacao destino={{ endereco: parada.destino, coordenada: parada.coordenadaDestino }} />
        ) : null}
        <Contato parada={parada} />
      </ScrollView>
      <AcoesDaParada parada={parada} />
    </>
  );
}

function CartaoDaParada({ parada }: { readonly parada: Parada }): ReactNode {
  const extras = [parada.complemento, parada.referencia].filter((texto): texto is string => Boolean(texto));
  return (
    <View className="gap-1 rounded-2xl border border-border bg-card p-4">
      <Text variante="titulo">{parada.cliente}</Text>
      <Text>{parada.destino}</Text>
      {extras.length > 0 ? <Text variante="secundario">{extras.join(' · ')}</Text> : null}
      {parada.observacoes ? <Text variante="secundario">{`Obs.: ${parada.observacoes}`}</Text> : null}
    </View>
  );
}

/** Valores prontos da API: o app não calcula troco nem total (documento 04 §2.8). */
function Pagamento({ parada }: { readonly parada: Parada }): ReactNode {
  const { forma, valorACobrar, trocoNecessario, maquininhaDe, recebimentoStatus } = parada.pagamento;
  if (forma === 'pago_online') return <Aviso texto="Pago online: não há nada a receber." neutro />;
  return (
    <View className="gap-1 rounded-2xl border border-border bg-card p-4">
      <Text variante="secundario">{FORMA_PREVISTA[forma] ?? forma}</Text>
      <Text variante="valor">{formatarReais(valorACobrar)}</Text>
      {trocoNecessario === null ? null : <Text>{`Troco: ${formatarReais(trocoNecessario)}`}</Text>}
      {maquininhaDe === null ? null : (
        <Text variante="secundario">{MAQUININHA[maquininhaDe] ?? maquininhaDe}</Text>
      )}
      {recebimentoStatus === 'recebido' ? <Text variante="secundario">Pagamento registrado.</Text> : null}
      {recebimentoStatus === 'divergente' ? (
        <Text className="text-destructive">Pagamento diferente do previsto: a central vai conferir.</Text>
      ) : null}
    </View>
  );
}

/** Ligar e WhatsApp registram o contato na API (vale para o cliente ausente) e abrem o app. */
function Contato({ parada }: { readonly parada: Parada }): ReactNode {
  const { contato } = useAcoesDaRota();
  const { telefone } = parada;
  if (telefone === null || !parada.acoesPermitidas.includes('contato')) return null;
  const chamar = (canal: 'ligacao' | 'whatsapp'): void => {
    contato.mutate({ entregaId: parada.entregaId, canal });
    void Linking.openURL(canal === 'ligacao' ? linkDoDiscador(telefone) : linkDoWhatsapp(telefone));
  };
  return (
    <View className="flex-row gap-3">
      <View className="flex-1">
        <Button variante="contorno" onPress={() => chamar('ligacao')}>
          <Text>Ligar</Text>
        </Button>
      </View>
      <View className="flex-1">
        <Button variante="contorno" onPress={() => chamar('whatsapp')}>
          <Text>WhatsApp</Text>
        </Button>
      </View>
    </View>
  );
}

/** Uma ação principal por vez, na ordem do fluxo: iniciar, cheguei, pagamento, entregar. */
function AcoesDaParada({ parada }: { readonly parada: Parada }): ReactNode {
  const router = useRouter();
  const { iniciar, chegar, entregar } = useAcoesDaRota();
  const pode = (acao: Parada['acoesPermitidas'][number]): boolean => parada.acoesPermitidas.includes(acao);
  const enviando = iniciar.isPending || chegar.isPending || entregar.isPending;
  const id = parada.entregaId;
  return (
    <BarraDeAcao>
      <ErroDaAcao erro={iniciar.error ?? chegar.error ?? entregar.error} />
      {pode('iniciar') ? (
        <Button disabled={enviando} onPress={() => iniciar.mutate(id)}>
          <Text>{iniciar.isPending ? 'Enviando…' : 'Iniciar esta entrega'}</Text>
        </Button>
      ) : null}
      {pode('cheguei') ? (
        <Button disabled={enviando} onPress={() => chegar.mutate(id)}>
          <Text>{chegar.isPending ? 'Conferindo…' : 'Cheguei'}</Text>
        </Button>
      ) : null}
      {pode('recebimentos') ? (
        <Button onPress={() => router.push({ pathname: '/entrega/[id]/pagamento', params: { id } })}>
          <Text>Registrar pagamento</Text>
        </Button>
      ) : null}
      {pode('entregar') ? (
        <DeslizarParaConfirmar
          texto="Deslize para entregar"
          desabilitado={enviando}
          aoConfirmar={() => entregar.mutate(id)}
        />
      ) : null}
      <AvisarACentral entregaId={id} />
    </BarraDeAcao>
  );
}

function Aviso({ texto, neutro = false }: { readonly texto: string; readonly neutro?: boolean }): ReactNode {
  return (
    <View
      className={
        neutro ? 'rounded-2xl border border-border bg-card p-4' : 'rounded-2xl border border-attention p-4'
      }
    >
      <Text variante={neutro ? 'secundario' : 'corpo'}>{texto}</Text>
    </View>
  );
}
