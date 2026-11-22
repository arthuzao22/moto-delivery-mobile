import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAcoesDaRota, type TipoDeOcorrencia } from '@/api/rota';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { ErroDaAcao } from '@/components/app/rota/acoes-comuns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

const TIPOS: readonly { valor: TipoDeOcorrencia; rotulo: string }[] = [
  { valor: 'atraso_restaurante', rotulo: 'Atraso no restaurante' },
  { valor: 'transito', rotulo: 'Trânsito parado' },
  { valor: 'endereco_incorreto', rotulo: 'Endereço errado' },
  { valor: 'pane_veiculo', rotulo: 'Problema na moto' },
  { valor: 'avaria', rotulo: 'Pedido danificado' },
  { valor: 'acidente', rotulo: 'Acidente' },
  { valor: 'outro', rotulo: 'Outro motivo' },
];

/** Avisar a central (POST /app/ocorrencias): o motivo e, se quiser, uma frase. */
export default function Ocorrencia(): ReactNode {
  const { entregaId } = useLocalSearchParams<{ entregaId?: string }>();
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { ocorrencia } = useAcoesDaRota();
  const [tipo, setTipo] = useState<TipoDeOcorrencia | null>(null);
  const [descricao, setDescricao] = useState('');

  const enviar = (): void => {
    if (tipo === null) return;
    const texto = descricao.trim();
    ocorrencia.mutate(
      { tipo, ...(texto === '' ? {} : { descricao: texto }), ...(entregaId ? { entregaId } : {}) },
      { onSuccess: () => router.back() },
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      style={{ paddingTop: top }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerClassName="gap-4 px-4 py-6" keyboardShouldPersistTaps="handled">
        <Text variante="titulo">Avisar a central</Text>
        <Text variante="secundario">A central recebe na hora, com a sua posição.</Text>
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
          rotulo="Detalhes (opcional)"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          maxLength={500}
          className="h-28 py-3"
          textAlignVertical="top"
        />
      </ScrollView>
      <BarraDeAcao>
        <ErroDaAcao erro={ocorrencia.error} />
        <Button disabled={tipo === null || ocorrencia.isPending} onPress={enviar}>
          <Text>{ocorrencia.isPending ? 'Enviando…' : 'Enviar aviso'}</Text>
        </Button>
        <Button variante="fantasma" disabled={ocorrencia.isPending} onPress={() => router.back()}>
          <Text>Voltar</Text>
        </Button>
      </BarraDeAcao>
    </KeyboardAvoidingView>
  );
}
