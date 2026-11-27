/**
 * Quanto as ações de campo esperam pelo GPS. A API associa cada ponto ao turno e à rota do instante
 * `registradoEm`, então um ponto que chega depois do "encerrar rota" ainda cai na rota certa: mandar o
 * GPS antes passou a ser só otimização (o mapa da central fica em dia antes da ação). Com sinal fraco
 * uma rodada de GPS pode levar muito (até 2.000 pontos em 20 lotes); "entregar" e "finalizar" não
 * ficam parados atrás dela: depois deste teto saem mesmo com o GPS ainda enviando.
 */
export const ESPERA_MAXIMA_DO_GPS_MS = 8_000;

/**
 * A tarefa ou, se ela não terminar em `prazoMs`, `noEstouro`. A tarefa não é cancelada aqui: quem
 * puder cancelar (um fetch com AbortController) cancela por conta própria.
 */
export function comPrazo<T>(tarefa: Promise<T>, prazoMs: number, noEstouro: T): Promise<T> {
  let relogio: ReturnType<typeof setTimeout> | undefined;
  const estouro = new Promise<T>((resolver) => {
    relogio = setTimeout(() => resolver(noEstouro), prazoMs);
  });
  return Promise.race([tarefa, estouro]).finally(() => clearTimeout(relogio));
}

/**
 * Ao voltar o sinal (ou ao abrir o app), os pontos de GPS saem antes das ações de campo, mas no
 * máximo por `esperaMaximaMs` (ver `ESPERA_MAXIMA_DO_GPS_MS`); a rodada de GPS segue sozinha depois
 * disso. Um erro do GPS não segura as ações.
 */
export async function enviarNaOrdem(
  enviarGps: () => Promise<unknown>,
  enviarAcoes: () => Promise<void>,
  esperaMaximaMs = ESPERA_MAXIMA_DO_GPS_MS,
): Promise<void> {
  await comPrazo(
    enviarGps().catch(() => undefined),
    esperaMaximaMs,
    undefined,
  );
  await enviarAcoes();
}
