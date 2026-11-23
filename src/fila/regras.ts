/**
 * Regras puras da fila offline (documento 04 M6). Nenhuma acessa banco, rede ou relógio: o
 * armazém (SQLite) e o envio usam estas decisões.
 */

/** Uma ação de campo guardada no celular, com a chave e a hora do toque originais. */
export interface AcaoNaFila {
  readonly id: number;
  /** Idempotency-Key: reenviar com a mesma chave nunca repete a ação (a API guarda 48 h). */
  readonly chave: string;
  /** Caminho já resolvido, relativo a /api/v1 (ex.: /app/entregas/<id>/cheguei). */
  readonly caminho: string;
  readonly corpo: string;
  /** A rota (ou "turno") da ação: um conflito para só as ações do mesmo grupo. */
  readonly grupo: string;
  /** Texto curto para o motoboy: "Cheguei · E-1041". */
  readonly descricao: string;
}

export type Desfecho = 'concluida' | 'tentar_depois' | 'conflito';

const STATUS_NAO_AUTENTICADO = 401;
const STATUS_LIMITE = 429;
const STATUS_ERRO_DO_SERVIDOR = 500;
const STATUS_CLIENTE = 400;
const STATUS_SUCESSO_MAXIMO = 299;

/**
 * O que fazer com a ação depois de uma tentativa. Sem resposta (sem rede), 401 (a sessão se resolve
 * à parte), 429 e erro do servidor: tenta depois. 4xx: a API recusou de vez (estado mudou, regra),
 * então é conflito e a ação sai da fila.
 */
export function desfechoDo(status: number | null): Desfecho {
  if (status === null) return 'tentar_depois';
  if (status <= STATUS_SUCESSO_MAXIMO) return 'concluida';
  if (status === STATUS_NAO_AUTENTICADO || status === STATUS_LIMITE || status >= STATUS_ERRO_DO_SERVIDOR) {
    return 'tentar_depois';
  }
  return status >= STATUS_CLIENTE ? 'conflito' : 'tentar_depois';
}

/** As ações que dependem da que deu conflito: as seguintes do mesmo grupo, que a API também recusaria. */
export function dependentes(fila: readonly AcaoNaFila[], conflito: AcaoNaFila): AcaoNaFila[] {
  return fila.filter((acao) => acao.grupo === conflito.grupo && acao.id > conflito.id);
}
