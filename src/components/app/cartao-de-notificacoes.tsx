import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { usePush } from '@/notificacoes/use-push';

const TEXTOS = {
  indisponivel: 'O push só funciona no app instalado pelo build de desenvolvimento, não no Expo Go.',
  registrado: 'Este celular vai receber os avisos de oferta e de entrega.',
  sem_permissao: 'Para receber as ofertas mesmo com o app fechado, permita as notificações.',
} as const;

/** Situação do push no Início. A permissão é pedida aqui, depois de explicar o motivo (documento 02 §6). */
export function CartaoDeNotificacoes(): ReactNode {
  const { situacao, falhou, ativar } = usePush();
  if (situacao === null && !falhou) return null;
  return (
    <View className="gap-3 rounded-2xl border border-border bg-card p-4">
      <Text variante="tituloDeCard">Notificações</Text>
      <Text variante="secundario">
        {falhou
          ? 'Não deu para registrar este celular. Abra o app de novo para tentar.'
          : TEXTOS[situacao ?? 'indisponivel']}
      </Text>
      {situacao === 'sem_permissao' ? (
        <Button variante="secundario" onPress={() => void ativar()}>
          <Text>Permitir notificações</Text>
        </Button>
      ) : null}
    </View>
  );
}
