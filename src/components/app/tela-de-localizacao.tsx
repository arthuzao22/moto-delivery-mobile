import { MapPinOff } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import { FaixaDoTopo } from '@/components/app/faixa-do-topo';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import type { Bloqueio } from '@/gps/localizacao-obrigatoria';
import { NOME_DO_PRODUTO } from '@/lib/marca';
import { useSessao } from '@/sessao/provedor-de-sessao';

/** Tela que cobre o app inteiro enquanto a localização estiver desligada ou sem permissão. */
export function TelaDeLocalizacao({
  bloqueio,
  liberar,
}: {
  readonly bloqueio: Bloqueio;
  readonly liberar: () => Promise<void>;
}): ReactNode {
  const { sair } = useSessao();
  const [ocupado, setOcupado] = useState(false);

  const tentar = async (): Promise<void> => {
    setOcupado(true);
    await liberar();
    setOcupado(false);
  };

  return (
    <View className="flex-1 bg-background">
      <FaixaDoTopo titulo={NOME_DO_PRODUTO} />
      <View accessibilityLiveRegion="polite" className="flex-1 justify-center gap-6 px-6">
        <MapPinOff size={48} className="text-destructive" />
        <View className="gap-2">
          <Text variante="titulo">{bloqueio.titulo}</Text>
          <Text variante="secundario">{bloqueio.texto}</Text>
        </View>
        <Button disabled={ocupado} onPress={() => void tentar()}>
          <Text>{bloqueio.botao}</Text>
        </Button>
        <Button variante="contorno" onPress={() => void sair()}>
          <Text>Sair da conta</Text>
        </Button>
      </View>
    </View>
  );
}
