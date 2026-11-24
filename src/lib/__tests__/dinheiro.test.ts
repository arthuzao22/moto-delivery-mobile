import { describe, expect, it } from 'vitest';
import { decimalDigitado, formatarReais, paraDigitar } from '../dinheiro';

describe('dinheiro como texto', () => {
  it('formata o decimal da API em reais', () => {
    expect(formatarReais('25.90')).toBe('R$ 25,90');
    expect(formatarReais('1234567.05')).toBe('R$ 1.234.567,05');
    expect(formatarReais('0.00')).toBe('R$ 0,00');
    expect(formatarReais('-5.00')).toBe('-R$ 5,00');
  });

  it('monta a string da API a partir do que foi digitado, sem fazer conta', () => {
    expect(decimalDigitado('25')).toBe('25.00');
    expect(decimalDigitado('25,9')).toBe('25.90');
    expect(decimalDigitado(' 025,90 ')).toBe('25.90');
    expect(decimalDigitado('25.90')).toBeNull();
    expect(decimalDigitado('25,999')).toBeNull();
    expect(decimalDigitado('')).toBeNull();
    expect(decimalDigitado('abc')).toBeNull();
  });

  it('volta o valor previsto para o campo', () => {
    expect(paraDigitar('50.00')).toBe('50,00');
  });
});
