import { useMutation, useQueryClient } from '@tanstack/react-query';
import { novaChave } from './chave';
import { api } from './cliente';
import { dadosDe } from './executar';
import { useInicio, type Inicio } from './turno';

export type Oferta = Inicio['ofertas'][number];

/** A oferta vem do /app/inicio (que já está em cache): nada de cópia própria do estado. */
export function useOferta(id: string): { oferta: Oferta | null; carregando: boolean } {
  const inicio = useInicio();
  return {
    oferta: inicio.data?.ofertas.find((oferta) => oferta.id === id) ?? null,
    carregando: inicio.isPending,
  };
}

const comId = (id: string, prefixo: string) => ({
  path: { id },
  header: { 'Idempotency-Key': novaChave(prefixo) },
});

/**
 * Visualizar, aceitar e recusar (documento 04 M3). Aceitar e recusar precisam de rede: a disputa é
 * decidida na hora e não entra na fila offline. Depois de cada uma, o Início é lido de novo.
 */
export function useAcoesDaOferta(id: string) {
  const clienteDeConsultas = useQueryClient();
  const atualizar = async (): Promise<void> => clienteDeConsultas.invalidateQueries({ queryKey: ['inicio'] });

  const visualizar = useMutation({
    mutationFn: async () =>
      dadosDe(api.POST('/app/ofertas/{id}/visualizar', { params: comId(id, 'oferta-ver') })),
  });
  const aceitar = useMutation({
    mutationFn: async () =>
      dadosDe(api.POST('/app/ofertas/{id}/aceitar', { params: comId(id, 'oferta-aceitar') })),
    onSettled: atualizar,
  });
  const recusar = useMutation({
    mutationFn: async (motivo: string | null) =>
      dadosDe(
        api.POST('/app/ofertas/{id}/recusar', {
          params: comId(id, 'oferta-recusar'),
          body: motivo === null ? {} : { motivo },
        }),
      ),
    onSettled: atualizar,
  });
  return { visualizar, aceitar, recusar };
}
