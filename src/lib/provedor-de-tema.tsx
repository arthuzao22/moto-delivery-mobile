import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  CHAVE_DA_PREFERENCIA,
  lerPreferencia,
  PARA_O_NATIVEWIND,
  type PreferenciaDeTema,
} from './preferencia-de-tema';
import { CORES_DO_TEMA, type CoresDoTema } from './tema';

interface Tema {
  readonly preferencia: PreferenciaDeTema;
  /** O que está na tela agora (com "sistema", depende do aparelho). */
  readonly esquema: 'dark' | 'light';
  /** Falso até ler a preferência guardada: a splash espera, para a tela não piscar no tema errado. */
  readonly carregado: boolean;
  escolher(preferencia: PreferenciaDeTema): void;
}

const ContextoDoTema = createContext<Tema | null>(null);

/** Preferência de tema guardada no aparelho e aplicada pelo NativeWind (classe `dark`). */
export function ProvedorDeTema({ children }: { readonly children: ReactNode }): ReactNode {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [preferencia, setPreferencia] = useState<PreferenciaDeTema>('escuro');
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    /** Falhou ao ler ou aplicar? Segue no escuro: a splash nunca pode ficar presa esperando o tema. */
    const ler = async (): Promise<void> => {
      try {
        const guardada = lerPreferencia(await AsyncStorage.getItem(CHAVE_DA_PREFERENCIA).catch(() => null));
        setPreferencia(guardada);
        setColorScheme(PARA_O_NATIVEWIND[guardada]);
      } finally {
        setCarregado(true);
      }
    };
    void ler();
  }, [setColorScheme]);

  const escolher = useCallback(
    (nova: PreferenciaDeTema) => {
      setPreferencia(nova);
      setColorScheme(PARA_O_NATIVEWIND[nova]);
      void AsyncStorage.setItem(CHAVE_DA_PREFERENCIA, nova).catch(() => undefined);
    },
    [setColorScheme],
  );

  const valor = useMemo<Tema>(
    () => ({ preferencia, esquema: colorScheme === 'light' ? 'light' : 'dark', carregado, escolher }),
    [preferencia, colorScheme, carregado, escolher],
  );
  return <ContextoDoTema.Provider value={valor}>{children}</ContextoDoTema.Provider>;
}

/** As cores de ícone do tema na tela agora (ícone não lê classe do Tailwind). */
export function useCores(): CoresDoTema {
  return CORES_DO_TEMA[useTema().esquema];
}

export function useTema(): Tema {
  const tema = useContext(ContextoDoTema);
  if (tema === null) throw new Error('useTema fora do ProvedorDeTema');
  return tema;
}
