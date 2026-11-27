import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Ponto } from '../fila-de-pontos';

/**
 * A serialização real de `envio.ts` (`emSerie` e `emAndamento`) com um AsyncStorage em memória que
 * demora um pouco em cada leitura e gravação, para que as chamadas se intercalem como no aparelho.
 */
const armazem = vi.hoisted(() => {
  const dados = new Map<string, string>();
  const demora = async (): Promise<void> => new Promise((pronto) => setTimeout(pronto, Math.random() * 3));
  return {
    dados,
    AsyncStorage: {
      getItem: async (chave: string) => {
        await demora();
        return dados.get(chave) ?? null;
      },
      setItem: async (chave: string, valor: string) => {
        await demora();
        dados.set(chave, valor);
      },
      removeItem: async (chave: string) => {
        await demora();
        dados.delete(chave);
      },
    },
  };
});

const rede = vi.hoisted(() => {
  const recebidos: Ponto[] = [];
  return { recebidos, chamadas: 0, status: 201 };
});

vi.mock('@react-native-async-storage/async-storage', () => ({ default: armazem.AsyncStorage }));
vi.mock('@/api/cliente', () => ({
  api: {
    POST: async (_rota: string, opcoes: { body: { pontos: Ponto[] } }) => {
      rede.chamadas += 1;
      await new Promise((pronto) => setTimeout(pronto, Math.random() * 5));
      rede.recebidos.push(...opcoes.body.pontos);
      return { response: { status: rede.status } };
    },
  },
}));

const { enviarPendentes, guardarPontos, limparFila } = await import('../envio');

const ponto = (n: number): Ponto => ({ lat: n, lng: n, registradoEm: new Date(n * 1000).toISOString() });

describe('envio da fila guardada', () => {
  beforeEach(async () => {
    await limparFila();
    rede.recebidos.length = 0;
    rede.chamadas = 0;
    rede.status = 201;
  });

  afterEach(() => {
    armazem.dados.clear();
  });

  it('guardar pontos durante o envio não perde nem duplica', async () => {
    await guardarPontos(Array.from({ length: 150 }, (_, i) => ponto(i)));
    const chegando = Array.from({ length: 30 }, (_, i) => guardarPontos([ponto(1000 + i)]));
    const envio = enviarPendentes();
    await Promise.all(chegando);
    await envio;
    await enviarPendentes();

    const esperados = [
      ...Array.from({ length: 150 }, (_, i) => i),
      ...Array.from({ length: 30 }, (_, i) => 1000 + i),
    ];
    expect(rede.recebidos.map((p) => p.lat).sort((a, b) => a - b)).toEqual(esperados);
    expect(armazem.dados.get('gps.fila')).toBe('[]');
  });

  it('duas chamadas ao mesmo tempo fazem uma rodada só', async () => {
    await guardarPontos([ponto(1), ponto(2)]);
    const [primeira, segunda] = await Promise.all([enviarPendentes(), enviarPendentes()]);
    expect(primeira).toBe('enviado');
    expect(segunda).toBe('enviado');
    expect(rede.chamadas).toBe(1);
    expect(rede.recebidos).toHaveLength(2);
  });

  it('lote recusado com 400 sai da fila guardada', async () => {
    rede.status = 400;
    await guardarPontos([ponto(1)]);
    expect(await enviarPendentes()).toBe('enviado');
    expect(armazem.dados.get('gps.fila')).toBe('[]');
  });
});
