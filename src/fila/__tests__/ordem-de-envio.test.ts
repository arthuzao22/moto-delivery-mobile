import { describe, expect, it } from 'vitest';
import { enviarNaOrdem } from '../ordem-de-envio';

describe('ordem de envio ao voltar o sinal', () => {
  it('manda os pontos de GPS antes das ações de campo', async () => {
    const ordem: string[] = [];
    await enviarNaOrdem(
      async () => {
        await Promise.resolve();
        ordem.push('gps');
      },
      async () => {
        ordem.push('acoes');
      },
    );
    expect(ordem).toEqual(['gps', 'acoes']);
  });

  it('um erro do GPS não impede o envio das ações', async () => {
    const ordem: string[] = [];
    await enviarNaOrdem(
      async () => {
        throw new Error('sem rede');
      },
      async () => {
        ordem.push('acoes');
      },
    );
    expect(ordem).toEqual(['acoes']);
  });
});
