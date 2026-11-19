import * as Application from 'expo-application';
import createClient, { type Middleware } from 'openapi-fetch';
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

/** Cliente único da API, tipado pelo contrato. O Bearer e o renovador entram na M1. */
export const api = createClient<paths>({ baseUrl: BASE_DA_API ?? '' });
api.use(versao);
