const PREFIXO_DA_API = '/api/v1';

export type Variante = 'development' | 'preview' | 'production';

const VARIANTES: readonly Variante[] = ['development', 'preview', 'production'];

/**
 * A variante gravada pelo `app.config.js` em `extra.variante`. Sem ela, ou com valor estranho,
 * vale production: na dúvida, o app não fala HTTP.
 */
export function varianteDoApp(extra: unknown): Variante {
  if (typeof extra !== 'object' || extra === null || !('variante' in extra)) return 'production';
  const { variante } = extra;
  return VARIANTES.find((item) => item === variante) ?? 'production';
}

/**
 * Endereço da API com `/api/v1`, a partir de `EXPO_PUBLIC_API_URL` (só a origem, ex.:
 * `http://192.168.1.12:3333`). Null quando não está configurado: a tela avisa em vez de tentar.
 * Também null com `http://` fora do build de desenvolvimento: preview e production só HTTPS,
 * mesmo que a variável venha errada no build.
 */
export function baseDaApi(origem: string | undefined, variante: Variante): string | null {
  const limpa = origem?.trim().replace(/\/+$/, '') ?? '';
  if (limpa === '') return null;
  if (variante !== 'development' && !/^https:\/\//i.test(limpa)) return null;
  return limpa.endsWith(PREFIXO_DA_API) ? limpa : `${limpa}${PREFIXO_DA_API}`;
}
