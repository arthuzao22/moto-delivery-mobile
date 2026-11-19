const PREFIXO_DA_API = '/api/v1';

/**
 * Endereço da API com `/api/v1`, a partir de `EXPO_PUBLIC_API_URL` (só a origem, ex.:
 * `http://192.168.1.12:3333`). Null quando não está configurado: a tela avisa em vez de tentar.
 */
export function baseDaApi(origem: string | undefined): string | null {
  const limpa = origem?.trim().replace(/\/+$/, '') ?? '';
  if (limpa === '') return null;
  return limpa.endsWith(PREFIXO_DA_API) ? limpa : `${limpa}${PREFIXO_DA_API}`;
}
