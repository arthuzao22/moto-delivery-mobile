import type { ReactNode } from 'react';
import { Linking, Platform, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { linksDeNavegacao, type Destino } from '@/lib/navegacao';

/** Abre o Waze ou o Google Maps (e o Apple Maps no iPhone): o app não tem mapa próprio. */
export function BotoesDeNavegacao({ destino }: { readonly destino: Destino }): ReactNode {
  const links = linksDeNavegacao(destino, Platform.OS === 'ios' ? 'ios' : 'android');
  return (
    <View className="flex-row gap-3">
      {links.map((link) => (
        <View key={link.app} className="flex-1">
          <Button variante="contorno" onPress={() => void Linking.openURL(link.url)}>
            <Text>{link.app}</Text>
          </Button>
        </View>
      ))}
    </View>
  );
}
