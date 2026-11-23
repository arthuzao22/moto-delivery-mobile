import { useMutation, useQueryClient } from '@tanstack/react-query';
import { posicaoAtual } from '@/gps/posicao-atual';
import { agoraIso, novaChave } from './chave';
import { api } from './cliente';
import { dadosDe } from './executar';
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

/** O que toda ação de campo leva: a hora real do toque e, quando há, a posição. */
async function momento(): Promise<{ eventoEm: string; posicao?: { lat: number; lng: number } }> {
  const posicao = await posicaoAtual();
  return { eventoEm: agoraIso(), ...(posicao === null ? {} : { posicao }) };
}

const com = (id: string, prefixo: string) => ({
  path: { id },
  header: { 'Idempotency-Key': novaChave(prefixo) },
});

/**
 * As ações da coleta e da parada (documento 04 M4). Cada uma lê o Início de novo depois: a tela
 * e os botões (acoesPermitidas) vêm sempre da API.
 */
export function useAcoesDaRota() {
  const clienteDeConsultas = useQueryClient();
  const atualizar = async (): Promise<void> => clienteDeConsultas.invalidateQueries({ queryKey: ['inicio'] });
  const acao = <T>(executar: (entrada: T) => Promise<unknown>) =>
    // Uma mutação por ação, para cada botão ter o próprio "enviando" e o próprio erro.
    ({ mutationFn: executar, onSettled: atualizar });

  const chegarNaColeta = useMutation(
    acao(async (rotaId: string) =>
      dadosDe(
        api.POST('/app/rotas/{id}/cheguei-coleta', {
          params: com(rotaId, 'cheguei-coleta'),
          body: await momento(),
        }),
      ),
    ),
  );
  const coletar = useMutation(
    acao(async (entrada: { rotaId: string; entregaIds: string[]; codigoColeta?: string }) =>
      dadosDe(
        api.POST('/app/rotas/{id}/coletar', {
          params: com(entrada.rotaId, 'coletar'),
          body: {
            entregaIds: entrada.entregaIds,
            eventoEm: agoraIso(),
            ...(entrada.codigoColeta === undefined ? {} : { codigoColeta: entrada.codigoColeta }),
          },
        }),
      ),
    ),
  );
  const iniciar = useMutation(
    acao(async (entregaId: string) =>
      dadosDe(
        api.POST('/app/entregas/{id}/iniciar', { params: com(entregaId, 'iniciar'), body: await momento() }),
      ),
    ),
  );
  const chegar = useMutation(
    acao(async (entregaId: string) =>
      dadosDe(
        api.POST('/app/entregas/{id}/cheguei', { params: com(entregaId, 'cheguei'), body: await momento() }),
      ),
    ),
  );
  const contato = useMutation(
    acao(async (entrada: { entregaId: string; canal: 'ligacao' | 'whatsapp' }) =>
      dadosDe(
        api.POST('/app/entregas/{id}/contato', {
          params: com(entrada.entregaId, 'contato'),
          body: { canal: entrada.canal, ...(await momento()) },
        }),
      ),
    ),
  );
  const receber = useMutation(
    acao(async (entrada: { entregaId: string; itens: ParteDoRecebimento[] }) =>
      dadosDe(
        api.POST('/app/entregas/{id}/recebimentos', {
          params: com(entrada.entregaId, 'recebimento'),
          body: { itens: entrada.itens, ...(await momento()) },
        }),
      ),
    ),
  );
  const entregar = useMutation(
    acao(async (entregaId: string) =>
      dadosDe(
        api.POST('/app/entregas/{id}/entregar', {
          params: com(entregaId, 'entregar'),
          body: await momento(),
        }),
      ),
    ),
  );
  const ocorrencia = useMutation(
    acao(async (entrada: { tipo: TipoDeOcorrencia; descricao?: string; entregaId?: string }) =>
      dadosDe(
        api.POST('/app/ocorrencias', {
          params: { header: { 'Idempotency-Key': novaChave('ocorrencia') } },
          body: { ...entrada, ...(await momento()) },
        }),
      ),
    ),
  );
  const ausente = useMutation(
    acao(async (entregaId: string) =>
      dadosDe(
        api.POST('/app/entregas/{id}/ausente', { params: com(entregaId, 'ausente'), body: await momento() }),
      ),
    ),
  );
  const recusada = useMutation(
    acao(
      async (entrada: {
        entregaId: string;
        tipo: 'cliente_recusou' | 'pagamento_recusado';
        motivo: string;
      }) =>
        dadosDe(
          api.POST('/app/entregas/{id}/recusada-pelo-cliente', {
            params: com(entrada.entregaId, 'recusa'),
            body: { tipo: entrada.tipo, motivo: entrada.motivo, ...(await momento()) },
          }),
        ),
    ),
  );
  const devolver = useMutation(
    acao(async (entrada: { entregaId: string; codigoDevolucao: string }) =>
      dadosDe(
        api.POST('/app/entregas/{id}/devolver', {
          params: com(entrada.entregaId, 'devolver'),
          body: { codigoDevolucao: entrada.codigoDevolucao, ...(await momento()) },
        }),
      ),
    ),
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
