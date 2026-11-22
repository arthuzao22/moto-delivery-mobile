import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/api/cliente';
import { acrescentar, proximoLote, semOEnviado, type Ponto } from './fila-de-pontos';

/** A fila sobrevive ao app fechado e à tarefa de segundo plano (que roda em outro contexto JS). */
const CHAVE_DA_FILA = 'gps.fila';
const STATUS_REGRA_VIOLADA = 422;

export type ResultadoDoEnvio = 'enviado' | 'sem_rede' | 'turno_fechado';

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

export async function guardarPontos(novos: readonly Ponto[]): Promise<void> {
  if (novos.length === 0) return;
  await gravarFila(acrescentar(await lerFila(), novos));
}

export async function limparFila(): Promise<void> {
  await AsyncStorage.removeItem(CHAVE_DA_FILA).catch(() => undefined);
}

/**
 * Esvazia a fila em lotes de até 100 (POST /app/localizacao). Sem rede ou com erro do servidor, os
 * pontos ficam para a próxima vez. 422 turno_fechado: o turno acabou (talvez pela central) e a fila
 * é descartada, porque a API recusaria todos.
 */
export async function enviarPendentes(): Promise<ResultadoDoEnvio> {
  let fila = await lerFila();
  while (fila.length > 0) {
    const lote = proximoLote(fila);
    const resposta = await api.POST('/app/localizacao', { body: { pontos: lote } }).catch(() => null);
    if (resposta?.response.status === STATUS_REGRA_VIOLADA) {
      await limparFila();
      return 'turno_fechado';
    }
    if (resposta === null || !resposta.response.ok) return 'sem_rede';
    fila = semOEnviado(fila, lote.length);
    await gravarFila(fila);
  }
  return 'enviado';
}
