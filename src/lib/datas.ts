const DIAS_DA_SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'] as const;
const MS_POR_DIA = 86_400_000;
const DIGITOS = 2;

const doisDigitos = (numero: number): string => String(numero).padStart(DIGITOS, '0');

/** "2026-11-22" → "sáb, 22/11". A data é de calendário (sem fuso): não muda com o fuso do celular. */
export function formatarDia(dia: string): string {
  const [ano = 0, mes = 1, data = 1] = dia.split('-').map(Number);
  const semana = DIAS_DA_SEMANA[new Date(Date.UTC(ano, mes - 1, data)).getUTCDay()] ?? '';
  return `${semana}, ${doisDigitos(data)}/${doisDigitos(mes)}`;
}

/** "2026-11-01" → "01/11/2026". */
export function formatarData(dia: string): string {
  const [ano, mes, data] = dia.slice(0, 10).split('-');
  return `${data ?? ''}/${mes ?? ''}/${ano ?? ''}`;
}

/** Hora local de um instante ISO: "21:35". */
export function formatarHora(instante: string): string {
  const data = new Date(instante);
  return `${doisDigitos(data.getHours())}:${doisDigitos(data.getMinutes())}`;
}

/** "AAAA-MM-DD" de uma data no fuso do celular (o dia que o motoboy vê no calendário). */
export function diaLocal(data: Date): string {
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}`;
}

/** Os últimos N dias até hoje, inclusive: o período padrão do extrato. */
export function ultimosDias(quantos: number, hoje: Date): { de: string; ate: string } {
  return { de: diaLocal(new Date(hoje.getTime() - (quantos - 1) * MS_POR_DIA)), ate: diaLocal(hoje) };
}

const DIAS_POR_EXTENSO = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const;
const MESES = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
] as const;

/** "Domingo, 23 de novembro", no fuso do celular. */
export function dataPorExtenso(data: Date): string {
  return `${DIAS_POR_EXTENSO[data.getDay()] ?? ''}, ${data.getDate()} de ${MESES[data.getMonth()] ?? ''}`;
}
