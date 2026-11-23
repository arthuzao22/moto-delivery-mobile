import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAcoesDaRota } from '@/api/rota';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { ErroDaAcao } from '@/components/app/rota/acoes-comuns';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { codigoDigitado } from '@/lib/cronometro';
import { cn } from '@/lib/utils';

const TAMANHO_DO_CODIGO = 6;
const CASAS = Array.from({ length: TAMANHO_DO_CODIGO }, (_, indice) => indice);
const AMPLIACAO_MAXIMA = 1.3;

/**
 * Devolução no restaurante (documento 04 M5): o restaurante dita o código de 6 dígitos. O código
 * errado avisa sem apagar o que foi digitado.
 */
export default function Devolucao(): ReactNode {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { devolver } = useAcoesDaRota();
  const [codigo, setCodigo] = useState('');
  const completo = codigo.length === TAMANHO_DO_CODIGO;

  const enviar = (): void => {
    devolver.mutate(
      { entregaId: id, codigoDevolucao: codigo },
      {
        onSuccess: () => {
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          router.back();
        },
        onError: () => void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
      },
    );
  };

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: top }}>
      <ScrollView contentContainerClassName="gap-6 px-4 py-6" keyboardShouldPersistTaps="handled">
        <View className="gap-1">
          <Text variante="titulo">Código de devolução</Text>
          <Text variante="secundario">Peça ao restaurante o código de 6 dígitos e digite aqui.</Text>
        </View>
        <View>
          <TextInput
            accessibilityLabel="Código de devolução"
            value={codigo}
            onChangeText={(texto) => setCodigo(codigoDigitado(texto))}
            keyboardType="number-pad"
            autoFocus
            maxLength={TAMANHO_DO_CODIGO}
            maxFontSizeMultiplier={AMPLIACAO_MAXIMA}
            className="absolute h-16 w-full opacity-0"
          />
          <View className="flex-row justify-between gap-2" pointerEvents="none">
            {CASAS.map((casa) => (
              <View
                key={casa}
                className={cn(
                  'h-16 flex-1 items-center justify-center rounded-xl border-2 bg-card',
                  casa === codigo.length ? 'border-primary' : 'border-input',
                )}
              >
                <Text variante="valor">{codigo[casa] ?? ''}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <BarraDeAcao>
        <ErroDaAcao erro={devolver.error} />
        <Button disabled={!completo || devolver.isPending} onPress={enviar}>
          <Text>{devolver.isPending ? 'Conferindo…' : 'Confirmar devolução'}</Text>
        </Button>
        <Button variante="fantasma" disabled={devolver.isPending} onPress={() => router.back()}>
          <Text>Voltar</Text>
        </Button>
      </BarraDeAcao>
    </View>
  );
}
