/**
 * Ao voltar o sinal (ou ao abrir o app), os pontos de GPS saem antes das ações de campo: se o
 * "encerrar rota" chegasse primeiro, o trajeto feito offline chegaria depois da rota fechada. Um
 * erro do GPS não segura as ações.
 */
export async function enviarNaOrdem(
  enviarGps: () => Promise<unknown>,
  enviarAcoes: () => Promise<void>,
): Promise<void> {
  await enviarGps().catch(() => undefined);
  await enviarAcoes();
}
