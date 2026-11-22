import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { pedirPermissao, registrarAparelho, type SituacaoDoPush } from './push';

const CHAVE = ['push'] as const;

/** Registra o aparelho ao abrir o Início logado; `ativar` pede a permissão e registra de novo. */
export function usePush(): {
  readonly situacao: SituacaoDoPush | null;
  readonly falhou: boolean;
  ativar(): Promise<void>;
} {
  const clienteDeConsultas = useQueryClient();
  const registro = useQuery({ queryKey: CHAVE, queryFn: registrarAparelho, staleTime: Infinity, retry: 1 });
  const ativar = useCallback(async () => {
    await pedirPermissao();
    await clienteDeConsultas.invalidateQueries({ queryKey: CHAVE });
  }, [clienteDeConsultas]);
  return { situacao: registro.data ?? null, falhou: registro.isError, ativar };
}
