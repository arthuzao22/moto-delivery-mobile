import { useEffect, useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Parada } from '@/api/rota';
import { Text } from '@/components/ui/text';
import { mmss, segundosDaEspera } from '@/lib/cronometro';
import { BotoesDeNavegacao } from './botoes-de-navegacao';

const TIQUE_MS = 1000;

/**
 * O que a porta pede depois do "cheguei" (documento 04 M5): o cronômetro do cliente ausente, a
 * espera pela decisão e a volta ao restaurante. A decisão chega pelo socket (ou pelo push) e a
 * tela muda sozinha: aguardar mais estende o prazo; novo destino volta a parada para "a caminho".
 */
export function SituacaoDaPorta({ parada }: { readonly parada: Parada }): ReactNode {
  if (parada.status === 'cliente_ausente' && parada.ausencia !== null) {
    return <EsperaDoAusente expiraEm={parada.ausencia.expiraEm} />;
  }
  if (parada.status === 'aguardando_decisao') {
    return (
      <Cartao titulo="Tempo de espera esgotado">
        Aguarde a decisão da central ou do restaurante: aguardar mais, novo endereço ou voltar com o pedido.
      </Cartao>
    );
  }
  if (parada.status === 'retornando') {
    return (
      <>
        <Cartao titulo="Volte ao restaurante">
          {`Devolva o pedido em ${parada.coleta.endereco}. O restaurante vai te passar um código de 6 dígitos.`}
        </Cartao>
        <BotoesDeNavegacao
          destino={{ endereco: parada.coleta.endereco, coordenada: parada.coordenadaColeta }}
        />
      </>
    );
  }
  return null;
}

function EsperaDoAusente({ expiraEm }: { readonly expiraEm: string }): ReactNode {
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => {
    const intervalo = setInterval(() => setAgora(Date.now()), TIQUE_MS);
    return () => clearInterval(intervalo);
  }, []);
  const restante = segundosDaEspera(expiraEm, agora);
  return (
    <View className="gap-1 rounded-2xl border border-attention bg-card p-4" accessibilityLiveRegion="polite">
      <Text variante="eyebrow" className="text-brand-text">
        Cliente ausente
      </Text>
      <Text variante="valor">{mmss(restante)}</Text>
      <Text variante="secundario">
        {restante > 0
          ? 'O restaurante já foi avisado. Continue tentando contato; se o cliente aparecer, entregue normalmente.'
          : 'A espera terminou. Aguarde a decisão da central ou do restaurante.'}
      </Text>
    </View>
  );
}

function Cartao({ titulo, children }: { readonly titulo: string; readonly children: string }): ReactNode {
  return (
    <View className="gap-1 rounded-2xl border border-attention bg-card p-4">
      <Text variante="tituloDeCard">{titulo}</Text>
      <Text variante="secundario">{children}</Text>
    </View>
  );
}
