import { useQuery } from '@tanstack/react-query';
import { api } from './cliente';
import { dadosDe } from './executar';

/** `GET /auth/me`: nome do motoboy e organização ativa, para a saudação do Início. */
export function useEu() {
  return useQuery({ queryKey: ['eu'], queryFn: async () => dadosDe(api.GET('/auth/me')) });
}
