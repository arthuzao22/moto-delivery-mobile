import * as Application from 'expo-application';
import createClient, { type Middleware } from 'openapi-fetch';
import { guardarTokens, lerTokens } from '@/sessao/armazem';
import { avisarSessaoPerdida } from '@/sessao/aviso-de-sessao';
import { criarFetchAutenticado } from '@/sessao/fetch-autenticado';
import { Renovador } from '@/sessao/renovador';
import { ehTokens } from '@/sessao/tokens';
import { baseDaApi } from './configuracao';
import type { paths } from './schema';

/** Null quando falta `EXPO_PUBLIC_API_URL`: a tela inicial mostra como configurar. */
export const BASE_DA_API = baseDaApi(process.env.EXPO_PUBLIC_API_URL);

/**
 * A versão nativa da loja, não a do OTA: abaixo de `APP_VERSAO_MINIMA` a API responde 426
 * e o app mostra a tela de atualizar (lacuna A4, documento 05).
 */
export const VERSAO_DO_APP = Application.nativeApplicationVersion ?? '0.0.0';

const versao: Middleware = {
  onRequest({ request }) {
    request.headers.set('X-App-Version', VERSAO_DO_APP);
    return request;
  },
};

/** `POST /auth/app/refresh` com o fetch comum: passar pelo cliente faria a renovação chamar a si mesma. */
async function pedirRenovacao(
  refreshToken: string,
): Promise<{ status: number; tokens: ReturnType<typeof tokensDe> }> {
  const resposta = await fetch(`${BASE_DA_API ?? ''}/auth/app/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-App-Version': VERSAO_DO_APP },
    body: JSON.stringify({ refreshToken }),
  });
  const corpo: unknown = resposta.ok ? await resposta.json() : null;
  return { status: resposta.status, tokens: tokensDe(corpo) };
}

function tokensDe(corpo: unknown): Parameters<typeof guardarTokens>[0] | null {
  if (typeof corpo !== 'object' || corpo === null || !('dados' in corpo)) return null;
  return ehTokens(corpo.dados) ? corpo.dados : null;
}

export const renovador = new Renovador({ ler: lerTokens, guardar: guardarTokens, pedir: pedirRenovacao });

/** O fetch com Bearer, renovação única e repetição no 401. A fila offline também envia por ele. */
export const fetchDaApi = criarFetchAutenticado({
  fetch: async (requisicao) => fetch(requisicao),
  ler: lerTokens,
  renovar: async () => renovador.renovar(),
  aoPerderSessao: avisarSessaoPerdida,
  agora: () => new Date(),
});

/** Cliente único da API, tipado pelo contrato. */
export const api = createClient<paths>({ baseUrl: BASE_DA_API ?? '', fetch: fetchDaApi });
api.use(versao);
