import { useState, type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { BASE_DA_API, VERSAO_DO_APP } from '@/api/cliente';
import { ehErroDaApi } from '@/api/erro-da-api';
import { useEu } from '@/api/eu';
import { useSaude } from '@/api/saude';
import { BarraDeAcao } from '@/components/app/barra-de-acao';
import { CartaoDeNotificacoes } from '@/components/app/cartao-de-notificacoes';
import { FaixaDoTopo } from '@/components/app/faixa-do-topo';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSessao } from '@/sessao/provedor-de-sessao';

/**
 * Início da M1: quem está logado e a conexão com a API. Na M2, passa a ser guiado pelo
 * `GET /app/inicio` (documento 02 §2).
 */
export default function Inicio(): ReactNode {
  const { sair } = useSessao();
  const [saindo, setSaindo] = useState(false);
  return (
    <View className="flex-1 bg-background">
      <FaixaDoTopo titulo="Moto Delivery" />
      <ScrollView contentContainerClassName="gap-4 px-4 py-6">
        <Saudacao />
        <CartaoDeNotificacoes />
        <Text variante="eyebrow" className="mt-2">
          Conexão com a API
        </Text>
        <Situacao />
        <View className="gap-1 rounded-2xl border border-border bg-card p-4">
          <Text variante="secundario">Endereço</Text>
          <Text variante="mono">{BASE_DA_API ?? 'não configurado'}</Text>
          <Text variante="secundario" className="mt-2">
            Versão do app
          </Text>
          <Text variante="mono">{VERSAO_DO_APP}</Text>
        </View>
      </ScrollView>
      <BarraDeAcao>
        <Button
          variante="contorno"
          disabled={saindo}
          onPress={() => {
            setSaindo(true);
            void sair();
          }}
        >
          <Text>{saindo ? 'Saindo…' : 'Sair'}</Text>
        </Button>
      </BarraDeAcao>
    </View>
  );
}

function Saudacao(): ReactNode {
  const eu = useEu();
  if (eu.isPending) return <Text variante="titulo">Olá!</Text>;
  if (eu.isError) {
    const mensagem = ehErroDaApi(eu.error) ? eu.error.message : 'Não deu para carregar seus dados.';
    return <Aviso titulo="Olá!">{mensagem}</Aviso>;
  }
  const { usuario, organizacaoAtiva } = eu.data;
  const primeiroNome = usuario.nome.split(' ')[0] ?? usuario.nome;
  return (
    <View className="gap-1">
      <Text variante="titulo">{`Olá, ${primeiroNome}!`}</Text>
      <Text variante="secundario">{organizacaoAtiva?.nome ?? 'Sem organização ativa'}</Text>
    </View>
  );
}

function Situacao(): ReactNode {
  const saude = useSaude();
  if (BASE_DA_API === null) {
    return (
      <Aviso titulo="API não configurada">
        Defina EXPO_PUBLIC_API_URL no .env com o IP da máquina na rede local, por exemplo
        http://192.168.1.12:3333, e reinicie o Metro.
      </Aviso>
    );
  }
  if (saude.isPending) return <Aviso titulo="Consultando a API…">Aguarde um instante.</Aviso>;
  if (saude.isError) {
    const mensagem = ehErroDaApi(saude.error) ? saude.error.message : 'Não deu certo. Tente de novo.';
    return <Aviso titulo="Sem resposta da API">{mensagem}</Aviso>;
  }
  const { status, banco, versao } = saude.data;
  return (
    <Aviso titulo={status === 'ok' ? 'API no ar' : 'API com problema'}>
      {`Banco ${banco ? 'conectado' : 'fora do ar'} · versão ${versao}`}
    </Aviso>
  );
}

function Aviso({ titulo, children }: { readonly titulo: string; readonly children: ReactNode }): ReactNode {
  return (
    <View className="gap-1 rounded-2xl border border-border bg-card p-4">
      <Text variante="tituloDeCard">{titulo}</Text>
      <Text variante="secundario">{children}</Text>
    </View>
  );
}
