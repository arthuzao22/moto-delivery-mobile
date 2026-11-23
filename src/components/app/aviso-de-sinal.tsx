import { CloudOff } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useEstadoDaFila, useSemSinal } from '@/fila/conexao';
import { dispensarConflito } from '@/fila/envio-da-fila';
import { COR_DO_CHROME } from '@/lib/tema';

/**
 * Faixa discreta sob o topo (documento 02 §5): sem sinal, nada bloqueia; as ações esperam na fila.
 * Com ações pendentes, o selo conta quantas ("Aguardando sinal (2)").
 */
export function AvisoDeSinal(): ReactNode {
  const semSinal = useSemSinal();
  const { pendentes } = useEstadoDaFila();
  if (!semSinal && pendentes === 0) return null;
  const texto = semSinal
    ? 'Sem sinal: suas ações serão enviadas quando voltar.'
    : 'Enviando as ações que esperavam o sinal…';
  return (
    <View
      accessibilityLiveRegion="polite"
      className="flex-row items-center gap-2 border-b border-chrome-border bg-chrome px-4 py-2"
    >
      <CloudOff color={COR_DO_CHROME.texto} size={18} strokeWidth={2} />
      <Text className="flex-1 text-sm text-chrome-foreground">{texto}</Text>
      {pendentes > 0 ? (
        <Text variante="mono" className="text-chrome-foreground">{`${pendentes} na fila`}</Text>
      ) : null}
    </View>
  );
}

/**
 * Quando uma ação enviada depois foi recusada (ex.: a central cancelou a entrega enquanto o
 * motoboy estava sem sinal): a tela já foi lida de novo; aqui ele fica sabendo o que aconteceu.
 */
export function AvisoDeConflito(): ReactNode {
  const { conflito } = useEstadoDaFila();
  if (conflito === null) return null;
  return (
    <View
      accessibilityLiveRegion="assertive"
      className="gap-3 rounded-2xl border border-destructive bg-card p-4"
    >
      <Text variante="tituloDeCard">{`${conflito.descricao} não foi aceito`}</Text>
      <Text variante="secundario">{`${conflito.mensagem} A situação foi mudada enquanto você estava sem sinal; a tela já mostra o que vale agora.`}</Text>
      <Button variante="secundario" onPress={dispensarConflito}>
        <Text>Entendi</Text>
      </Button>
    </View>
  );
}
