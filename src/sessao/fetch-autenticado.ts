import { acessoVencido, type Tokens } from './tokens';
import type { Renovacao } from './renovador';

const STATUS_NAO_AUTENTICADO = 401;

/** Rotas que não levam Bearer nem tentam renovar: são elas que criam ou renovam a sessão. */
const ROTAS_DE_ACESSO = ['/auth/app/login', '/auth/app/refresh'];

export interface DependenciasDoFetch {
  readonly fetch: (requisicao: Request) => Promise<Response>;
  ler(): Promise<Tokens | null>;
  renovar(): Promise<Renovacao>;
  /** A sessão acabou (refresh recusado): o app volta ao login. */
  aoPerderSessao(): void;
  agora(): Date;
}

function ehRotaDeAcesso(url: string): boolean {
  const caminho = new URL(url).pathname;
  return ROTAS_DE_ACESSO.some((rota) => caminho.endsWith(rota));
}

function comBearer(requisicao: Request, tokens: Tokens | null): Request {
  const copia = requisicao.clone();
  if (tokens !== null) copia.headers.set('Authorization', `Bearer ${tokens.accessToken}`);
  return copia;
}

/** Access vencido renova antes de chamar, para não gastar uma ida e volta com 401. */
async function tokensParaEnviar(deps: DependenciasDoFetch): Promise<Tokens | null> {
  const tokens = await deps.ler();
  if (tokens === null || !acessoVencido(tokens, deps.agora())) return tokens;
  const renovacao = await deps.renovar();
  if (renovacao.tipo === 'renovada') return renovacao.tokens;
  if (renovacao.tipo === 'perdida') deps.aoPerderSessao();
  return tokens;
}

/**
 * O `fetch` do cliente da API: põe o Bearer e, num 401, espera a renovação única e repete a chamada
 * uma vez. Se o refresh também é recusado, a sessão acabou.
 */
export function criarFetchAutenticado(deps: DependenciasDoFetch): (requisicao: Request) => Promise<Response> {
  return async (requisicao) => {
    if (ehRotaDeAcesso(requisicao.url)) return deps.fetch(requisicao);
    const tokens = await tokensParaEnviar(deps);
    const resposta = await deps.fetch(comBearer(requisicao, tokens));
    if (resposta.status !== STATUS_NAO_AUTENTICADO || tokens === null) return resposta;
    const renovacao = await deps.renovar();
    if (renovacao.tipo === 'renovada') return deps.fetch(comBearer(requisicao, renovacao.tokens));
    if (renovacao.tipo === 'perdida') deps.aoPerderSessao();
    return resposta;
  };
}
