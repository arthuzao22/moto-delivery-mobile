import { describe, expect, it } from 'vitest';
import { formatarKm, fracaoRestante, segundosRestantes } from '../oferta';

const ENVIADA = '2026-11-22T12:00:00.000Z';
const EXPIRA = '2026-11-22T12:00:30.000Z';
const em = (segundos: number): number => Date.parse(ENVIADA) + segundos * 1000;

describe('contagem da oferta', () => {
  it('conta os segundos que faltam, arredondando para cima, sem passar de zero', () => {
    expect(segundosRestantes(EXPIRA, em(0))).toBe(30);
    expect(segundosRestantes(EXPIRA, em(29.2))).toBe(1);
    expect(segundosRestantes(EXPIRA, em(31))).toBe(0);
  });

  it('a barra vai de cheia a vazia no prazo', () => {
    expect(fracaoRestante(ENVIADA, EXPIRA, em(0))).toBe(1);
    expect(fracaoRestante(ENVIADA, EXPIRA, em(15))).toBe(0.5);
    expect(fracaoRestante(ENVIADA, EXPIRA, em(40))).toBe(0);
    expect(fracaoRestante(EXPIRA, ENVIADA, em(0))).toBe(0);
  });

  it('formata o km com vírgula e uma casa', () => {
    expect(formatarKm(6.7)).toBe('6,7 km');
    expect(formatarKm(12)).toBe('12,0 km');
  });
});
