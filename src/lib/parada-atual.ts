/** O mínimo de uma parada para decidir qual é a da vez. */
export interface ParadaResumida {
  readonly entregaId: string;
  readonly status: string;
  readonly ordem: number | null;
}

/** Já em atendimento (a caminho, na porta, ausente, esperando decisão ou voltando ao restaurante). */
const EM_ATENDIMENTO = new Set([
  'a_caminho',
  'no_local_entrega',
  'cliente_ausente',
  'aguardando_decisao',
  'retornando',
]);
const FEITAS = new Set(['entregue', 'devolvida', 'cancelada', 'extraviada']);

function porOrdem(a: ParadaResumida, b: ParadaResumida): number {
  return (a.ordem ?? Number.MAX_SAFE_INTEGER) - (b.ordem ?? Number.MAX_SAFE_INTEGER);
}

/**
 * A parada que a tela mostra: a que já está em atendimento; senão, a próxima coletada na ordem.
 * Null quando não sobra nenhuma (a rota está fechando).
 */
export function paradaAtual<P extends ParadaResumida>(paradas: readonly P[]): P | null {
  const ordenadas = [...paradas].sort(porOrdem);
  return (
    ordenadas.find((parada) => EM_ATENDIMENTO.has(parada.status)) ??
    ordenadas.find((parada) => parada.status === 'coletada') ??
    null
  );
}

/** "Parada 2 de 3": a posição da atual entre as que ainda contam (canceladas antes da coleta saem). */
export function progresso(paradas: readonly ParadaResumida[]): { feitas: number; total: number } {
  const contam = paradas.filter((parada) => parada.status !== 'cancelada');
  return { feitas: contam.filter((parada) => FEITAS.has(parada.status)).length, total: contam.length };
}

export function feita(parada: ParadaResumida): boolean {
  return FEITAS.has(parada.status);
}
