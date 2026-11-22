import type { ReactNode, Ref } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { COR_DO_PLACEHOLDER } from '@/lib/tema';
import { cn } from '@/lib/utils';
import { Text } from './text';

const AMPLIACAO_MAXIMA = 1.3;

export interface PropsDoInput extends TextInputProps {
  readonly rotulo: string;
  readonly erro?: string | null;
  readonly className?: string;
  readonly ref?: Ref<TextInput>;
}

/** Campo de 56 px com rótulo sempre visível (luva e sol: nada de placeholder como rótulo). */
export function Input({ rotulo, erro, className, ...props }: PropsDoInput): ReactNode {
  return (
    <View className="gap-2">
      <Text variante="secundario">{rotulo}</Text>
      <TextInput
        accessibilityLabel={rotulo}
        maxFontSizeMultiplier={AMPLIACAO_MAXIMA}
        placeholderTextColor={COR_DO_PLACEHOLDER}
        className={cn(
          'h-14 rounded-xl border border-input bg-card px-4 font-sans text-base text-foreground',
          erro ? 'border-destructive' : '',
          className,
        )}
        {...props}
      />
      {erro ? <Text className="text-sm text-destructive">{erro}</Text> : null}
    </View>
  );
}
