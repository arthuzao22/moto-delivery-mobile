import { useQuery } from '@tanstack/react-query';
import { api } from './cliente';
import { dadosDe } from './executar';

/** GET /app/caixa: o dinheiro de clientes que está com o motoboy no turno, e os acertos. */
export function useCaixa() {
  return useQuery({ queryKey: ['caixa'], queryFn: async () => dadosDe(api.GET('/app/caixa')) });
}

/** GET /app/extrato: o que ele ganhou, por dia, com a memória de cálculo de cada valor. */
export function useExtrato(periodo: { readonly de: string; readonly ate: string }) {
  return useQuery({
    queryKey: ['extrato', periodo.de, periodo.ate],
    queryFn: async () => dadosDe(api.GET('/app/extrato', { params: { query: periodo } })),
  });
}

/** GET /app/fechamentos: aberto, em conferência, aprovado e pago. */
export function useFechamentos() {
  return useQuery({ queryKey: ['fechamentos'], queryFn: async () => dadosDe(api.GET('/app/fechamentos')) });
}

export type Caixa = NonNullable<ReturnType<typeof useCaixa>['data']>;
export type Extrato = NonNullable<ReturnType<typeof useExtrato>['data']>;
export type Fechamento = NonNullable<ReturnType<typeof useFechamentos>['data']>[number];

/** GET /app/entregas: as entregas que o motoboy terminou no período (sem período, hoje). */
export function useHistorico(periodo: { readonly de: string; readonly ate: string }) {
  return useQuery({
    queryKey: ['historico', periodo.de, periodo.ate],
    queryFn: async () => dadosDe(api.GET('/app/entregas', { params: { query: periodo } })),
  });
}

export type Historico = NonNullable<ReturnType<typeof useHistorico>['data']>;
export type EntregaDoHistorico = Historico['entregas'][number];
