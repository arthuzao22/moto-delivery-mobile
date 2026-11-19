import { describe, expect, it } from 'vitest';
import { lerPreferencia, proximaPreferencia } from '../preferencia-de-tema';

describe('preferência de tema', () => {
  it('escuro é o padrão, também para valor desconhecido', () => {
    expect(lerPreferencia(null)).toBe('escuro');
    expect(lerPreferencia('roxo')).toBe('escuro');
    expect(lerPreferencia('claro')).toBe('claro');
  });

  it('o atalho alterna escuro, claro, sistema e volta', () => {
    expect(proximaPreferencia('escuro')).toBe('claro');
    expect(proximaPreferencia('claro')).toBe('sistema');
    expect(proximaPreferencia('sistema')).toBe('escuro');
  });
});
