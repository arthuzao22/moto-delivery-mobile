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

export function semOEnviado(fila: readonly Ponto[], enviados: number): Ponto[] {
  return fila.slice(enviados);
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
