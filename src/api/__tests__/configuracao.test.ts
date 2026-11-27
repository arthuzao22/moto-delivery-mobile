import { describe, expect, it } from 'vitest';
import { baseDaApi, varianteDoApp } from '../configuracao';

describe('baseDaApi', () => {
  it('acrescenta /api/v1 à origem e tira a barra do fim', () => {
    expect(baseDaApi('http://192.168.1.12:3333', 'development')).toBe('http://192.168.1.12:3333/api/v1');
    expect(baseDaApi(' http://192.168.1.12:3333/ ', 'development')).toBe('http://192.168.1.12:3333/api/v1');
  });

  it('não duplica o /api/v1 quando já vem nele', () => {
    expect(baseDaApi('https://api.exemplo.dev/api/v1', 'production')).toBe('https://api.exemplo.dev/api/v1');
  });

  it('sem valor, não há API configurada', () => {
    expect(baseDaApi(undefined, 'development')).toBeNull();
    expect(baseDaApi('   ', 'production')).toBeNull();
  });

  it('fora do development, recusa o que não for HTTPS', () => {
    expect(baseDaApi('http://api.exemplo.dev', 'preview')).toBeNull();
    expect(baseDaApi('http://192.168.1.12:3333', 'production')).toBeNull();
    expect(baseDaApi('api.exemplo.dev', 'production')).toBeNull();
    expect(baseDaApi('https://api.exemplo.dev', 'preview')).toBe('https://api.exemplo.dev/api/v1');
  });
});

describe('varianteDoApp', () => {
  it('lê a variante do extra', () => {
    expect(varianteDoApp({ variante: 'development' })).toBe('development');
    expect(varianteDoApp({ variante: 'preview' })).toBe('preview');
  });

  it('sem variante ou com valor estranho, vale production', () => {
    expect(varianteDoApp(undefined)).toBe('production');
    expect(varianteDoApp({})).toBe('production');
    expect(varianteDoApp({ variante: 'qualquer' })).toBe('production');
  });
});
