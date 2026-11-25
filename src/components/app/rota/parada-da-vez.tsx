import { useRouter } from 'expo-router';
import {
  AlertTriangle,
  Banknote,
  CheckCircle2,
  CreditCard,
  MapPin,
  MessageSquareText,
  type LucideIcon,
} from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Linking, ScrollView, View } from 'react-native';
import { useAcoesDaRota, type Parada, type RotaAtiva } from '@/api/rota';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { DeslizarParaConfirmar } from '@/components/app/deslizar-para-confirmar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { formatarReais } from '@/lib/dinheiro';
import { aparenciaDoEstado } from '@/lib/estados-da-entrega';
import { useCores } from '@/lib/provedor-de-tema';
import { linkDoDiscador, linkDoWhatsapp } from '@/lib/navegacao';
import { paradaAtual, progresso } from '@/lib/parada-atual';
import { BotoesDeNavegacao } from './botoes-de-navegacao';
import { ProgressoDasParadas } from './progresso-das-paradas';
import { SituacaoDaPorta } from './situacao-da-porta';
import { AvisarACentral, ErroDaAcao } from './acoes-comuns';

const TAMANHO_DO_ICONE = 18;

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
        <SituacaoDaPorta parada={parada} />
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
  const cores = useCores();
  const extras = [parada.complemento, parada.referencia].filter((texto): texto is string => Boolean(texto));
  const estado = aparenciaDoEstado(parada.status);
  return (
    <Card className="gap-3 p-4">
      <View className="flex-row items-start justify-between gap-3">
        <Text variante="titulo" className="flex-1">
          {parada.cliente}
        </Text>
        <Badge rotulo={estado.rotulo} variante={estado.variante} icone={estado.icone} />
      </View>
      <View className="flex-row gap-3">
        <MapPin color={cores.brandText} size={TAMANHO_DO_ICONE} strokeWidth={2} />
        <View className="flex-1 gap-0.5">
          <Text>{parada.destino}</Text>
          {extras.length > 0 ? <Text variante="secundario">{extras.join(' · ')}</Text> : null}
        </View>
      </View>
      {parada.observacoes ? (
        <View className="flex-row gap-3 rounded-xl bg-secondary p-3">
          <MessageSquareText color={cores.muted} size={TAMANHO_DO_ICONE} strokeWidth={2} />
          <Text variante="secundario" className="flex-1">
            {parada.observacoes}
          </Text>
        </View>
      ) : null}
    </Card>
  );
}

/** Valores prontos da API: o app não calcula troco nem total (documento 04 §2.8). */
function Pagamento({ parada }: { readonly parada: Parada }): ReactNode {
  const { forma, valorACobrar, trocoNecessario, maquininhaDe, recebimentoStatus } = parada.pagamento;
  if (forma === 'pago_online') {
    return <Aviso icone={CreditCard} texto="Pago online: não há nada a receber." neutro />;
  }
  return (
    <Card className="gap-2 p-4">
      <View className="flex-row items-center justify-between">
        <Text variante="eyebrow">A receber</Text>
        <Badge rotulo={FORMA_PREVISTA[forma] ?? forma} icone={Banknote} />
      </View>
      <Text variante="valor">{formatarReais(valorACobrar)}</Text>
      {trocoNecessario === null ? null : (
        <View className="flex-row items-center justify-between rounded-xl bg-attention/10 px-3 py-2">
          <Text className="font-semibold text-brand-text">Leve de troco</Text>
          <Text className="font-semibold tabular-nums text-brand-text">{formatarReais(trocoNecessario)}</Text>
        </View>
      )}
      {maquininhaDe === null ? null : (
        <Text variante="secundario">{MAQUININHA[maquininhaDe] ?? maquininhaDe}</Text>
      )}
      {recebimentoStatus === 'recebido' ? <Badge rotulo="Pagamento registrado" icone={CheckCircle2} /> : null}
      {recebimentoStatus === 'divergente' ? (
        <Badge
          rotulo="Diferente do previsto: a central vai conferir"
          variante="destrutivo"
          icone={AlertTriangle}
        />
      ) : null}
    </Card>
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
  const { iniciar, chegar, entregar, ausente } = useAcoesDaRota();
  const pode = (acao: Parada['acoesPermitidas'][number]): boolean => parada.acoesPermitidas.includes(acao);
  const enviando = iniciar.isPending || chegar.isPending || entregar.isPending || ausente.isPending;
  const id = parada.entregaId;
  return (
    <BarraDeAcao>
      <ErroDaAcao erro={iniciar.error ?? chegar.error ?? entregar.error ?? ausente.error} />
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
      {pode('corrigir_recebimento') ? (
        <Button
          variante="contorno"
          onPress={() => router.push({ pathname: '/entrega/[id]/pagamento', params: { id } })}
        >
          <Text>Corrigir pagamento</Text>
        </Button>
      ) : null}
      {pode('entregar') ? (
        <DeslizarParaConfirmar
          texto="Deslize para entregar"
          desabilitado={enviando}
          aoConfirmar={() => entregar.mutate(id)}
        />
      ) : null}
      {pode('devolver') ? (
        <Button onPress={() => router.push({ pathname: '/entrega/[id]/devolucao', params: { id } })}>
          <Text>Devolver no restaurante</Text>
        </Button>
      ) : null}
      {/* Um gesto deslizante por vez: com o entregar liberado, o ausente não aparece. */}
      {pode('ausente') && !pode('entregar') ? (
        <DeslizarParaConfirmar
          texto="Deslize: cliente ausente"
          desabilitado={enviando}
          aoConfirmar={() => ausente.mutate(id)}
        />
      ) : null}
      {pode('recusada_pelo_cliente') ? (
        <Button
          variante="fantasma"
          onPress={() => router.push({ pathname: '/entrega/[id]/recusa', params: { id } })}
        >
          <Text>Cliente recusou o pedido</Text>
        </Button>
      ) : null}
      <AvisarACentral entregaId={id} />
    </BarraDeAcao>
  );
}

function Aviso(props: {
  readonly texto: string;
  readonly icone?: LucideIcon;
  readonly neutro?: boolean;
}): ReactNode {
  const { texto, icone: Icone = AlertTriangle, neutro = false } = props;
  const cores = useCores();
  return (
    <Card className={neutro ? 'flex-row gap-3 p-4' : 'flex-row gap-3 border-attention/50 bg-attention/5 p-4'}>
      <Icone color={neutro ? cores.muted : cores.brandText} size={TAMANHO_DO_ICONE} strokeWidth={2} />
      <Text variante={neutro ? 'secundario' : 'corpo'} className="flex-1">
        {texto}
      </Text>
    </Card>
  );
}
