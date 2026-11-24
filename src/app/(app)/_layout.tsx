import { Stack } from 'expo-router';
import type { ReactNode } from 'react';
import { useInicio } from '@/api/turno';
import { useFilaEmSegundoPlano } from '@/fila/use-fila-em-segundo-plano';
import { useAberturaPeloPush } from '@/notificacoes/use-abertura-pelo-push';
import { useTempoReal } from '@/tempo-real/use-tempo-real';

/**
 * Telas de quem está logado. O socket fica ligado enquanto o turno estiver aberto; a oferta abre em
 * tela cheia, sem o gesto de voltar do iOS (documento 05 §4.6), para não ser descartada sem querer.
 */
export default function LayoutDoApp(): ReactNode {
  const inicio = useInicio();
  useTempoReal(inicio.data?.turno?.status === 'aberto');
  useAberturaPeloPush();
  useFilaEmSegundoPlano();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* As abas trocam sem animação, como numa barra de abas (documento 02 §1). */}
      <Stack.Screen name="index" options={{ animation: 'none' }} />
      <Stack.Screen name="entregas" options={{ animation: 'none' }} />
      <Stack.Screen name="caixa" options={{ animation: 'none' }} />
      <Stack.Screen name="extrato" options={{ animation: 'none' }} />
      <Stack.Screen name="perfil" options={{ animation: 'none' }} />
      <Stack.Screen name="entrega/[id]/pagamento" options={{ presentation: 'modal' }} />
      <Stack.Screen name="ocorrencia" options={{ presentation: 'modal' }} />
      <Stack.Screen name="entrega/[id]/recusa" options={{ presentation: 'modal' }} />
      <Stack.Screen name="entrega/[id]/devolucao" options={{ presentation: 'modal' }} />
      <Stack.Screen
        name="oferta/[id]"
        options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom', gestureEnabled: false }}
      />
    </Stack>
  );
}
