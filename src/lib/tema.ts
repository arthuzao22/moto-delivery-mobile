import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';

/**
 * Espelho dos tokens do global.css para o que não lê classe: o tema do React Navigation e a cor
 * de ícones. Mudou um token lá, muda aqui também.
 */
const ESCURO = {
  background: 'hsl(0, 0%, 3.9%)',
  card: 'hsl(0, 0%, 6.7%)',
  foreground: 'hsl(0, 0%, 89.8%)',
  heading: 'hsl(0, 0%, 100%)',
  muted: 'hsl(0, 0%, 53.3%)',
  border: 'hsl(0, 0%, 13.3%)',
  primary: 'hsl(18.1, 100%, 50%)',
  brandText: 'hsl(18.1, 100%, 50%)',
  destructive: 'hsl(3.9, 85.8%, 58%)',
} as const;

const CLARO = {
  background: 'hsl(0, 0%, 98%)',
  card: 'hsl(0, 0%, 100%)',
  foreground: 'hsl(0, 0%, 10.2%)',
  heading: 'hsl(0, 0%, 3.9%)',
  muted: 'hsl(0, 0%, 42%)',
  border: 'hsl(0, 0%, 89.8%)',
  primary: 'hsl(18.1, 100%, 50%)',
  brandText: 'hsl(17.9, 100%, 38%)',
  destructive: 'hsl(4.2, 76.5%, 40%)',
} as const;

export type CoresDoTema = { readonly [K in keyof typeof ESCURO]: string };

/** Cores de ícone por tema: `useCores()` (em provedor-de-tema) escolhe o conjunto da tela. */
export const CORES_DO_TEMA: Readonly<Record<'dark' | 'light', CoresDoTema>> = { dark: ESCURO, light: CLARO };

/** A faixa do topo e a tab bar são escuras nos dois temas (regra da marca, documento 01 §1). */
export const COR_DO_CHROME = { fundo: 'hsl(0, 0%, 3.9%)', texto: 'hsl(0, 0%, 89.8%)' } as const;

function temaDaNavegacao(base: Theme, cores: CoresDoTema): Theme {
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

/** Texto de exemplo dos campos: o `muted-foreground` do escuro, legível nos dois temas. */
export const COR_DO_PLACEHOLDER = 'hsl(0, 0%, 53.3%)';

/** Ícone e rótulo da aba ativa: o laranja da marca, o mesmo nos dois temas. */
export const COR_DA_ABA_ATIVA = 'hsl(18.1, 100%, 50%)';
