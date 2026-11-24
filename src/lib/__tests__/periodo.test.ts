import { describe, expect, it } from 'vitest';
import { deslocar, diasDoPeriodo, ehHoje, periodoDoAtalho, rotuloDoPeriodo } from '../periodo';

const HOJE = new Date(2026, 10, 23, 14, 0);

describe('filtro de datas', () => {
  it('monta os atalhos a partir de hoje', () => {
    expect(periodoDoAtalho('hoje', HOJE)).toEqual({ de: '2026-11-23', ate: '2026-11-23' });
    expect(periodoDoAtalho('ontem', HOJE)).toEqual({ de: '2026-11-22', ate: '2026-11-22' });
    expect(periodoDoAtalho('semana', HOJE)).toEqual({ de: '2026-11-17', ate: '2026-11-23' });
    expect(diasDoPeriodo(periodoDoAtalho('mes', HOJE))).toBe(30);
  });

  it('anda pelo tamanho do período e não passa de hoje', () => {
    const hoje = periodoDoAtalho('hoje', HOJE);
    expect(deslocar(hoje, -1, HOJE)).toEqual({ de: '2026-11-22', ate: '2026-11-22' });
    expect(deslocar(hoje, 1, HOJE)).toEqual(hoje);
    expect(deslocar({ de: '2026-11-30', ate: '2026-11-30' }, -1, new Date(2026, 11, 2))).toEqual({
      de: '2026-11-29',
      ate: '2026-11-29',
    });
    expect(deslocar(periodoDoAtalho('semana', HOJE), -1, HOJE)).toEqual({
      de: '2026-11-10',
      ate: '2026-11-16',
    });
    expect(ehHoje(periodoDoAtalho('semana', HOJE), HOJE)).toBe(true);
  });

  it('escreve o período para o motoboy', () => {
    expect(rotuloDoPeriodo({ de: '2026-11-23', ate: '2026-11-23' }, HOJE)).toBe('Hoje');
    expect(rotuloDoPeriodo({ de: '2026-11-22', ate: '2026-11-22' }, HOJE)).toBe('Ontem');
    expect(rotuloDoPeriodo({ de: '2026-11-20', ate: '2026-11-20' }, HOJE)).toBe('sex, 20/11');
    expect(rotuloDoPeriodo({ de: '2026-11-17', ate: '2026-11-23' }, HOJE)).toBe('17/11 a 23/11');
  });
});
