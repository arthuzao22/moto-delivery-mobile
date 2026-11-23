import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { novaChave } from '@/api/chave';
import type { Inicio } from '@/api/turno';
import { avancar, type AcaoDeCampo } from './avanco-otimista';
import { enfileirar } from './envio-da-fila';

/** O que uma ação de campo vira na fila: caminho já resolvido, corpo pronto e o avanço otimista. */
export interface PedidoDeCampo {
  readonly prefixo: string;
  readonly caminho: string;
  readonly corpo: object;
  readonly grupo: 'rota' | 'turno' | 'ocorrencia';
  readonly descricao: string;
  readonly avanco: AcaoDeCampo;
  /** Efeito local depois de guardar a ação, enviada ou pendente (ex.: desligar o GPS). */
  readonly depois?: () => Promise<void>;
}

const CHAVE_DO_INICIO = ['inicio'] as const;

/**
 * Uma ação de campo pela fila offline (documento 04 M6): com sinal, vai na hora e o Início é lido
 * de novo; sem sinal, fica na fila e a tela avança na mesma hora. A mutação roda mesmo offline.
 */
export function useAcaoDeCampo<T>(
  montar: (entrada: T) => Promise<PedidoDeCampo>,
): UseMutationResult<'enviada' | 'pendente', Error, T> {
  const clienteDeConsultas = useQueryClient();
  return useMutation({
    networkMode: 'always',
    mutationFn: async (entrada: T) => {
      const pedido = await montar(entrada);
      const { prefixo, corpo, avanco, depois, ...resto } = pedido;
      const situacao = await enfileirar({
        ...resto,
        chave: novaChave(prefixo),
        corpo: JSON.stringify(corpo),
      });
      if (situacao === 'pendente') {
        clienteDeConsultas.setQueryData<Inicio>(CHAVE_DO_INICIO, (atual) =>
          atual === undefined ? atual : avancar(atual, avanco),
        );
      }
      await depois?.();
      return situacao;
    },
    onSuccess: async (situacao) => {
      if (situacao === 'enviada') await clienteDeConsultas.invalidateQueries({ queryKey: CHAVE_DO_INICIO });
    },
    onError: async () => clienteDeConsultas.invalidateQueries({ queryKey: CHAVE_DO_INICIO }),
  });
}
