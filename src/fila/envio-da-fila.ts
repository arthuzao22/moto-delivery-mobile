import { BASE_DA_API, fetchDaApi, VERSAO_DO_APP } from '@/api/cliente';
import { paraErroDaApi, type ErroDaApi } from '@/api/erro-da-api';
import { guardar, pendentes, remover, type NovaAcao } from './armazem-da-fila';
import { dependentes, desfechoDo, type AcaoNaFila } from './regras';

/** O que a tela mostra da fila: o selo "aguardando sinal" e o último conflito. */
export interface EstadoDaFila {
  readonly pendentes: number;
  readonly conflito: { readonly descricao: string; readonly mensagem: string } | null;
}

let estado: EstadoDaFila = { pendentes: 0, conflito: null };
const ouvintes = new Set<() => void>();

function publicar(mudanca: Partial<EstadoDaFila>): void {
  estado = { ...estado, ...mudanca };
  ouvintes.forEach((ouvinte) => ouvinte());
}

export function lerEstado(): EstadoDaFila {
  return estado;
}

export function ouvirFila(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

export function dispensarConflito(): void {
  publicar({ conflito: null });
}

type Resultado = { readonly status: number | null; readonly corpo: unknown };

async function enviar(acao: AcaoNaFila): Promise<Resultado> {
  const requisicao = new Request(`${BASE_DA_API ?? ''}${acao.caminho}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': acao.chave,
      'X-App-Version': VERSAO_DO_APP,
    },
    body: acao.corpo,
  });
  try {
    const resposta = await fetchDaApi(requisicao);
    return { status: resposta.status, corpo: await resposta.json().catch(() => null) };
  } catch {
    return { status: null, corpo: null };
  }
}

/** Desfecho de cada ação nesta rodada: quem enfileirou espera pelo dela. */
const desfechos = new Map<number, { concluida: true } | { erro: ErroDaApi }>();

/** Uma ação: concluída ou em conflito sai da fila; sem sinal, devolve false e a rodada para. */
async function processar(acao: AcaoNaFila, fila: readonly AcaoNaFila[]): Promise<boolean> {
  const { status, corpo } = await enviar(acao);
  const desfecho = desfechoDo(status);
  if (desfecho === 'tentar_depois') return false;
  if (desfecho === 'concluida') {
    desfechos.set(acao.id, { concluida: true });
    await remover([acao.id]);
    return true;
  }
  const erro = paraErroDaApi(status ?? 0, corpo);
  const derrubadas = dependentes(fila, acao);
  [acao, ...derrubadas].forEach((item) => desfechos.set(item.id, { erro }));
  await remover([acao.id, ...derrubadas.map((item) => item.id)]);
  publicar({ conflito: { descricao: acao.descricao, mensagem: erro.message } });
  return true;
}

/** Relê a fila a cada passo: o que for tocado durante a rodada entra nela, na ordem. */
async function rodada(): Promise<void> {
  for (;;) {
    const fila = await pendentes();
    const proxima = fila[0];
    if (proxima === undefined || !(await processar(proxima, fila))) return;
  }
}

let emAndamento: Promise<void> | null = null;

/** Esvazia a fila na ordem, uma rodada por vez. Chamado ao enfileirar, ao voltar o sinal e ao abrir. */
export async function enviarFila(): Promise<void> {
  emAndamento ??= rodada().finally(() => {
    emAndamento = null;
  });
  await emAndamento;
  publicar({ pendentes: (await pendentes()).length });
}

/**
 * Guarda a ação (com a chave e a hora do toque) e tenta enviar. "pendente": ficou esperando o
 * sinal, e a tela avança de forma otimista. Conflito vira o erro da API, como numa chamada direta.
 */
export async function enfileirar(acao: NovaAcao): Promise<'enviada' | 'pendente'> {
  const id = await guardar(acao);
  publicar({ pendentes: estado.pendentes + 1 });
  await enviarFila();
  const desfecho = desfechos.get(id);
  desfechos.delete(id);
  if (desfecho === undefined) return 'pendente';
  if ('erro' in desfecho) throw desfecho.erro;
  return 'enviada';
}
