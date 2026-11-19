import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';

/**
 * Espelho dos tokens do global.css para o que não lê classe: o tema do React Navigation e a cor
 * de ícones. Mudou um token lá, muda aqui também.
 */
const ESCURO = {
  background: 'hsl(0, 0%, 3.9%)',
  card: 'hsl(0, 0%, 6.7%)',
  foreground: 'hsl(0, 0%, 89.8%)',
  border: 'hsl(0, 0%, 13.3%)',
  primary: 'hsl(18.1, 100%, 50%)',
} as const;

const CLARO = {
  background: 'hsl(0, 0%, 98%)',
  card: 'hsl(0, 0%, 100%)',
  foreground: 'hsl(0, 0%, 10.2%)',
  border: 'hsl(0, 0%, 89.8%)',
  primary: 'hsl(18.1, 100%, 50%)',
} as const;

/** A faixa do topo e a tab bar são escuras nos dois temas (regra da marca, documento 01 §1). */
export const COR_DO_CHROME = { fundo: 'hsl(0, 0%, 3.9%)', texto: 'hsl(0, 0%, 89.8%)' } as const;

function temaDaNavegacao(base: Theme, cores: typeof ESCURO | typeof CLARO): Theme {
  return {
    ...base,
    colors: {
      background: cores.background,
      card: cores.card,
      text: cores.foreground,
      border: cores.border,
      primary: cores.primary,
      notification: cores.primary,
    },
  };
}

export const TEMA_DA_NAVEGACAO = {
  dark: temaDaNavegacao(DarkTheme, ESCURO),
  light: temaDaNavegacao(DefaultTheme, CLARO),
} as const;
