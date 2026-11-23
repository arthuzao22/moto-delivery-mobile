import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAcoesDaRota } from '@/api/rota';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { ErroDaAcao } from '@/components/app/rota/acoes-comuns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

const TAMANHO_MINIMO_DO_MOTIVO = 3;
type Tipo = 'cliente_recusou' | 'pagamento_recusado';

const TIPOS: readonly { valor: Tipo; rotulo: string }[] = [
  { valor: 'cliente_recusou', rotulo: 'O cliente recusou o pedido' },
  { valor: 'pagamento_recusado', rotulo: 'O pagamento não foi aceito' },
];

/**
 * Recusa pelo cliente (documento 04 M5): a entrega volta ao restaurante e a central recebe uma
 * ocorrência com o motivo.
 */
export default function Recusa(): ReactNode {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { recusada } = useAcoesDaRota();
  const [tipo, setTipo] = useState<Tipo>('cliente_recusou');
  const [motivo, setMotivo] = useState('');
  const pronto = motivo.trim().length >= TAMANHO_MINIMO_DO_MOTIVO;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      style={{ paddingTop: top }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerClassName="gap-4 px-4 py-6" keyboardShouldPersistTaps="handled">
        <Text variante="titulo">Cliente recusou</Text>
        <Text variante="secundario">O pedido volta para o restaurante e a central é avisada.</Text>
        <View className="rounded-2xl border border-border bg-card px-4 py-2">
          {TIPOS.map((opcao) => (
            <Checkbox
              key={opcao.valor}
              marcado={tipo === opcao.valor}
              rotulo={opcao.rotulo}
              aoTrocar={() => setTipo(opcao.valor)}
            />
          ))}
        </View>
        <Input
          rotulo="O que aconteceu"
          value={motivo}
          onChangeText={setMotivo}
          multiline
          maxLength={500}
          className="h-28 py-3"
          textAlignVertical="top"
        />
      </ScrollView>
      <BarraDeAcao>
        <ErroDaAcao erro={recusada.error} />
        <Button
          disabled={!pronto || recusada.isPending}
          onPress={() =>
            recusada.mutate(
              { entregaId: id, tipo, motivo: motivo.trim() },
              { onSuccess: () => router.back() },
            )
          }
        >
          <Text>{recusada.isPending ? 'Enviando…' : 'Confirmar recusa'}</Text>
        </Button>
        <Button variante="fantasma" disabled={recusada.isPending} onPress={() => router.back()}>
          <Text>Voltar</Text>
        </Button>
      </BarraDeAcao>
    </KeyboardAvoidingView>
  );
}
