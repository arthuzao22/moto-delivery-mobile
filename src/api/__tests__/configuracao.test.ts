import { describe, expect, it } from 'vitest';
import { baseDaApi } from '../configuracao';

describe('baseDaApi', () => {
  it('acrescenta /api/v1 à origem e tira a barra do fim', () => {
    expect(baseDaApi('http://192.168.1.12:3333')).toBe('http://192.168.1.12:3333/api/v1');
    expect(baseDaApi(' http://192.168.1.12:3333/ ')).toBe('http://192.168.1.12:3333/api/v1');
  });

  it('não duplica o /api/v1 quando já vem nele', () => {
    expect(baseDaApi('https://api.exemplo.dev/api/v1')).toBe('https://api.exemplo.dev/api/v1');
  });

  it('sem valor, não há API configurada', () => {
    expect(baseDaApi(undefined)).toBeNull();
    expect(baseDaApi('   ')).toBeNull();
  });
});
