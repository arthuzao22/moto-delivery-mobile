import { cva, type VariantProps } from 'class-variance-authority';
import { createContext, useContext, type ReactNode } from 'react';
import { Text as TextoNativo, type TextProps } from 'react-native';
import { cn } from '@/lib/utils';

/** Fonte do sistema ampliada até 130% sem quebrar o layout (documento 01 §3). */
const AMPLIACAO_MAXIMA = 1.3;

/** Classes que um componente pai (ex.: Button) passa para o texto de dentro, como no RN Reusables. */
export const ClassesDoTexto = createContext<string | undefined>(undefined);

/** Escala do documento 01 §3: peso é família de fonte no React Native, não `fontWeight`. */
export const variantesDoTexto = cva('font-sans text-foreground', {
  variants: {
    variante: {
      valor: 'font-bold text-[32px] leading-[38px] text-heading tabular-nums',
      titulo: 'font-bold text-[22px] leading-7 text-heading',
      tituloDeCard: 'font-semibold text-[17px] leading-6 text-heading',
      corpo: 'text-base leading-6',
      secundario: 'text-sm leading-5 text-muted-foreground',
      eyebrow: 'font-semibold text-xs uppercase leading-4 tracking-[1.8px] text-muted-foreground',
      mono: 'font-mono text-[13px] leading-[18px]',
    },
  },
  defaultVariants: { variante: 'corpo' },
});

export type PropsDoTexto = TextProps &
  VariantProps<typeof variantesDoTexto> & { readonly className?: string };

export function Text({ className, variante, ...props }: PropsDoTexto): ReactNode {
  const doPai = useContext(ClassesDoTexto);
  return (
    <TextoNativo
      maxFontSizeMultiplier={AMPLIACAO_MAXIMA}
      className={cn(variantesDoTexto({ variante }), doPai, className)}
      {...props}
    />
  );
}
