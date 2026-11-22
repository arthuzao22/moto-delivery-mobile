import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { ehTokens, type Tokens } from './tokens';

const CHAVE_TOKENS = 'sessao.tokens';
const CHAVE_DISPOSITIVO = 'sessao.dispositivo';
const CHAVE_TOKEN_DE_PUSH = 'sessao.token-de-push';
/** Fica no AsyncStorage, que some na desinstalação; o cofre (Keychain) do iPhone, não. */
const MARCA_DE_INSTALACAO = 'instalacao.marcada';

const BASE_DO_IDENTIFICADOR = 36;

let emMemoria: Tokens | null | undefined;

/**
 * No iPhone, o Keychain sobrevive à desinstalação: quem reinstala voltaria com um refresh que pode
 * já ter sido rotacionado, e usá-lo revoga a família (documento 05 §4.4). Na primeira abertura
 * depois de instalar, o cofre é limpo antes de tudo.
 */
export async function prepararArmazem(): Promise<void> {
  const marcada = await AsyncStorage.getItem(MARCA_DE_INSTALACAO).catch(() => null);
  if (marcada !== null) return;
  await Promise.all(
    [CHAVE_TOKENS, CHAVE_DISPOSITIVO, CHAVE_TOKEN_DE_PUSH].map(async (chave) =>
      SecureStore.deleteItemAsync(chave).catch(() => undefined),
    ),
  );
  await AsyncStorage.setItem(MARCA_DE_INSTALACAO, '1').catch(() => undefined);
}

export async function lerTokens(): Promise<Tokens | null> {
  if (emMemoria !== undefined) return emMemoria;
  const guardado = await SecureStore.getItemAsync(CHAVE_TOKENS).catch(() => null);
  const lido = guardado === null ? null : lerJson(guardado);
  emMemoria = ehTokens(lido) ? lido : null;
  return emMemoria;
}

function lerJson(texto: string): unknown {
  try {
    return JSON.parse(texto);
  } catch {
    return null;
  }
}

export async function guardarTokens(tokens: Tokens): Promise<void> {
  emMemoria = tokens;
  await SecureStore.setItemAsync(CHAVE_TOKENS, JSON.stringify(tokens));
}

export async function apagarSessao(): Promise<void> {
  emMemoria = null;
  await SecureStore.deleteItemAsync(CHAVE_TOKENS).catch(() => undefined);
  await SecureStore.deleteItemAsync(CHAVE_TOKEN_DE_PUSH).catch(() => undefined);
}

/** Gerado uma vez por instalação e mandado no login (`dispositivoId`). Não é segredo. */
export async function dispositivoId(): Promise<string> {
  const guardado = await SecureStore.getItemAsync(CHAVE_DISPOSITIVO).catch(() => null);
  if (guardado !== null) return guardado;
  const novo = `${Date.now().toString(BASE_DO_IDENTIFICADOR)}-${Math.random().toString(BASE_DO_IDENTIFICADOR).slice(2)}`;
  await SecureStore.setItemAsync(CHAVE_DISPOSITIVO, novo).catch(() => undefined);
  return novo;
}

/** O token do Expo registrado na API: o "sair" precisa dele para desativar o push do aparelho. */
export async function lerTokenDePush(): Promise<string | null> {
  return SecureStore.getItemAsync(CHAVE_TOKEN_DE_PUSH).catch(() => null);
}

export async function guardarTokenDePush(token: string): Promise<void> {
  await SecureStore.setItemAsync(CHAVE_TOKEN_DE_PUSH, token).catch(() => undefined);
}
