import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { io, type Socket } from 'socket.io-client';
import { BASE_DA_API, renovador } from '@/api/cliente';
import { lerTokens } from '@/sessao/armazem';
import { avisarSessaoPerdida } from '@/sessao/aviso-de-sessao';

/** Eventos que mudam o que o Início mostra: o app só invalida e lê o /app/inicio de novo. */
const EVENTOS_DO_INICIO = [
  'oferta.nova',
  'oferta.expirada',
  'oferta.retirada',
  'rota.atualizada',
  'rota.transferida',
  'entrega.atualizada',
  'turno.aberto',
  'turno.encerrado',
] as const;

/** O Socket.IO escuta na raiz do servidor, não em /api/v1. */
function origemDoServidor(): string | null {
  return BASE_DA_API === null ? null : BASE_DA_API.replace(/\/api\/v1$/, '');
}

function idDaOferta(dados: unknown): string | null {
  if (typeof dados !== 'object' || dados === null) return null;
  const id: unknown = Reflect.get(dados, 'id');
  return typeof id === 'string' ? id : null;
}

/** O handshake só diz `nao_autenticado`, inclusive com o token vencido: renova uma vez e tenta de novo. */
async function aoRecusarConexao(socket: Socket, erro: Error): Promise<void> {
  if (erro.message !== 'nao_autenticado') return;
  const renovacao = await renovador.renovar();
  if (renovacao.tipo === 'perdida') avisarSessaoPerdida();
  if (renovacao.tipo === 'renovada') socket.connect();
}

/**
 * Tempo real com o turno aberto (documento 04 §2.6): o socket só invalida o Início. Uma oferta
 * nova com o app aberto já abre a tela da oferta. Com o app em segundo plano, quem avisa é o push.
 */
export function useTempoReal(ativo: boolean): void {
  const clienteDeConsultas = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const origem = origemDoServidor();
    if (!ativo || origem === null) return;
    const socket = io(origem, {
      transports: ['websocket'],
      auth: (responder) => {
        void lerTokens().then((tokens) => responder({ token: tokens?.accessToken }));
      },
    });
    const atualizar = (): void => void clienteDeConsultas.invalidateQueries({ queryKey: ['inicio'] });
    EVENTOS_DO_INICIO.forEach((evento) => socket.on(evento, atualizar));
    socket.on('oferta.nova', (dados: unknown) => {
      const id = idDaOferta(dados);
      if (id !== null) router.push({ pathname: '/oferta/[id]', params: { id } });
    });
    socket.on('connect', atualizar);
    socket.on('connect_error', (erro) => void aoRecusarConexao(socket, erro));
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [ativo, clienteDeConsultas, router]);
}
