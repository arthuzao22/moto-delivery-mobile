import { mensagemDoErro } from './mensagens-de-erro';

interface CorpoDeErro {
  readonly erro: {
    readonly codigo: string;
    readonly mensagem: string;
    readonly detalhes?: Record<string, unknown>;
    readonly requestId?: string;
  };
}

export const STATUS_SEM_CONEXAO = 0;
const STATUS_NAO_AUTENTICADO = 401;
const STATUS_SEM_PERMISSAO = 403;
const STATUS_NAO_ENCONTRADO = 404;
const STATUS_APP_DESATUALIZADO = 426;

/** Erro normalizado de qualquer chamada à API. A tela decide a mensagem pelo `codigo`. */
export class ErroDaApi extends Error {
  readonly status: number;
  readonly codigo: string;
  readonly detalhes: Record<string, unknown>;
  readonly requestId: string | null;

  constructor(dados: {
    status: number;
    codigo: string;
    mensagem: string;
    detalhes?: Record<string, unknown>;
    requestId?: string | null;
  }) {
    super(mensagemDoErro(dados.codigo, dados.mensagem));
    this.name = 'ErroDaApi';
    this.status = dados.status;
    this.codigo = dados.codigo;
    this.detalhes = dados.detalhes ?? {};
    this.requestId = dados.requestId ?? null;
  }

  get naoAutenticado(): boolean {
    return this.status === STATUS_NAO_AUTENTICADO;
  }

  get semPermissao(): boolean {
    return this.status === STATUS_SEM_PERMISSAO;
  }

  get naoEncontrado(): boolean {
    return this.status === STATUS_NAO_ENCONTRADO;
  }

  /** Versão do app abaixo da mínima: só resta a tela de atualizar (documento 02 §5). */
  get appDesatualizado(): boolean {
    return this.status === STATUS_APP_DESATUALIZADO;
  }

  /** Erros por campo (`detalhes.campos: [{caminho, mensagem}]`) quando o Zod da API recusou o corpo. */
  get campos(): Record<string, string> {
    const campos = this.detalhes.campos;
    if (!Array.isArray(campos)) return {};
    const pares = campos.filter(ehCampoInvalido).map((campo) => [campo.caminho, campo.mensagem] as const);
    return Object.fromEntries(pares);
  }

  static semConexao(): ErroDaApi {
    return new ErroDaApi({
      status: STATUS_SEM_CONEXAO,
      codigo: 'sem_conexao',
      mensagem: 'Sem conexão com o servidor.',
    });
  }
}

function ehCampoInvalido(valor: unknown): valor is { caminho: string; mensagem: string } {
  return (
    !!valor &&
    typeof valor === 'object' &&
    'caminho' in valor &&
    'mensagem' in valor &&
    typeof valor.caminho === 'string' &&
    typeof valor.mensagem === 'string'
  );
}

function ehCorpoDeErro(valor: unknown): valor is CorpoDeErro {
  if (!valor || typeof valor !== 'object' || !('erro' in valor)) return false;
  const { erro } = valor;
  return !!erro && typeof erro === 'object' && 'codigo' in erro && typeof erro.codigo === 'string';
}

/** Converte a resposta de erro da API (ou um corpo inesperado) em `ErroDaApi`. */
export function paraErroDaApi(status: number, corpo: unknown): ErroDaApi {
  if (ehCorpoDeErro(corpo)) {
    return new ErroDaApi({ status, ...corpo.erro });
  }
  return new ErroDaApi({ status, codigo: 'erro_inesperado', mensagem: 'Não foi possível concluir a ação.' });
}

export function ehErroDaApi(erro: unknown): erro is ErroDaApi {
  return erro instanceof ErroDaApi;
}
