import { useQueryClient } from '@tanstack/react-query';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '@/api/cliente';
import { dadosDe } from '@/api/executar';
import { esvaziar as esvaziarFila } from '@/fila/armazem-da-fila';
import { limparFila as limparFilaDoGps } from '@/gps/envio';
import { pararRastreamento } from '@/gps/rastreamento';
import {
  apagarSessao,
  dispositivoId,
  guardarTokens,
  lerTokenDePush,
  lerTokens,
  prepararArmazem,
} from './armazem';
import { ouvirSessaoPerdida } from './aviso-de-sessao';

/** `carregando` até ler o cofre: a splash espera, para não piscar a tela de login. */
export type SituacaoDaSessao = 'carregando' | 'anonima' | 'ativa';

interface Sessao {
  readonly situacao: SituacaoDaSessao;
  entrar(credenciais: { readonly email: string; readonly senha: string }): Promise<void>;
  sair(): Promise<void>;
}

const ContextoDaSessao = createContext<Sessao | null>(null);

/** Sair funciona até sem rede: o que falhar no servidor expira sozinho; o aparelho esquece na hora. */
async function encerrarNoServidor(): Promise<void> {
  const tokenDePush = await lerTokenDePush();
  if (tokenDePush !== null) {
    await api.POST('/app/dispositivo/desativar', {
      params: { header: { 'Idempotency-Key': `sair-${tokenDePush}-${Date.now()}` } },
      body: { expoToken: tokenDePush },
    });
  }
  await api.POST('/auth/logout');
}

export function ProvedorDeSessao({ children }: { readonly children: ReactNode }): ReactNode {
  const clienteDeConsultas = useQueryClient();
  const [situacao, setSituacao] = useState<SituacaoDaSessao>('carregando');

  useEffect(() => {
    const iniciar = async (): Promise<void> => {
      try {
        await prepararArmazem();
        setSituacao((await lerTokens()) === null ? 'anonima' : 'ativa');
      } catch {
        setSituacao('anonima');
      }
    };
    void iniciar();
  }, []);

  const esquecer = useCallback(async () => {
    await pararRastreamento().catch(() => undefined);
    await limparFilaDoGps().catch(() => undefined);
    await esvaziarFila().catch(() => undefined);
    await apagarSessao();
    clienteDeConsultas.clear();
    setSituacao('anonima');
  }, [clienteDeConsultas]);

  useEffect(() => ouvirSessaoPerdida(() => void esquecer()), [esquecer]);

  const entrar = useCallback<Sessao['entrar']>(async ({ email, senha }) => {
    const corpo = { email: email.trim(), senha, dispositivoId: await dispositivoId() };
    const tokens = await dadosDe(api.POST('/auth/app/login', { body: corpo }));
    await guardarTokens(tokens);
    setSituacao('ativa');
  }, []);

  const sair = useCallback(async () => {
    await encerrarNoServidor().catch(() => undefined);
    await esquecer();
  }, [esquecer]);

  const valor = useMemo<Sessao>(() => ({ situacao, entrar, sair }), [situacao, entrar, sair]);
  return <ContextoDaSessao.Provider value={valor}>{children}</ContextoDaSessao.Provider>;
}

export function useSessao(): Sessao {
  const sessao = useContext(ContextoDaSessao);
  if (sessao === null) throw new Error('useSessao fora do ProvedorDeSessao');
  return sessao;
}
