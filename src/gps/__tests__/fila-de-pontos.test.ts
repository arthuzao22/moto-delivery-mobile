import { describe, expect, it } from 'vitest';
import {
  acrescentar,
  LIMITE_DA_FILA,
  pontoDe,
  proximoLote,
  semOEnviado,
  TAMANHO_DO_LOTE,
  type Ponto,
} from '../fila-de-pontos';

const ponto = (n: number): Ponto => ({ lat: n, lng: n, registradoEm: new Date(n * 1000).toISOString() });
const pontos = (quantos: number, inicio = 0): Ponto[] =>
  Array.from({ length: quantos }, (_, i) => ponto(inicio + i));

describe('fila de pontos', () => {
  it('manda em lotes de até 100, dos mais antigos', () => {
    const fila = pontos(250);
    expect(proximoLote(fila)).toHaveLength(TAMANHO_DO_LOTE);
    expect(proximoLote(fila)[0]).toEqual(ponto(0));
    expect(semOEnviado(fila, TAMANHO_DO_LOTE)[0]).toEqual(ponto(TAMANHO_DO_LOTE));
  });

  it('sem sinal por muito tempo, guarda só os mais novos', () => {
    const fila = acrescentar(pontos(LIMITE_DA_FILA), pontos(10, LIMITE_DA_FILA));
    expect(fila).toHaveLength(LIMITE_DA_FILA);
    expect(fila.at(-1)).toEqual(ponto(LIMITE_DA_FILA + 9));
    expect(fila[0]).toEqual(ponto(10));
  });

  it('converte o ponto do GPS, sem mandar precisão e velocidade desconhecidas', () => {
    const local = { timestamp: 0, coords: { latitude: -19.9, longitude: -43.9, accuracy: 12, speed: -1 } };
    expect(pontoDe(local, 80)).toEqual({
      lat: -19.9,
      lng: -43.9,
      registradoEm: '1970-01-01T00:00:00.000Z',
      precisaoM: 12,
      bateriaPct: 80,
    });
    expect(pontoDe({ ...local, coords: { ...local.coords, accuracy: null } }, null)).not.toHaveProperty(
      'precisaoM',
    );
  });
});
