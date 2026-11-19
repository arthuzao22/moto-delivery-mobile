import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { cn } from '@/lib/utils';
import { ClassesDoTexto } from './text';

/**
 * Primário 56 px, demais 48 px, largura total, `rounded-xl` (documento 01 §4). Pressionado:
 * escala 0,98 e opacidade 0,9, para responder na hora mesmo sem rede (documento 01 §6).
 */
const variantesDoBotao = cva(
  'w-full flex-row items-center justify-center gap-2 rounded-xl px-4 active:scale-[0.98] active:opacity-90',
  {
    variants: {
      variante: {
        primario: 'h-14 bg-primary',
        secundario: 'h-12 bg-secondary',
        contorno: 'h-12 border border-border bg-transparent',
        fantasma: 'h-12 bg-transparent',
        destrutivo: 'h-12 bg-destructive',
      },
      desabilitado: { true: 'opacity-50', false: '' },
    },
    defaultVariants: { variante: 'primario', desabilitado: false },
  },
);

const textoDoBotao = cva('font-semibold text-[17px] leading-[22px]', {
  variants: {
    variante: {
      primario: 'text-primary-foreground',
      secundario: 'text-secondary-foreground',
      contorno: 'text-foreground',
      fantasma: 'text-foreground',
      destrutivo: 'text-heading',
    },
  },
  defaultVariants: { variante: 'primario' },
});

export type PropsDoBotao = PressableProps &
  Omit<VariantProps<typeof variantesDoBotao>, 'desabilitado'> & { readonly className?: string };

export function Button({ className, variante, disabled, ...props }: PropsDoBotao): ReactNode {
  return (
    <ClassesDoTexto.Provider value={textoDoBotao({ variante })}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        className={cn(variantesDoBotao({ variante, desabilitado: disabled === true }), className)}
        {...props}
      />
    </ClassesDoTexto.Provider>
  );
}
