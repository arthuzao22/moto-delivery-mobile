const MS_POR_SEGUNDO = 1000;

/** Segundos até a oferta expirar, nunca negativo. Zero fecha a tela. */
export function segundosRestantes(expiraEm: string, agora: number): number {
  return Math.max(0, Math.ceil((Date.parse(expiraEm) - agora) / MS_POR_SEGUNDO));
}

/** Quanto falta do prazo (1 = acabou de chegar, 0 = expirou), para a barra de tempo. */
export function fracaoRestante(enviadaEm: string, expiraEm: string, agora: number): number {
  const inicio = Date.parse(enviadaEm);
  const fim = Date.parse(expiraEm);
  if (fim <= inicio) return 0;
  return Math.min(1, Math.max(0, (fim - agora) / (fim - inicio)));
}

/** "6,7 km": a API manda o km pronto (uma casa); o app só formata. */
export function formatarKm(km: number): string {
  return `${km.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`;
}
