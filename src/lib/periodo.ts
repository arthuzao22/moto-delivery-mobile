import { diaLocal, formatarDia } from './datas';

const MS_POR_DIA = 86_400_000;

/** Um intervalo de dias de calendário (AAAA-MM-DD, inclusive), como a API recebe em ?de=&ate=. */
export interface Periodo {
  readonly de: string;
  readonly ate: string;
}

export type Atalho = 'hoje' | 'ontem' | 'semana' | 'mes';

export const ATALHOS: readonly { readonly atalho: Atalho; readonly rotulo: string; readonly dias: number }[] =
  [
    { atalho: 'hoje', rotulo: 'Hoje', dias: 1 },
    { atalho: 'ontem', rotulo: 'Ontem', dias: 1 },
    { atalho: 'semana', rotulo: '7 dias', dias: 7 },
    { atalho: 'mes', rotulo: '30 dias', dias: 30 },
  ];

function somarDias(dia: string, dias: number): string {
  const [ano = 0, mes = 1, data = 1] = dia.split('-').map(Number);
  return new Date(Date.UTC(ano, mes - 1, data) + dias * MS_POR_DIA).toISOString().slice(0, 10);
}

export function periodoDoAtalho(atalho: Atalho, hoje: Date): Periodo {
  const dia = diaLocal(hoje);
  if (atalho === 'ontem') {
    const ontem = somarDias(dia, -1);
    return { de: ontem, ate: ontem };
  }
  const dias = ATALHOS.find((item) => item.atalho === atalho)?.dias ?? 1;
  return { de: somarDias(dia, -(dias - 1)), ate: dia };
}

/** Andar um dia (ou o tamanho do período) para trás ou para frente, sem passar de hoje. */
export function deslocar(periodo: Periodo, sentido: -1 | 1, hoje: Date): Periodo {
  const tamanho = diasDoPeriodo(periodo);
  const de = somarDias(periodo.de, sentido * tamanho);
  const ate = somarDias(periodo.ate, sentido * tamanho);
  return ate > diaLocal(hoje) ? periodo : { de, ate };
}

export function diasDoPeriodo({ de, ate }: Periodo): number {
  return Math.round((Date.parse(ate) - Date.parse(de)) / MS_POR_DIA) + 1;
}

export function ehHoje(periodo: Periodo, hoje: Date): boolean {
  return periodo.ate >= diaLocal(hoje);
}

/** "Hoje", "Ontem", "sáb, 22/11" ou "16/11 a 22/11". */
export function rotuloDoPeriodo(periodo: Periodo, hoje: Date): string {
  const dia = diaLocal(hoje);
  if (periodo.de === periodo.ate) {
    if (periodo.de === dia) return 'Hoje';
    if (periodo.de === somarDias(dia, -1)) return 'Ontem';
    return formatarDia(periodo.de);
  }
  return `${periodo.de.slice(8, 10)}/${periodo.de.slice(5, 7)} a ${periodo.ate.slice(8, 10)}/${periodo.ate.slice(5, 7)}`;
}
