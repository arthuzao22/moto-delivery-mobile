import * as Haptics from 'expo-haptics';
import { useKeepAwake } from 'expo-keep-awake';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ehErroDaApi } from '@/api/erro-da-api';
import { useAcoesDaOferta, useOferta, type Oferta } from '@/api/ofertas';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { useSemSinal } from '@/fila/conexao';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { fracaoRestante, formatarKm, segundosRestantes } from '@/lib/oferta';
import { useAlertaDeOferta } from '@/notificacoes/use-alerta-de-oferta';

const TIQUE_MS = 250;
const MOTIVOS = ['Longe demais', 'Valor baixo', 'Vou fazer uma pausa'] as const;

/**
 * A tela mais importante do app (documento 02 §3): aceitar é um toque; recusar pede motivo
 * opcional depois. A tela fica acesa, e o voltar do Android não descarta a oferta.
 */
export default function TelaDaOferta(): ReactNode {
  useKeepAwake();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { oferta, carregando } = useOferta(id);
  const { visualizar, aceitar, recusar } = useAcoesDaOferta(id);
  const [escolhendoMotivo, setEscolhendoMotivo] = useState(false);
  const agora = useRelogio();
  const semSinal = useSemSinal();
  // Toca enquanto a oferta está aberta e ninguém decidiu: o toque em aceitar ou recusar já silencia.
  const decidindo = aceitar.isPending || recusar.isPending || aceitar.isSuccess || recusar.isSuccess;
  const valendo = oferta !== null && segundosRestantes(oferta.expiraEm, agora) > 0;
  useAlertaDeOferta(valendo && !decidindo && aceitar.error === null && recusar.error === null);

  useFocusEffect(
    useCallback(() => {
      const assinatura = BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => assinatura.remove();
    }, []),
  );

  // O mutate do TanStack Query tem identidade estável: visualiza uma vez ao abrir a oferta.
  const { mutate: marcarComoVista } = visualizar;
  useEffect(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    marcarComoVista();
  }, [id, marcarComoVista]);

  const fechar = useCallback(() => (router.canGoBack() ? router.back() : router.replace('/')), [router]);
  const decidida = aceitar.isSuccess || recusar.isSuccess;
  useEffect(() => {
    if (decidida) fechar();
  }, [decidida, fechar]);

  if (carregando) return <Fundo />;
  const erro = aceitar.error ?? recusar.error;
  if (oferta === null || erro !== null || segundosRestantes(oferta.expiraEm, agora) === 0) {
    return <Indisponivel motivo={motivoDoFim(oferta, erro, agora)} aoVoltar={fechar} />;
  }

  const ocupado = aceitar.isPending || recusar.isPending;
  return (
    <Fundo>
      <ScrollView contentContainerClassName="gap-6 px-4 py-6">
        <Cabecalho oferta={oferta} agora={agora} />
        <Paradas oferta={oferta} />
      </ScrollView>
      <BarraDeAcao>
        {escolhendoMotivo ? (
          <>
            {MOTIVOS.map((motivo) => (
              <Button
                key={motivo}
                variante="secundario"
                disabled={ocupado}
                onPress={() => recusar.mutate(motivo)}
              >
                <Text>{motivo}</Text>
              </Button>
            ))}
            <Button variante="contorno" disabled={ocupado} onPress={() => recusar.mutate(null)}>
              <Text>Recusar sem motivo</Text>
            </Button>
          </>
        ) : (
          <>
            {/* A disputa é decidida na hora: aceitar não entra na fila offline (documento 04 M6). */}
            {semSinal ? <Text variante="secundario">Sem sinal: aceitar precisa de internet.</Text> : null}
            <Button
              disabled={ocupado || semSinal}
              onPress={() => {
                void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                aceitar.mutate();
              }}
            >
              <Text>{aceitar.isPending ? 'Aceitando…' : 'Aceitar rota'}</Text>
            </Button>
            <Button variante="contorno" disabled={ocupado} onPress={() => setEscolhendoMotivo(true)}>
              <Text>Recusar</Text>
            </Button>
          </>
        )}
      </BarraDeAcao>
    </Fundo>
  );
}

/** Relógio da contagem regressiva: só esta tela tem animação, e só enquanto a oferta está aberta. */
function useRelogio(): number {
  const [agora, setAgora] = useState(() => Date.now());
  useEffect(() => {
    const intervalo = setInterval(() => setAgora(Date.now()), TIQUE_MS);
    return () => clearInterval(intervalo);
  }, []);
  return agora;
}

function motivoDoFim(oferta: Oferta | null, erro: unknown, agora: number): string {
  if (ehErroDaApi(erro))
    return erro.codigo === 'oferta_indisponivel' ? 'Outro motoboy aceitou antes.' : erro.message;
  if (oferta !== null && segundosRestantes(oferta.expiraEm, agora) === 0)
    return 'O tempo para aceitar acabou.';
  return 'Esta oferta não está mais disponível.';
}

function Fundo({ children }: { readonly children?: ReactNode }): ReactNode {
  const { top } = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: top }}>
      {children}
    </View>
  );
}

function Cabecalho({ oferta, agora }: { readonly oferta: Oferta; readonly agora: number }): ReactNode {
  const quantas = oferta.paradas.length;
  const km = oferta.kmEstimado === null ? null : formatarKm(oferta.kmEstimado);
  const restante = fracaoRestante(oferta.enviadaEm, oferta.expiraEm, agora);
  return (
    <View className="gap-3">
      <Text variante="eyebrow" className="text-brand-text">
        Nova rota
      </Text>
      <Text variante="valor">{`${quantas} ${quantas === 1 ? 'parada' : 'paradas'}`}</Text>
      <Text variante="secundario">{km === null ? 'Distância ainda não calculada' : `${km} no total`}</Text>
      <View className="flex-row items-center gap-3">
        <View className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <View className="h-2 rounded-full bg-primary" style={{ width: `${Math.round(restante * 100)}%` }} />
        </View>
        <Text variante="mono">{`${segundosRestantes(oferta.expiraEm, agora)}s`}</Text>
      </View>
    </View>
  );
}

function Paradas({ oferta }: { readonly oferta: Oferta }): ReactNode {
  return (
    <View className="gap-3 rounded-2xl border border-border bg-card p-4">
      <View className="gap-1">
        <Text variante="secundario">Coleta</Text>
        <Text variante="tituloDeCard">{oferta.coleta ?? 'Restaurante'}</Text>
      </View>
      {oferta.paradas.map((parada, indice) => (
        <View key={parada.codigo} className="flex-row items-center gap-3">
          <Text variante="mono" className="w-6 text-muted-foreground">
            {String(indice + 1)}
          </Text>
          <Text className="flex-1">{parada.bairro ?? 'Bairro não informado'}</Text>
        </View>
      ))}
    </View>
  );
}

function Indisponivel({
  motivo,
  aoVoltar,
}: {
  readonly motivo: string;
  readonly aoVoltar: () => void;
}): ReactNode {
  return (
    <Fundo>
      <View className="flex-1 justify-center gap-2 px-4">
        <Text variante="titulo">Oferta encerrada</Text>
        <Text variante="secundario">{motivo}</Text>
      </View>
      <BarraDeAcao>
        <Button onPress={aoVoltar}>
          <Text>Voltar ao início</Text>
        </Button>
      </BarraDeAcao>
    </Fundo>
  );
}
