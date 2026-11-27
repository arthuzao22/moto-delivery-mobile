import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

/**
 * Guarda da ponte em vendor/decode-uri-component (GHSA-vcc3-ghjq-m6fr e GHSA-qr28-fpjm-wq7f).
 * Se alguém tirar o overrides ou rodar `expo install --fix`/`npm dedupe` e a 0.2.x voltar, isto falha.
 */
const requerer = createRequire(import.meta.url);
const doExpoRouter = createRequire(requerer.resolve('expo-router/package.json'));
const doQueryString = createRequire(doExpoRouter.resolve('query-string'));
const LIMITE_MS = 1000;
const REPETICOES = 18_000;

const decodificador = (): ((texto: string) => string) => {
  const modulo: unknown = doQueryString('decode-uri-component');
  if (typeof modulo !== 'function') throw new Error('decode-uri-component não exporta uma função');
  return (texto) => String(modulo(texto));
};

describe('ponte do decode-uri-component', () => {
  it('o query-string do expo-router usa a ponte do vendor/', () => {
    const caminho = doQueryString.resolve('decode-uri-component').replaceAll('\\', '/');
    expect(caminho).toContain('vendor/decode-uri-component');
  });

  it('decodifica percent-encoding válido', () => {
    expect(decodificador()('a%20b%C3%A7')).toBe('a bç');
  });

  it('percent-encoding malformado e longo termina rápido, sem lançar', () => {
    const malformado = '%'.repeat(REPETICOES);
    const inicio = performance.now();
    expect(() => decodificador()(malformado)).not.toThrow();
    expect(performance.now() - inicio).toBeLessThan(LIMITE_MS);
  });
});
