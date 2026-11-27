import type { SituacaoDaPermissao } from './rastreamento';

/**
 * O app só funciona com a localização ligada e permitida: sem ela o turno fica sem trilha, a central
 * perde o motoboy de vista e a distribuição por proximidade erra. Além da permissão, o GPS do aparelho
 * (o botão "Localização" do sistema) precisa estar ligado: com ele desligado a permissão continua
 * concedida e nenhum ponto chega.
 */
export type SituacaoDaLocalizacao = SituacaoDaPermissao | 'gps_desligado';

/** O que o botão da tela de bloqueio faz. */
export type AcaoParaLiberar = 'ligar_gps' | 'pedir_permissao' | 'abrir_ajustes';

export interface Bloqueio {
  readonly titulo: string;
  readonly texto: string;
  readonly botao: string;
  readonly acao: AcaoParaLiberar;
}

/** Quanto tempo entre uma conferência e outra com o app aberto (o motoboy pode desligar pela barra). */
export const INTERVALO_DE_CONFERENCIA_MS = 5_000;

interface Contexto {
  /** Android ou iOS: só o Android abre o diálogo do sistema para ligar o GPS. */
  readonly android: boolean;
  /** O sistema ainda mostra o pedido de permissão (no Android, depois de duas recusas, não mostra). */
  readonly podePerguntar: boolean;
}

const BLOQUEIOS: Record<Exclude<SituacaoDaLocalizacao, 'ok'>, Omit<Bloqueio, 'acao' | 'botao'>> = {
  gps_desligado: {
    titulo: 'Ligue a localização',
    texto: 'O GPS do celular está desligado. Sem ele o app não marca seu trajeto e a central não vê você.',
  },
  negada: {
    titulo: 'Permita a localização',
    texto:
      'O app precisa da sua localização para funcionar: é ela que marca o trajeto e mostra você no mapa.',
  },
  aproximada: {
    titulo: 'Use a localização precisa',
    texto: 'Com a localização aproximada o trajeto não é marcado. Ative "Localização precisa" para o app.',
  },
  sem_segundo_plano: {
    titulo: 'Permita "o tempo todo"',
    texto:
      'Para marcar o trajeto com a tela desligada, a localização do app precisa ser permitida o tempo todo.',
  },
};

function acaoPara(situacao: Exclude<SituacaoDaLocalizacao, 'ok'>, contexto: Contexto): AcaoParaLiberar {
  if (situacao === 'gps_desligado') return contexto.android ? 'ligar_gps' : 'abrir_ajustes';
  if (situacao === 'negada' && contexto.podePerguntar) return 'pedir_permissao';
  return 'abrir_ajustes';
}

const TEXTO_DO_BOTAO: Record<AcaoParaLiberar, string> = {
  ligar_gps: 'Ligar a localização',
  pedir_permissao: 'Permitir localização',
  abrir_ajustes: 'Abrir Ajustes',
};

/** `null` quando está tudo certo e o app pode ser usado. */
export function bloqueioPara(situacao: SituacaoDaLocalizacao, contexto: Contexto): Bloqueio | null {
  if (situacao === 'ok') return null;
  const acao = acaoPara(situacao, contexto);
  return { ...BLOQUEIOS[situacao], acao, botao: TEXTO_DO_BOTAO[acao] };
}
