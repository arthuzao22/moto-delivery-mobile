import { describe, expect, it } from 'vitest';
import { codigoDigitado, mmss, segundosDaEspera } from '../cronometro';

describe('cronômetro do ausente e código de devolução', () => {
  it('conta a espera em segundos, sem passar de zero', () => {
    const expira = '2026-11-22T12:05:00.000Z';
    expect(segundosDaEspera(expira, Date.parse('2026-11-22T12:00:28.500Z'))).toBe(272);
    expect(segundosDaEspera(expira, Date.parse('2026-11-22T12:06:00.000Z'))).toBe(0);
  });

  it('mostra minutos e segundos com dois dígitos', () => {
    expect(mmss(272)).toBe('04:32');
    expect(mmss(0)).toBe('00:00');
    expect(mmss(600)).toBe('10:00');
  });

  it('o código aceita só 6 dígitos', () => {
    expect(codigoDigitado('12a3-45')).toBe('12345');
    expect(codigoDigitado('1234567')).toBe('123456');
  });
});
