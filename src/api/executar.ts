import { ErroDaApi, paraErroDaApi } from './erro-da-api';

/** Formato devolvido pelo openapi-fetch: `data` no sucesso, `error` na falha. */
interface Resultado {
  readonly data?: unknown;
  readonly error?: unknown;
  readonly response: Response;
}

type CorpoDe<R extends Resultado> = NonNullable<R['data']>;
type DadosDe<R extends Resultado> = CorpoDe<R> extends { dados: infer D } ? D : never;

async function resolver(chamada: Promise<Resultado>): Promise<unknown> {
  let resultado: Resultado;
  try {
    resultado = await chamada;
  } catch {
    throw ErroDaApi.semConexao();
  }
  if (resultado.data === undefined || !resultado.response.ok) {
    throw paraErroDaApi(resultado.response.status, resultado.error);
  }
  return resultado.data;
}

function dadosDoCorpo(corpo: unknown): unknown {
  return corpo && typeof corpo === 'object' && 'dados' in corpo ? corpo.dados : undefined;
}

/**
 * Executa a chamada e devolve `dados`; erro vira `ErroDaApi` (com `codigo` e `requestId`).
 * A assinatura pública vem do contrato (tipos gerados); a implementação só desembrulha.
 */
export function dadosDe<R extends Resultado>(chamada: Promise<R>): Promise<DadosDe<R>>;
export async function dadosDe(chamada: Promise<Resultado>): Promise<unknown> {
  return dadosDoCorpo(await resolver(chamada));
}

/** Para listas paginadas: devolve o corpo inteiro (`dados` + `meta.proximoCursor`). */
export function corpoDe<R extends Resultado>(chamada: Promise<R>): Promise<CorpoDe<R>>;
export async function corpoDe(chamada: Promise<Resultado>): Promise<unknown> {
  return resolver(chamada);
}
