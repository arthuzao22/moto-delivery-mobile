import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { Linking, ScrollView, View } from 'react-native';
import { ehErroDaApi } from '@/api/erro-da-api';
import { useEu } from '@/api/eu';
import {
  PermissaoDeLocalizacao,
  useAcoesDoTurno,
  useInicio,
  type Inicio as DadosDoInicio,
} from '@/api/turno';
import { AvisoDeConflito } from '@/components/app/aviso-de-sinal';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { CartaoDeNotificacoes } from '@/components/app/cartao-de-notificacoes';
import { DeslizarParaConfirmar } from '@/components/app/deslizar-para-confirmar';
import { TelaDaRota } from '@/components/app/rota/tela-da-rota';
import { FaixaDoTopo } from '@/components/app/faixa-do-topo';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { iniciarRastreamento, segundoPlanoDisponivel, situacaoDaPermissao } from '@/gps/rastreamento';
import { useSessao } from '@/sessao/provedor-de-sessao';

type Estado = 'sem_turno' | 'disponivel' | 'pausa' | 'em_rota';

/** O estado da tela sai do /app/inicio (documento 02 §2); nada aqui guarda estado próprio. */
function estadoDo(inicio: DadosDoInicio): Estado {
  const { turno } = inicio;
  if (turno === null || turno.status !== 'aberto') return 'sem_turno';
  if (inicio.rotaAtiva !== null || turno.disponibilidade === 'ocupado') return 'em_rota';
  return turno.disponibilidade === 'pausa' ? 'pausa' : 'disponivel';
}

const PERMISSAO: Readonly<Record<PermissaoDeLocalizacao['situacao'], string>> = {
  negada: 'Para abrir o turno, permita a localização: é assim que a central vê onde você está.',
  aproximada:
    'A localização está como aproximada. Ative a localização precisa nos Ajustes: com a aproximada, você some do mapa da central.',
  sem_segundo_plano:
    'Permita a localização "o tempo todo" nos Ajustes: assim a central te vê mesmo com a tela apagada. Só enquanto o turno estiver aberto.',
};

/** Mensagem do último erro de uma ação do turno, com o caminho para os Ajustes quando é permissão. */
function mensagemDoErro(erro: unknown): { texto: string; ajustes: boolean } | null {
  if (erro === null || erro === undefined) return null;
  if (erro instanceof PermissaoDeLocalizacao) return { texto: PERMISSAO[erro.situacao], ajustes: true };
  return { texto: ehErroDaApi(erro) ? erro.message : 'Não deu certo. Tente de novo.', ajustes: false };
}

export default function Inicio(): ReactNode {
  const inicio = useInicio();
  const estado = inicio.data === undefined ? null : estadoDo(inicio.data);
  useGpsDoTurnoAberto(estado !== null && estado !== 'sem_turno');
  const rota = inicio.data?.rotaAtiva ?? null;
  if (estado === 'em_rota' && rota !== null) {
    return (
      <View className="flex-1 bg-background">
        <FaixaDoTopo titulo="Moto Delivery" />
        <View className="px-4 pt-4 empty:hidden">
          <AvisoDeConflito />
        </View>
        <TelaDaRota rota={rota} />
      </View>
    );
  }
  return (
    <View className="flex-1 bg-background">
      <FaixaDoTopo titulo="Moto Delivery" />
      <ScrollView contentContainerClassName="gap-4 px-4 py-6">
        <AvisoDeConflito />
        <Saudacao />
        <Conteudo consulta={inicio} estado={estado} />
        <CartaoDeNotificacoes />
      </ScrollView>
      {estado === null ? null : <Acoes estado={estado} />}
    </View>
  );
}

/** Abriu o app com o turno aberto: religa o GPS (o sistema pode ter encerrado o serviço). */
function useGpsDoTurnoAberto(turnoAberto: boolean): void {
  useEffect(() => {
    if (!turnoAberto) return;
    const religar = async (): Promise<void> => {
      if ((await situacaoDaPermissao()) === 'ok') await iniciarRastreamento();
    };
    void religar().catch(() => undefined);
  }, [turnoAberto]);
}

function Saudacao(): ReactNode {
  const eu = useEu();
  const nome = eu.data?.usuario.nome.split(' ')[0];
  return (
    <View className="gap-1">
      <Text variante="titulo">{nome === undefined ? 'Olá!' : `Olá, ${nome}!`}</Text>
      <Text variante="secundario">{eu.data?.organizacaoAtiva?.nome ?? ' '}</Text>
    </View>
  );
}

const SITUACAO: Readonly<Record<Estado, { titulo: string; texto: string }>> = {
  sem_turno: { titulo: 'Fora do turno', texto: 'Inicie o turno para receber ofertas.' },
  disponivel: { titulo: 'Aguardando ofertas', texto: 'Quando chegar uma rota, o celular avisa.' },
  pausa: { titulo: 'Em pausa', texto: 'Você não recebe ofertas enquanto estiver em pausa.' },
  em_rota: { titulo: 'Em rota', texto: 'Você está com uma rota em andamento.' },
};

