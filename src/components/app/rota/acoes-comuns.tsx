import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { ehErroDaApi } from '@/api/erro-da-api';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

/** O que der errado numa ação aparece em linguagem simples, acima dos botões. */
export function ErroDaAcao({ erro }: { readonly erro: unknown }): ReactNode {
  if (erro === null || erro === undefined) return null;
  const texto = ehErroDaApi(erro) ? erro.message : 'Não deu certo. Tente de novo.';
  return (
    <View accessibilityLiveRegion="polite" className="rounded-2xl border border-destructive p-4">
      <Text className="text-destructive">{texto}</Text>
    </View>
  );
}

export function AvisarACentral({ entregaId }: { readonly entregaId?: string }): ReactNode {
  const router = useRouter();
  return (
    <Button
      variante="fantasma"
      onPress={() =>
        router.push({ pathname: '/ocorrencia', params: entregaId === undefined ? {} : { entregaId } })
      }
    >
      <Text>Avisar a central</Text>
    </Button>
  );
}
