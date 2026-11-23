const MS_POR_SEGUNDO = 1000;
const SEGUNDOS_POR_MINUTO = 60;
const DIGITOS = 2;

/** Segundos que faltam da espera pelo cliente ausente; nunca negativo. */
export function segundosDaEspera(expiraEm: string, agora: number): number {
  return Math.max(0, Math.ceil((Date.parse(expiraEm) - agora) / MS_POR_SEGUNDO));
}

/** 272 → "04:32". A espera da parceria passa de minutos, mas nunca de uma hora. */
export function mmss(segundos: number): string {
  const minutos = Math.floor(segundos / SEGUNDOS_POR_MINUTO);
  const resto = segundos % SEGUNDOS_POR_MINUTO;
  return `${String(minutos).padStart(DIGITOS, '0')}:${String(resto).padStart(DIGITOS, '0')}`;
}

/** O código de devolução: só dígitos, no máximo 6 (o que passar disso é ignorado). */
export function codigoDigitado(texto: string): string {
  const TAMANHO_DO_CODIGO = 6;
  return texto.replace(/\D/g, '').slice(0, TAMANHO_DO_CODIGO);
}
