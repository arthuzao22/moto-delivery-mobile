import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

/** Só lógica pura (sem React Native): o que depende de tela é testado no aparelho. */
export default defineConfig({
  resolve: { alias: { '@': resolve('src') } },
  test: { include: ['src/**/__tests__/**/*.test.ts'] },
});
