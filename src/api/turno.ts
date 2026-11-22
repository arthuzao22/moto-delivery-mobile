import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  iniciarRastreamento,
  pararRastreamento,
  pedirPermissao,
  situacaoDaPermissao,
  type SituacaoDaPermissao,
} from '@/gps/rastreamento';
import { agoraIso, novaChave } from './chave';
import { api } from './cliente';
import { dadosDe } from './executar';

const CHAVE_DO_INICIO = ['inicio'] as const;

/** GET /app/inicio: a fonte da tela inicial (documento 04 §2.5). Nenhuma tela guarda estado próprio. */
export function useInicio() {
  return useQuery({ queryKey: CHAVE_DO_INICIO, queryFn: async () => dadosDe(api.GET('/app/inicio')) });
}

export type Inicio = NonNullable<ReturnType<typeof useInicio>['data']>;

const idempotente = (prefixo: string) => ({ header: { 'Idempotency-Key': novaChave(prefixo) } });

/** O GPS só liga com a localização precisa e, fora do Expo Go, com o "o tempo todo". */
export class PermissaoDeLocalizacao extends Error {
  constructor(readonly situacao: Exclude<SituacaoDaPermissao, 'ok'>) {
    super(situacao);
    this.name = 'PermissaoDeLocalizacao';
  }
}

async function garantirPermissao(): Promise<void> {
  const atual = await situacaoDaPermissao();
  const situacao = atual === 'ok' ? atual : await pedirPermissao();
  if (situacao !== 'ok') throw new PermissaoDeLocalizacao(situacao);
}

/** Abrir, pausar, voltar e encerrar o turno. Depois de cada ação, o Início é lido de novo. */
export function useAcoesDoTurno() {
  const clienteDeConsultas = useQueryClient();
  const atualizar = async (): Promise<void> =>
    clienteDeConsultas.invalidateQueries({ queryKey: CHAVE_DO_INICIO });

  const abrir = useMutation({
    mutationFn: async () => {
      await garantirPermissao();
      await dadosDe(
        api.POST('/app/turnos/abrir', { params: idempotente('turno-abrir'), body: { eventoEm: agoraIso() } }),
      );
      await iniciarRastreamento();
    },
    onSettled: atualizar,
  });

  const disponibilidade = useMutation({
    mutationFn: async (nova: 'disponivel' | 'pausa') =>
      dadosDe(
        api.POST('/app/disponibilidade', {
          params: idempotente('disponibilidade'),
          body: { disponibilidade: nova, eventoEm: agoraIso() },
        }),
      ),
    onSettled: atualizar,
  });

  const encerrar = useMutation({
    mutationFn: async () => {
      await dadosDe(
        api.POST('/app/turnos/fechar', {
          params: idempotente('turno-fechar'),
          body: { eventoEm: agoraIso() },
        }),
      );
      await pararRastreamento();
    },
    onSettled: atualizar,
  });

  return { abrir, disponibilidade, encerrar };
}
