import { describe, expect, it } from 'vitest';
import { dataPorExtenso, formatarData, formatarDia, ultimosDias } from '../datas';

describe('datas', () => {
  it('mostra o dia com a semana, sem depender do fuso', () => {
    expect(formatarDia('2026-11-22')).toBe('dom, 22/11');
    expect(formatarDia('2026-11-01')).toBe('dom, 01/11');
    expect(formatarData('2026-11-01')).toBe('01/11/2026');
  });

  it('o período padrão são os últimos dias até hoje, inclusive', () => {
    expect(ultimosDias(7, new Date(2026, 10, 22, 15, 0))).toEqual({ de: '2026-11-16', ate: '2026-11-22' });
  });

  it('escreve o dia por extenso', () => {
    expect(dataPorExtenso(new Date(2026, 10, 23, 9, 0))).toBe('Segunda, 23 de novembro');
  });
});
