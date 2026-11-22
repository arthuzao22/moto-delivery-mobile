/** O que o `POST /auth/app/login` e o `/auth/app/refresh` devolvem e o app guarda. */
export interface Tokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  /** ISO 8601. O access vale 15 min; o refresh, 30 dias. */
  readonly acessoExpiraEm: string;
  readonly organizacaoId: string;
  readonly motoboyId: string | null;
}

export function ehTokens(valor: unknown): valor is Tokens {
  if (typeof valor !== 'object' || valor === null) return false;
  const campos = ['accessToken', 'refreshToken', 'acessoExpiraEm', 'organizacaoId'] as const;
  return campos.every((campo) => campo in valor && typeof Reflect.get(valor, campo) === 'string');
}

/** Folga para renovar antes de vencer: um relógio do celular um pouco atrasado não derruba a chamada. */
const FOLGA_MS = 30_000;

export function acessoVencido(tokens: Tokens, agora: Date): boolean {
  return Date.parse(tokens.acessoExpiraEm) - FOLGA_MS <= agora.getTime();
}
