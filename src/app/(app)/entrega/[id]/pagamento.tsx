import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAcoesDaRota, type FormaRecebida, type Parada, type ParteDoRecebimento } from '@/api/rota';
import { useInicio } from '@/api/turno';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { ErroDaAcao } from '@/components/app/rota/acoes-comuns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { decimalDigitado, formatarReais, paraDigitar } from '@/lib/dinheiro';
import { cn } from '@/lib/utils';

const MAXIMO_DE_PARTES = 4;

const FORMAS: readonly { valor: FormaRecebida; rotulo: string }[] = [
  { valor: 'dinheiro', rotulo: 'Dinheiro' },
  { valor: 'pix', rotulo: 'Pix' },
  { valor: 'cartao_credito', rotulo: 'Crédito' },
  { valor: 'cartao_debito', rotulo: 'Débito' },
  { valor: 'outro', rotulo: 'Outro' },
];

/** A forma prevista pelo restaurante vira a primeira escolha da tela. */
const PREVISTA_PARA_RECEBIDA: Readonly<Record<string, FormaRecebida>> = {
  dinheiro: 'dinheiro',
  pix_na_entrega: 'pix',
  cartao_maquininha: 'cartao_credito',
};

interface ParteDigitada {
  readonly forma: FormaRecebida;
  readonly valor: string;
  readonly troco: string;
}

function partesIniciais(parada: Parada): ParteDigitada[] {
  const { forma, valorACobrar, trocoNecessario } = parada.pagamento;
  const recebida = PREVISTA_PARA_RECEBIDA[forma] ?? 'dinheiro';
  const troco = recebida === 'dinheiro' && trocoNecessario !== null ? paraDigitar(trocoNecessario) : '';
  return [{ forma: recebida, valor: forma === 'misto' ? '' : paraDigitar(valorACobrar), troco }];
}

/** Do que foi digitado para o corpo da API; null enquanto algum valor não for válido. */
function paraEnviar(partes: readonly ParteDigitada[]): ParteDoRecebimento[] | null {
  const itens: ParteDoRecebimento[] = [];
  for (const parte of partes) {
    const valor = decimalDigitado(parte.valor);
    const troco = parte.troco.trim() === '' ? null : decimalDigitado(parte.troco);
    if (valor === null || (parte.troco.trim() !== '' && troco === null)) return null;
    itens.push({
      forma: parte.forma,
      valor,
      ...(parte.forma === 'dinheiro' && troco !== null ? { trocoDado: troco } : {}),
    });
  }
  return itens;
}

/**
 * Registrar o pagamento na porta (documento 04 M4): até 4 partes. O app não soma: a API confere
 * com o previsto e, se for diferente, avisa a central como divergência.
 */
export default function TelaDePagamento(): ReactNode {
  const { id } = useLocalSearchParams<{ id: string }>();
  const parada = useInicio().data?.rotaAtiva?.paradas.find((item) => item.entregaId === id) ?? null;
  if (parada === null) return <Fundo />;
  return <Formulario parada={parada} />;
}

function Formulario({ parada }: { readonly parada: Parada }): ReactNode {
  const router = useRouter();
  const { receber } = useAcoesDaRota();
  const [partes, setPartes] = useState(() => partesIniciais(parada));
  const itens = paraEnviar(partes);
  const mudar = (indice: number, mudanca: Partial<ParteDigitada>): void =>
    setPartes((atuais) => atuais.map((parte, i) => (i === indice ? { ...parte, ...mudanca } : parte)));
  const enviar = (): void => {
    if (itens === null) return;
    receber.mutate({ entregaId: parada.entregaId, itens }, { onSuccess: () => router.back() });
  };
  return (
    <Fundo>
      <ScrollView contentContainerClassName="gap-4 px-4 py-6" keyboardShouldPersistTaps="handled">
        <Text variante="eyebrow">{`Pagamento · ${parada.codigo}`}</Text>
        <Text variante="titulo">{`A receber: ${formatarReais(parada.pagamento.valorACobrar)}`}</Text>
        {partes.map((parte, indice) => (
          <Parte
            key={indice}
            parte={parte}
            numero={partes.length > 1 ? indice + 1 : null}
            aoMudar={(m) => mudar(indice, m)}
          />
        ))}
        {partes.length < MAXIMO_DE_PARTES ? (
          <Button
            variante="contorno"
            onPress={() => setPartes((atuais) => [...atuais, { forma: 'pix', valor: '', troco: '' }])}
          >
            <Text>Dividir em outra forma</Text>
          </Button>
        ) : null}
      </ScrollView>
      <BarraDeAcao>
        <ErroDaAcao erro={receber.error} />
        <Button disabled={itens === null || receber.isPending} onPress={enviar}>
          <Text>{receber.isPending ? 'Registrando…' : 'Registrar pagamento'}</Text>
        </Button>
        <Button variante="fantasma" disabled={receber.isPending} onPress={() => router.back()}>
          <Text>Voltar</Text>
        </Button>
      </BarraDeAcao>
    </Fundo>
  );
}

function Parte({
  parte,
  numero,
  aoMudar,
}: {
  readonly parte: ParteDigitada;
  readonly numero: number | null;
  aoMudar(mudanca: Partial<ParteDigitada>): void;
}): ReactNode {
  return (
    <View className="gap-3 rounded-2xl border border-border bg-card p-4">
      {numero === null ? null : <Text variante="eyebrow">{`Parte ${numero}`}</Text>}
      <View className="flex-row flex-wrap gap-2">
        {FORMAS.map((forma) => (
          <Pressable
            key={forma.valor}
            accessibilityRole="radio"
            accessibilityState={{ selected: parte.forma === forma.valor }}
            onPress={() => aoMudar({ forma: forma.valor })}
            className={cn(
              'h-12 justify-center rounded-full border px-4',
              parte.forma === forma.valor ? 'border-primary bg-primary' : 'border-input',
            )}
          >
            <Text className={parte.forma === forma.valor ? 'font-semibold text-primary-foreground' : ''}>
              {forma.rotulo}
            </Text>
          </Pressable>
        ))}
      </View>
      <Input
        rotulo="Valor pago (sem o troco)"
        value={parte.valor}
        onChangeText={(valor) => aoMudar({ valor })}
        keyboardType="decimal-pad"
        placeholder="0,00"
        erro={parte.valor !== '' && decimalDigitado(parte.valor) === null ? 'Use o formato 25,90' : null}
      />
      {parte.forma === 'dinheiro' ? (
        <Input
          rotulo="Troco dado (R$)"
          value={parte.troco}
          onChangeText={(troco) => aoMudar({ troco })}
          keyboardType="decimal-pad"
          placeholder="0,00"
        />
      ) : null}
    </View>
  );
}

function Fundo({ children }: { readonly children?: ReactNode }): ReactNode {
  const { top } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      style={{ paddingTop: top }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
