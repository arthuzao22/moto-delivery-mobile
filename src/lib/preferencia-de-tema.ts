/** Escuro é o padrão da marca; claro é o "modo dia"; sistema segue o aparelho (documento 01 §7). */
export type PreferenciaDeTema = 'escuro' | 'claro' | 'sistema';

export const PREFERENCIAS_DE_TEMA: readonly PreferenciaDeTema[] = ['escuro', 'claro', 'sistema'];

export const CHAVE_DA_PREFERENCIA = 'preferencia-de-tema';

/** O valor guardado no aparelho, ou o padrão (escuro) se não houver ou não for reconhecido. */
export function lerPreferencia(valor: string | null): PreferenciaDeTema {
  return PREFERENCIAS_DE_TEMA.find((preferencia) => preferencia === valor) ?? 'escuro';
}

/** O atalho do topo da tela inicial alterna escuro → claro → sistema → escuro. */
export function proximaPreferencia(atual: PreferenciaDeTema): PreferenciaDeTema {
  const indice = PREFERENCIAS_DE_TEMA.indexOf(atual);
  return PREFERENCIAS_DE_TEMA[(indice + 1) % PREFERENCIAS_DE_TEMA.length] ?? 'escuro';
}

export const PARA_O_NATIVEWIND = { escuro: 'dark', claro: 'light', sistema: 'system' } as const;
