import { useAcaoDeCampo, type PedidoDeCampo } from '@/fila/use-acao-de-campo';
import { posicaoAtual } from '@/gps/posicao-atual';
import { agoraIso } from './chave';
import type { paths } from './schema';
import type { Inicio } from './turno';

export type RotaAtiva = NonNullable<Inicio['rotaAtiva']>;
export type Parada = RotaAtiva['paradas'][number];

export type FormaRecebida = 'dinheiro' | 'cartao_credito' | 'cartao_debito' | 'pix' | 'outro';

export interface ParteDoRecebimento {
  readonly forma: FormaRecebida;
  readonly valor: string;
  readonly trocoDado?: string;
}

export type TipoDeOcorrencia =
  'atraso_restaurante' | 'endereco_incorreto' | 'avaria' | 'pane_veiculo' | 'transito' | 'acidente' | 'outro';

/** O corpo que o contrato espera em cada rota: a fila guarda o JSON, mas o tipo é conferido aqui. */
type Corpo<P extends keyof paths> = paths[P] extends {
  post: { requestBody?: { content: { 'application/json': infer C } } };
}
  ? C
  : never;

/** A hora real do toque e, quando há, a posição: a fila reenvia exatamente isso, mesmo bem depois. */
async function momento(): Promise<{ eventoEm: string; posicao?: { lat: number; lng: number } }> {
  const posicao = await posicaoAtual();
  return { eventoEm: agoraIso(), ...(posicao === null ? {} : { posicao }) };
}

/** As ações de uma parada: mesma forma, mudam a rota, o corpo e o avanço otimista. */
function naParada(
  entregaId: string,
  passo: { rota: string; rotulo: string; corpo: object; avanco: PedidoDeCampo['avanco'] },
): PedidoDeCampo {
  return {
    prefixo: passo.rota,
    caminho: `/app/entregas/${entregaId}/${passo.rota}`,
    corpo: passo.corpo,
    grupo: 'rota',
    descricao: passo.rotulo,
    avanco: passo.avanco,
  };
}

/**
 * As ações da coleta e da parada (documento 04 M4), todas pela fila offline (M6): com sinal vão
 * na hora; sem sinal, esperam na ordem e a tela avança. Cada uma tem o próprio "enviando" e erro.
 */
export function useAcoesDaRota() {
  const chegarNaColeta = useAcaoDeCampo(async (rotaId: string) => ({
    prefixo: 'cheguei-coleta',
    caminho: `/app/rotas/${rotaId}/cheguei-coleta`,
    corpo: (await momento()) satisfies Corpo<'/app/rotas/{id}/cheguei-coleta'>,
    grupo: 'rota',
    descricao: 'Cheguei no restaurante',
    avanco: { tipo: 'cheguei_coleta' },
  }));
  const coletar = useAcaoDeCampo(
    async (entrada: { rotaId: string; entregaIds: string[]; codigoColeta?: string }) => ({
      prefixo: 'coletar',
      caminho: `/app/rotas/${entrada.rotaId}/coletar`,
      corpo: {
        entregaIds: entrada.entregaIds,
        eventoEm: agoraIso(),
        ...(entrada.codigoColeta === undefined ? {} : { codigoColeta: entrada.codigoColeta }),
      } satisfies Corpo<'/app/rotas/{id}/coletar'>,
      grupo: 'rota',
      descricao: 'Coleta',
      avanco: { tipo: 'coletar', entregaIds: entrada.entregaIds },
    }),
  );
  const iniciar = useAcaoDeCampo(async (entregaId: string) =>
    naParada(entregaId, {
      rota: 'iniciar',
      rotulo: 'Iniciar entrega',
      corpo: await momento(),
      avanco: { tipo: 'sem_avanco' },
    }),
  );
  const chegar = useAcaoDeCampo(async (entregaId: string) =>
    naParada(entregaId, {
      rota: 'cheguei',
      rotulo: 'Cheguei',
      corpo: await momento(),
      avanco: { tipo: 'cheguei', entregaId },
    }),
  );
  const contato = useAcaoDeCampo(async (entrada: { entregaId: string; canal: 'ligacao' | 'whatsapp' }) =>
    naParada(entrada.entregaId, {
      rota: 'contato',
      rotulo: 'Contato com o cliente',
      corpo: { canal: entrada.canal, ...(await momento()) } satisfies Corpo<'/app/entregas/{id}/contato'>,
      avanco: { tipo: 'sem_avanco' },
    }),
  );
  const receber = useAcaoDeCampo(async (entrada: { entregaId: string; itens: ParteDoRecebimento[] }) =>
    naParada(entrada.entregaId, {
      rota: 'recebimentos',
      rotulo: 'Pagamento',
      corpo: {
        itens: entrada.itens,
        ...(await momento()),
      } satisfies Corpo<'/app/entregas/{id}/recebimentos'>,
      avanco: { tipo: 'recebimento', entregaId: entrada.entregaId },
    }),
  );
  const entregar = useAcaoDeCampo(async (entregaId: string) =>
    naParada(entregaId, {
      rota: 'entregar',
      rotulo: 'Entrega',
      corpo: await momento(),
      avanco: { tipo: 'entregar', entregaId },
    }),
  );
  const ausente = useAcaoDeCampo(async (entregaId: string) =>
    naParada(entregaId, {
      rota: 'ausente',
      rotulo: 'Cliente ausente',
      corpo: await momento(),
      avanco: { tipo: 'ausente', entregaId },
    }),
  );
  const recusada = useAcaoDeCampo(
    async (entrada: { entregaId: string; tipo: 'cliente_recusou' | 'pagamento_recusado'; motivo: string }) =>
      naParada(entrada.entregaId, {
        rota: 'recusada-pelo-cliente',
        rotulo: 'Recusa do cliente',
        corpo: {
          tipo: entrada.tipo,
          motivo: entrada.motivo,
          ...(await momento()),
        } satisfies Corpo<'/app/entregas/{id}/recusada-pelo-cliente'>,
        avanco: { tipo: 'recusada', entregaId: entrada.entregaId },
      }),
  );
  const devolver = useAcaoDeCampo(async (entrada: { entregaId: string; codigoDevolucao: string }) =>
    naParada(entrada.entregaId, {
      rota: 'devolver',
      rotulo: 'Devolução',
      corpo: {
        codigoDevolucao: entrada.codigoDevolucao,
        ...(await momento()),
      } satisfies Corpo<'/app/entregas/{id}/devolver'>,
      avanco: { tipo: 'devolver', entregaId: entrada.entregaId },
    }),
  );
  const ocorrencia = useAcaoDeCampo(
    async (entrada: { tipo: TipoDeOcorrencia; descricao?: string; entregaId?: string }) => ({
      prefixo: 'ocorrencia',
      caminho: '/app/ocorrencias',
      corpo: { ...entrada, ...(await momento()) } satisfies Corpo<'/app/ocorrencias'>,
      grupo: 'ocorrencia',
      descricao: 'Aviso à central',
      avanco: { tipo: 'sem_avanco' },
    }),
  );
  return {
    chegarNaColeta,
    coletar,
    iniciar,
    chegar,
    contato,
    receber,
    entregar,
    ocorrencia,
    ausente,
    recusada,
    devolver,
  };
}
