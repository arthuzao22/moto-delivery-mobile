/** Um ponto como vai para `POST /app/localizacao`. */
export interface Ponto {
  readonly lat: number;
  readonly lng: number;
  readonly registradoEm: string;
  readonly precisaoM?: number;
  readonly velocidadeMs?: number;
  readonly bateriaPct?: number;
}

/** Limite da API por lote. */
export const TAMANHO_DO_LOTE = 100;

/**
 * Sem sinal por muito tempo, a fila não cresce sem fim: ficam os pontos mais novos (a última
 * posição é o que a central mais precisa). 2.000 pontos são mais de 8 h a um ponto a cada 15 s.
 */
export const LIMITE_DA_FILA = 2000;

export function acrescentar(fila: readonly Ponto[], novos: readonly Ponto[]): Ponto[] {
  const juntos = [...fila, ...novos];
  return juntos.length > LIMITE_DA_FILA ? juntos.slice(juntos.length - LIMITE_DA_FILA) : juntos;
}

/** Os mais antigos primeiro: a API só avança a última posição, então a ordem importa. */
export function proximoLote(fila: readonly Ponto[]): Ponto[] {
  return fila.slice(0, TAMANHO_DO_LOTE);
}

function chaveDo(ponto: Ponto): string {
  return `${ponto.registradoEm}|${ponto.lat}|${ponto.lng}`;
}

/**
 * Tira da frente da fila os pontos do lote enviado, conferindo um a um: a fila pode ter mudado
 * durante o envio (pontos novos no fim; com a fila cheia, os mais antigos cortados no começo).
 * Para no primeiro que não é do lote, então nunca apaga um ponto que não foi enviado.
 */
export function semOEnviado(fila: readonly Ponto[], lote: readonly Ponto[]): Ponto[] {
  const doLote = new Set(lote.map(chaveDo));
  const primeiroQueFica = fila.findIndex((ponto) => !doLote.has(chaveDo(ponto)));
  return primeiroQueFica === -1 ? [] : fila.slice(primeiroQueFica);
}

export type ResultadoDoEnvio = 'enviado' | 'sem_rede' | 'turno_fechado';

const STATUS_REGRA_VIOLADA = 422;

/** O que o laço de envio precisa do armazenamento e da rede (injetado para testar sem o aparelho). */
export interface PortasDoEnvio {
  readonly ler: () => Promise<readonly Ponto[]>;
  /** Tira o lote da fila guardada (relida na hora) e devolve a fila que ficou. */
  readonly removerLote: (lote: readonly Ponto[]) => Promise<readonly Ponto[]>;
  /** Status HTTP da resposta, ou `null` sem rede. */
  readonly enviar: (lote: readonly Ponto[]) => Promise<number | null>;
}

/**
 * Esvazia a fila em lotes de até 100, dos mais antigos. Sem rede ou com erro do servidor, para e os
 * pontos ficam para a próxima vez. A API associa cada ponto ao turno do instante `registradoEm` e só
 * responde 422 (turno_fechado) quando nenhum ponto do lote cai em turno algum: só aquele lote é
 * descartado e o laço segue com o resto (pontos válidos de antes do encerramento não se perdem).
 *
 * 'turno_fechado' só quando o último lote (o dos pontos mais novos) foi recusado: nem a posição
 * mais recente cabe num turno, então o turno atual acabou (talvez pela central) e o GPS pode parar.
 * Um lote antigo recusado seguido de um aceito é só sobra de um turno passado.
 */
export async function esvaziar(portas: PortasDoEnvio): Promise<ResultadoDoEnvio> {
  let fila = await portas.ler();
  let ultimoRecusado = false;
  while (fila.length > 0) {
    const lote = proximoLote(fila);
    const status = await portas.enviar(lote);
    const recusado = status === STATUS_REGRA_VIOLADA;
    const aceito = status !== null && status >= 200 && status < 300;
    if (!recusado && !aceito) return 'sem_rede';
    ultimoRecusado = recusado;
    fila = await portas.removerLote(lote);
  }
  return ultimoRecusado ? 'turno_fechado' : 'enviado';
}

/** Do objeto do expo-location para o ponto da API (campos ausentes ficam de fora). */
export function pontoDe(
  local: {
    readonly timestamp: number;
    readonly coords: {
      readonly latitude: number;
      readonly longitude: number;
      readonly accuracy: number | null;
      readonly speed: number | null;
    };
  },
  bateriaPct: number | null,
): Ponto {
  const { latitude, longitude, accuracy, speed } = local.coords;
  return {
    lat: latitude,
    lng: longitude,
    registradoEm: new Date(local.timestamp).toISOString(),
    ...(accuracy === null || accuracy < 0 ? {} : { precisaoM: accuracy }),
    ...(speed === null || speed < 0 ? {} : { velocidadeMs: speed }),
    ...(bateriaPct === null ? {} : { bateriaPct }),
  };
}
