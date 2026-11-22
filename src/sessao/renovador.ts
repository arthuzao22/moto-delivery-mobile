import type { Tokens } from './tokens';

/** Resultado da tentativa de renovar: tokens novos, sessão perdida (vai ao login) ou sem rede. */
export type Renovacao =
  | { readonly tipo: 'renovada'; readonly tokens: Tokens }
  | { readonly tipo: 'perdida' }
  | { readonly tipo: 'sem_rede' };

export interface DependenciasDoRenovador {
  ler(): Promise<Tokens | null>;
  guardar(tokens: Tokens): Promise<void>;
  /** Chama `POST /auth/app/refresh`. Lança erro quando não há rede. */
  pedir(refreshToken: string): Promise<{ readonly status: number; readonly tokens: Tokens | null }>;
}

const STATUS_NAO_AUTENTICADO = 401;

/**
 * Uma renovação por vez (documento 04 §2.3): o refresh é rotativo, e apresentar um já usado revoga
 * a família inteira. Quem chega enquanto uma renovação corre espera a mesma promessa.
 */
export class Renovador {
  private emAndamento: Promise<Renovacao> | null = null;

  constructor(private readonly deps: DependenciasDoRenovador) {}

  renovar(): Promise<Renovacao> {
    this.emAndamento ??= this.executar().finally(() => {
      this.emAndamento = null;
    });
    return this.emAndamento;
  }

  private async executar(): Promise<Renovacao> {
    const atuais = await this.deps.ler();
    if (atuais === null) return { tipo: 'perdida' };
    let resposta: Awaited<ReturnType<DependenciasDoRenovador['pedir']>>;
    try {
      resposta = await this.deps.pedir(atuais.refreshToken);
    } catch {
      return { tipo: 'sem_rede' };
    }
    if (resposta.tokens !== null) {
      await this.deps.guardar(resposta.tokens);
      return { tipo: 'renovada', tokens: resposta.tokens };
    }
    return resposta.status === STATUS_NAO_AUTENTICADO ? { tipo: 'perdida' } : { tipo: 'sem_rede' };
  }
}
