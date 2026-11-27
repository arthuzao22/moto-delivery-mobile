import { afterEach, describe, expect, it, vi } from 'vitest';
import { comPrazo, enviarNaOrdem, ESPERA_MAXIMA_DO_GPS_MS } from '../ordem-de-envio';

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

  it('as ações não esperam o GPS além do teto', async () => {
    vi.useFakeTimers();
    const ordem: string[] = [];
    const pendurado = new Promise<never>(() => undefined);
    const enviando = enviarNaOrdem(
      async () => pendurado,
      async () => {
        ordem.push('acoes');
      },
    );
    await vi.advanceTimersByTimeAsync(ESPERA_MAXIMA_DO_GPS_MS - 1);
    expect(ordem).toEqual([]);
    await vi.advanceTimersByTimeAsync(1);
    await enviando;
    expect(ordem).toEqual(['acoes']);
  });
});

describe('prazo', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('devolve o resultado da tarefa quando ela termina a tempo', async () => {
    vi.useFakeTimers();
    await expect(comPrazo(Promise.resolve(201), 1000, null)).resolves.toBe(201);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('devolve o valor do estouro quando a tarefa pendura', async () => {
    vi.useFakeTimers();
    const resultado = comPrazo(new Promise<number>(() => undefined), 1000, null);
    await vi.advanceTimersByTimeAsync(1000);
    await expect(resultado).resolves.toBeNull();
  });
});
