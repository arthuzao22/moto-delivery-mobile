import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useCores } from '@/lib/provedor-de-tema';

const TAMANHO_DO_ICONE = 22;

/** Vazio e erro com ícone, título e uma frase (documento 02 §5): nunca uma tela em branco. */
export function EstadoVazio(props: {
  readonly icone: LucideIcon;
  readonly titulo: string;
  readonly texto?: string;
  readonly children?: ReactNode;
}): ReactNode {
  const { icone: Icone, titulo, texto, children } = props;
  const cores = useCores();
  return (
    <Card className="items-center gap-2 px-6 py-8">
      <View className="h-11 w-11 items-center justify-center rounded-full bg-secondary">
        <Icone color={cores.muted} size={TAMANHO_DO_ICONE} strokeWidth={2} />
      </View>
      <Text variante="tituloDeCard" className="text-center">
        {titulo}
      </Text>
      {texto === undefined ? null : (
        <Text variante="secundario" className="text-center">
          {texto}
        </Text>
      )}
      {children}
    </Card>
  );
}
