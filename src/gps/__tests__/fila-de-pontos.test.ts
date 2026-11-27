import { describe, expect, it } from 'vitest';
import {
  acrescentar,
  esvaziar,
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
    expect(semOEnviado(fila, proximoLote(fila))[0]).toEqual(ponto(TAMANHO_DO_LOTE));
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

/** Fila em memória: `aoEnviar` roda durante o envio (pontos chegando do GPS no meio do caminho). */
function filaFalsa(inicial: readonly Ponto[], status: (lote: readonly Ponto[]) => number | null) {
  let guardada: readonly Ponto[] = inicial;
  const enviados: Ponto[][] = [];
  let aoEnviar = (): void => undefined;
  return {
    portas: {
      ler: async () => guardada,
      removerLote: async (lote: readonly Ponto[]) => {
        guardada = semOEnviado(guardada, lote);
        return guardada;
      },
      enviar: async (lote: readonly Ponto[]) => {
        enviados.push([...lote]);
        aoEnviar();
        return status(lote);
      },
    },
    guardada: () => guardada,
    enviados,
    durante: (passo: (atual: readonly Ponto[]) => readonly Ponto[]) => {
      aoEnviar = () => {
        guardada = passo(guardada);
        aoEnviar = () => undefined;
      };
    },
  };
}

describe('envio da fila de pontos', () => {
  it('422 descarta só o lote recusado e segue com o resto', async () => {
    const fila = filaFalsa(pontos(250), (lote) => (lote[0]?.lat === 0 ? 422 : 201));
    expect(await esvaziar(fila.portas)).toBe('enviado');
    expect(fila.enviados.map((lote) => lote.length)).toEqual([100, 100, 50]);
    expect(fila.enviados[1]?.[0]).toEqual(ponto(100));
    expect(fila.guardada()).toEqual([]);
  });

  it('422 no lote mais novo avisa que o turno acabou', async () => {
    const fila = filaFalsa(pontos(150), (lote) => (lote[0]?.lat === 100 ? 422 : 201));
    expect(await esvaziar(fila.portas)).toBe('turno_fechado');
    expect(fila.guardada()).toEqual([]);
  });

  it('sem rede ou erro do servidor, para e mantém o lote', async () => {
    const semRede = filaFalsa(pontos(150), () => null);
    expect(await esvaziar(semRede.portas)).toBe('sem_rede');
    expect(semRede.guardada()).toHaveLength(150);
    const erro = filaFalsa(pontos(10), () => 503);
    expect(await esvaziar(erro.portas)).toBe('sem_rede');
    expect(erro.guardada()).toHaveLength(10);
  });

  it('pontos que chegam durante o envio ficam e saem no próximo lote', async () => {
    const fila = filaFalsa(pontos(3), () => 201);
    fila.durante((atual) => acrescentar(atual, pontos(2, 3)));
    expect(await esvaziar(fila.portas)).toBe('enviado');
    expect(fila.enviados).toEqual([pontos(3), pontos(2, 3)]);
    expect(fila.guardada()).toEqual([]);
  });

  it('com a fila cheia cortando os mais antigos durante o envio, só some o que foi enviado', async () => {
    const lote = pontos(TAMANHO_DO_LOTE);
    // Durante o envio, os 30 primeiros do lote foram cortados e chegaram pontos novos.
    const atual = [...lote.slice(30), ...pontos(5, 5000)];
    expect(semOEnviado(atual, lote)).toEqual(pontos(5, 5000));
  });

  it('não apaga nada se a frente da fila não é o lote enviado', () => {
    expect(semOEnviado(pontos(5, 900), pontos(5))).toEqual(pontos(5, 900));
  });
});
