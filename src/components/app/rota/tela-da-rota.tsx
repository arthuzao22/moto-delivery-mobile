import { useState, type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useAcoesDaRota, type RotaAtiva } from '@/api/rota';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { BotoesDeNavegacao } from './botoes-de-navegacao';
import { AvisarACentral, ErroDaAcao } from './acoes-comuns';
import { ParadaDaVez } from './parada-da-vez';

/** A rota aceita, guiada pelo status dela (documento 02 §2): restaurante, coleta e paradas. */
export function TelaDaRota({ rota }: { readonly rota: RotaAtiva }): ReactNode {
  if (rota.status === 'aceita') return <IndoAoRestaurante rota={rota} />;
  if (rota.status === 'em_coleta') return <Coleta key={rota.id} rota={rota} />;
  return <ParadaDaVez rota={rota} />;
}

function IndoAoRestaurante({ rota }: { readonly rota: RotaAtiva }): ReactNode {
  const { chegarNaColeta } = useAcoesDaRota();
  const primeira = rota.paradas[0];
  return (
    <>
      <ScrollView contentContainerClassName="gap-4 px-4 py-6">
        <Text variante="eyebrow">{`Rota ${rota.codigo} · coleta`}</Text>
        <View className="gap-1 rounded-2xl border border-border bg-card p-4">
          <Text variante="titulo">Indo ao restaurante</Text>
          <Text>{primeira?.coleta.endereco ?? 'Endereço da coleta não informado'}</Text>
          {primeira?.coleta.instrucoes ? (
            <Text variante="secundario">{primeira.coleta.instrucoes}</Text>
          ) : null}
        </View>
        <BotoesDeNavegacao
          destino={{
            endereco: primeira?.coleta.endereco ?? '',
            coordenada: primeira?.coordenadaColeta ?? null,
          }}
        />
      </ScrollView>
      <BarraDeAcao>
        <ErroDaAcao erro={chegarNaColeta.error} />
        {rota.acoesPermitidas.includes('chegar_coleta') ? (
          <Button disabled={chegarNaColeta.isPending} onPress={() => chegarNaColeta.mutate(rota.id)}>
            <Text>{chegarNaColeta.isPending ? 'Enviando…' : 'Cheguei no restaurante'}</Text>
          </Button>
        ) : null}
        <AvisarACentral />
      </BarraDeAcao>
    </>
  );
}

/** Conferir os pedidos: desmarcar o que não veio, que volta para a fila (coleta parcial). */
function Coleta({ rota }: { readonly rota: RotaAtiva }): ReactNode {
  const { coletar } = useAcoesDaRota();
  const [marcados, setMarcados] = useState(() => new Set(rota.paradas.map((parada) => parada.entregaId)));
  const [codigo, setCodigo] = useState('');
  const faltaCodigo = rota.exigeCodigoColeta && codigo.trim() === '';
  const trocar = (id: string, marcado: boolean): void =>
    setMarcados((atuais) => {
      const novos = new Set(atuais);
      if (marcado) novos.add(id);
      else novos.delete(id);
      return novos;
    });
  return (
    <>
      <ScrollView contentContainerClassName="gap-4 px-4 py-6" keyboardShouldPersistTaps="handled">
        <Text variante="eyebrow">{`Rota ${rota.codigo} · coleta`}</Text>
        <Text variante="titulo">Confira os pedidos</Text>
        <Text variante="secundario">Desmarque o que ainda não está pronto: ele volta para a fila.</Text>
        <View className="rounded-2xl border border-border bg-card px-4 py-2">
          {rota.paradas.map((parada) => (
            <Checkbox
              key={parada.entregaId}
              marcado={marcados.has(parada.entregaId)}
              rotulo={`${parada.codigo} · ${parada.cliente}`}
              detalhe={parada.destino}
              aoTrocar={(marcado) => trocar(parada.entregaId, marcado)}
            />
          ))}
        </View>
        {rota.exigeCodigoColeta ? (
          <Input
            rotulo="Código de coleta"
            value={codigo}
            onChangeText={setCodigo}
            autoCapitalize="characters"
          />
        ) : null}
      </ScrollView>
      <BarraDeAcao>
        <ErroDaAcao erro={coletar.error} />
        <Button
          disabled={marcados.size === 0 || faltaCodigo || coletar.isPending}
          onPress={() =>
            coletar.mutate({
              rotaId: rota.id,
              entregaIds: [...marcados],
              ...(rota.exigeCodigoColeta ? { codigoColeta: codigo.trim() } : {}),
            })
          }
        >
          <Text>{coletar.isPending ? 'Enviando…' : 'Sair para entrega'}</Text>
        </Button>
        <AvisarACentral />
      </BarraDeAcao>
    </>
  );
}
