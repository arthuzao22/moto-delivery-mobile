import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, BASE_DA_API } from './cliente';
import { dadosDe } from './executar';

/** `GET /saude`: a prova da M0 de que o celular fala com a API (pela rede local, em desenvolvimento). */
export function useSaude(): UseQueryResult<{ status: 'ok' | 'degradado'; banco: boolean; versao: string }> {
  return useQuery({
    queryKey: ['saude'],
    queryFn: async () => dadosDe(api.GET('/saude')),
    enabled: BASE_DA_API !== null,
  });
}
