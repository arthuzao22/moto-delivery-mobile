import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/api/cliente';
import { comPrazo } from '@/fila/ordem-de-envio';
import { acrescentar, esvaziar, semOEnviado, type Ponto, type ResultadoDoEnvio } from './fila-de-pontos';

/**
 * A fila sobrevive ao app fechado. Com o app vivo, a tarefa de segundo plano roda no mesmo contexto
 * JS que o envio ao voltar o sinal: toda leitura-e-gravação da chave passa por `emSerie`, senão uma
 * gravação apagaria a outra (pontos perdidos ou enviados duas vezes).
 */
const CHAVE_DA_FILA = 'gps.fila';

function ehPonto(valor: unknown): valor is Ponto {
  return (
    typeof valor === 'object' &&
    valor !== null &&
    typeof Reflect.get(valor, 'lat') === 'number' &&
    typeof Reflect.get(valor, 'lng') === 'number' &&
    typeof Reflect.get(valor, 'registradoEm') === 'string'
  );
}

async function lerFila(): Promise<Ponto[]> {
  const guardada = await AsyncStorage.getItem(CHAVE_DA_FILA).catch(() => null);
  if (guardada === null) return [];
  try {
    const lida: unknown = JSON.parse(guardada);
    return Array.isArray(lida) ? lida.filter(ehPonto) : [];
  } catch {
    return [];
  }
}

async function gravarFila(fila: readonly Ponto[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE_DA_FILA, JSON.stringify(fila)).catch(() => undefined);
}

let ultimaGravacao: Promise<unknown> = Promise.resolve();

/** Um passo de cada vez sobre a chave da fila, na ordem em que foram pedidos. */
function emSerie<T>(passo: () => Promise<T>): Promise<T> {
  const resultado = ultimaGravacao.then(passo);
  ultimaGravacao = resultado.catch(() => undefined);
  return resultado;
}

export async function guardarPontos(novos: readonly Ponto[]): Promise<void> {
  if (novos.length === 0) return;
  await emSerie(async () => gravarFila(acrescentar(await lerFila(), novos)));
}

/** Só ao sair da conta: encerrar o turno não descarta pontos (eles ainda vão para a trilha). */
export async function limparFila(): Promise<void> {
  await emSerie(async () => AsyncStorage.removeItem(CHAVE_DA_FILA).catch(() => undefined));
}

/** Relê a fila na hora e tira só os pontos daquele lote; os que chegaram durante o envio ficam. */
function removerLote(lote: readonly Ponto[]): Promise<Ponto[]> {
  return emSerie(async () => {
    const restante = semOEnviado(await lerFila(), lote);
    await gravarFila(restante);
    return restante;
  });
}

/**
 * Prazo de um lote. O fetch do React Native (OkHttp/NSURLSession) não tem timeout próprio: com sinal
 * fraco um POST ficaria pendurado e a fila inteira (e as ações atrás dela) parada. Estourou, conta
 * como sem rede e o lote fica para a próxima rodada. `AbortSignal.timeout` não existe no polyfill de
 * AbortController do RN 0.86, por isso AbortController + setTimeout; o `comPrazo` garante o prazo
 * mesmo se o abort não chegar ao fetch (por exemplo, durante a renovação do token).
 */
const PRAZO_DO_LOTE_MS = 15_000;

async function enviarLote(lote: readonly Ponto[]): Promise<number | null> {
  const controle = new AbortController();
  const envio = api.POST('/app/localizacao', { body: { pontos: [...lote] }, signal: controle.signal }).then(
    (resposta) => resposta.response.status,
    () => null,
  );
  const status = await comPrazo(envio, PRAZO_DO_LOTE_MS, null);
  if (status === null) controle.abort();
  return status;
}

let emAndamento: Promise<ResultadoDoEnvio> | null = null;

/**
 * Esvazia a fila (regras em `esvaziar`). Uma rodada por vez: quem chama durante uma rodada (o GPS e
 * o sinal voltando ao mesmo tempo) espera a mesma e recebe o mesmo resultado.
 */
export function enviarPendentes(): Promise<ResultadoDoEnvio> {
  emAndamento ??= esvaziar({ ler: lerFila, removerLote, enviar: enviarLote }).finally(() => {
    emAndamento = null;
  });
  return emAndamento;
}
