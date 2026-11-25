import type { Inicio } from '@/api/turno';

type Rota = NonNullable<Inicio['rotaAtiva']>;
type Parada = Rota['paradas'][number];
type AcaoDaParada = Parada['acoesPermitidas'][number];

/** As ações de campo que podem esperar o sinal. Aceitar e recusar oferta não entram: exigem rede. */
export type AcaoDeCampo =
  | { readonly tipo: 'cheguei_coleta' }
  | { readonly tipo: 'coletar'; readonly entregaIds: readonly string[] }
  | { readonly tipo: 'cheguei'; readonly entregaId: string }
  | { readonly tipo: 'recebimento'; readonly entregaId: string }
  | { readonly tipo: 'entregar'; readonly entregaId: string }
  | { readonly tipo: 'ausente'; readonly entregaId: string }
  | { readonly tipo: 'recusada'; readonly entregaId: string }
  | { readonly tipo: 'devolver'; readonly entregaId: string }
  | { readonly tipo: 'disponibilidade'; readonly valor: 'disponivel' | 'pausa' }
  | { readonly tipo: 'encerrar_turno' }
  | { readonly tipo: 'sem_avanco' };

const NA_PORTA: readonly AcaoDaParada[] = ['contato', 'comprovantes', 'ausente', 'recusada_pelo_cliente'];

/**
 * Sem sinal, a tela avança na hora (documento 04 M6): esta é a previsão do caminho feliz de cada
 * ação. É provisória: quando a fila for enviada, o /app/inicio da API substitui tudo, e um conflito
 * desfaz o que não valeu. As regras de verdade continuam só na API.
 */
export function avancar(inicio: Inicio, acao: AcaoDeCampo): Inicio {
  if (acao.tipo === 'disponibilidade') {
    return inicio.turno === null
      ? inicio
      : { ...inicio, turno: { ...inicio.turno, disponibilidade: acao.valor } };
  }
  if (acao.tipo === 'encerrar_turno') {
    return inicio.turno === null ? inicio : { ...inicio, turno: { ...inicio.turno, status: 'encerrado' } };
  }
  const rota = inicio.rotaAtiva;
  if (rota === null) return inicio;
  return { ...inicio, rotaAtiva: avancarRota(rota, acao) };
}

function avancarRota(rota: Rota, acao: AcaoDeCampo): Rota {
  if (acao.tipo === 'cheguei_coleta') return { ...rota, status: 'em_coleta', acoesPermitidas: [] };
  if (acao.tipo === 'coletar') return coletar(rota, acao.entregaIds);
  if (!('entregaId' in acao)) return rota;
  const paradas = rota.paradas.map((parada) =>
    parada.entregaId === acao.entregaId ? avancarParada(parada, acao.tipo) : parada,
  );
  return acao.tipo === 'entregar' || acao.tipo === 'devolver'
    ? { ...rota, paradas: iniciarProxima(paradas) }
    : { ...rota, paradas };
}

/** O que não foi coletado sai da rota; a primeira coletada, pela ordem, fica a caminho. */
function coletar(rota: Rota, entregaIds: readonly string[]): Rota {
  const coletadas = rota.paradas
    .filter((parada) => entregaIds.includes(parada.entregaId))
    .map((parada) => ({ ...parada, status: 'coletada', acoesPermitidas: [] }));
  return { ...rota, status: 'em_entrega', acoesPermitidas: [], paradas: iniciarProxima(coletadas) };
}

function iniciarProxima(paradas: readonly Parada[]): Parada[] {
  const ordenadas = [...paradas].sort((a, b) => (a.ordem ?? Infinity) - (b.ordem ?? Infinity));
  const proxima = ordenadas.find((parada) => parada.status === 'coletada');
  const algumaEmAndamento = paradas.some((parada) =>
    ['a_caminho', 'no_local_entrega'].includes(parada.status),
  );
  if (proxima === undefined || algumaEmAndamento) return [...paradas];
  return paradas.map((parada) =>
    parada.entregaId === proxima.entregaId
      ? { ...parada, status: 'a_caminho', acoesPermitidas: ['cheguei', 'contato', 'comprovantes'] }
      : parada,
  );
}

function avancarParada(parada: Parada, tipo: AcaoDeCampo['tipo']): Parada {
  if (tipo === 'cheguei') return { ...parada, status: 'no_local_entrega', acoesPermitidas: naPorta(parada) };
  if (tipo === 'recebimento') {
    const paga = { ...parada, pagamento: { ...parada.pagamento, recebimentoStatus: 'recebido' } };
    return { ...paga, acoesPermitidas: naPorta(paga) };
  }
  if (tipo === 'ausente') return { ...parada, status: 'cliente_ausente', acoesPermitidas: naPorta(parada) };
  if (tipo === 'recusada') return { ...parada, status: 'retornando', acoesPermitidas: ['devolver'] };
  if (tipo === 'entregar') return { ...parada, status: 'entregue', acoesPermitidas: [] };
  if (tipo === 'devolver') return { ...parada, status: 'devolvida', acoesPermitidas: [] };
  return parada;
}

const JA_RECEBIDO: readonly string[] = ['recebido', 'divergente'];

/**
 * Na porta: pagamento primeiro (se houver a receber), correção enquanto a parada não termina e
 * entregar só com comprovante em dia.
 */
function naPorta(parada: Parada): AcaoDaParada[] {
  const { recebimentoStatus } = parada.pagamento;
  const aReceber = recebimentoStatus === 'a_receber';
  const acoes: AcaoDaParada[] = [...NA_PORTA];
  if (aReceber) acoes.push('recebimentos');
  if (JA_RECEBIDO.includes(recebimentoStatus)) acoes.push('corrigir_recebimento');
  if (!aReceber && !parada.comprovante.pendente) acoes.push('entregar');
  return acoes;
}
