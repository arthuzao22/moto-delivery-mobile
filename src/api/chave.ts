const BASE = 36;

/** `Idempotency-Key` de uma ação: a mesma chave reenviada não repete a ação na API (48 h). */
export function novaChave(prefixo: string): string {
  return `${prefixo}-${Date.now().toString(BASE)}-${Math.random().toString(BASE).slice(2, 12)}`;
}

/** Hora real do toque (`eventoEm`): com a fila offline (M6), vale a hora da ação, não a do envio. */
export function agoraIso(): string {
  return new Date().toISOString();
}