function Conteudo({
  consulta,
  estado,
}: {
  readonly consulta: ReturnType<typeof useInicio>;
  readonly estado: Estado | null;
}): ReactNode {
  if (consulta.isPending) return <Cartao titulo="Carregando…" texto="Buscando sua situação." />;
  if (consulta.isError || estado === null) {
    const texto = ehErroDaApi(consulta.error) ? consulta.error.message : 'Não deu para carregar.';
    return (
      <Cartao titulo="Sem resposta" texto={texto}>
        <Button variante="secundario" onPress={() => void consulta.refetch()}>
          <Text>Tentar de novo</Text>
        </Button>
      </Cartao>
    );
  }
  const { titulo, texto } = SITUACAO[estado];
  const aviso =
    estado !== 'sem_turno' && !segundoPlanoDisponivel()
      ? ' No Expo Go, o GPS só funciona com o app aberto.'
      : '';
  const oferta = consulta.data?.ofertas[0];
  return (
    <>
      {oferta === undefined ? null : <OfertaAberta id={oferta.id} paradas={oferta.paradas.length} />}
      <Cartao titulo={titulo} texto={`${texto}${aviso}`} />
    </>
  );
}

function Acoes({ estado }: { readonly estado: Estado }): ReactNode {
  const { abrir, disponibilidade, encerrar } = useAcoesDoTurno();
  const { sair } = useSessao();
  const ocupado = abrir.isPending || disponibilidade.isPending || encerrar.isPending;
  const erro = mensagemDoErro(abrir.error ?? disponibilidade.error ?? encerrar.error);
  return (
    <BarraDeAcao>
      {erro === null ? null : <AvisoDeErro texto={erro.texto} ajustes={erro.ajustes} />}
      {estado === 'sem_turno' ? (
        <>
          <Button disabled={ocupado} onPress={() => abrir.mutate()}>
            <Text>{abrir.isPending ? 'Abrindo…' : 'Iniciar turno'}</Text>
          </Button>
          <Button variante="fantasma" disabled={ocupado} onPress={() => void sair()}>
            <Text>Sair</Text>
          </Button>
        </>
      ) : null}
      {estado === 'disponivel' ? (
        <Button variante="secundario" disabled={ocupado} onPress={() => disponibilidade.mutate('pausa')}>
          <Text>Pausar</Text>
        </Button>
      ) : null}
      {estado === 'pausa' ? (
        <Button disabled={ocupado} onPress={() => disponibilidade.mutate('disponivel')}>
          <Text>Voltar a receber ofertas</Text>
        </Button>
      ) : null}
      {estado === 'em_rota' ? (
        // Até a aba Perfil existir (documento 02 §1), o sair fica aqui também.
        <Button variante="fantasma" disabled={ocupado} onPress={() => void sair()}>
          <Text>Sair</Text>
        </Button>
      ) : null}
      {estado === 'disponivel' || estado === 'pausa' ? (
        <DeslizarParaConfirmar
          texto="Deslize para encerrar o turno"
          desabilitado={ocupado}
          aoConfirmar={() => encerrar.mutate()}
        />
      ) : null}
    </BarraDeAcao>
  );
}

/** A oferta aberta no Início: o motoboy pode ter perdido o evento ou voltado pelo push. */
function OfertaAberta({ id, paradas }: { readonly id: string; readonly paradas: number }): ReactNode {
  const router = useRouter();
  return (
    <View className="gap-3 rounded-2xl border border-primary bg-card p-4">
      <Text variante="eyebrow" className="text-brand-text">
        Nova rota
      </Text>
      <Text variante="titulo">{`${paradas} ${paradas === 1 ? 'parada' : 'paradas'} esperando você`}</Text>
      <Button onPress={() => router.push({ pathname: '/oferta/[id]', params: { id } })}>
        <Text>Ver oferta</Text>
      </Button>
    </View>
  );
}

function AvisoDeErro({ texto, ajustes }: { readonly texto: string; readonly ajustes: boolean }): ReactNode {
  return (
    <View accessibilityLiveRegion="polite" className="gap-3 rounded-2xl border border-destructive p-4">
      <Text className="text-destructive">{texto}</Text>
      {ajustes ? (
        <Button variante="contorno" onPress={() => void Linking.openSettings()}>
          <Text>Abrir Ajustes</Text>
        </Button>
      ) : null}
    </View>
  );
}

function Cartao({
  titulo,
  texto,
  children,
}: {
  readonly titulo: string;
  readonly texto: string;
  readonly children?: ReactNode;
}): ReactNode {
  return (
    <View className="gap-3 rounded-2xl border border-border bg-card p-4">
      <View className="gap-1">
        <Text variante="titulo">{titulo}</Text>
        <Text variante="secundario">{texto}</Text>
      </View>
      {children}
    </View>
  );
}
