import { describe, expect, it } from 'vitest';
import type { Inicio } from '@/api/turno';
import { avancar } from '../avanco-otimista';
import { dependentes, desfechoDo, type AcaoNaFila } from '../regras';

type Parada = NonNullable<Inicio['rotaAtiva']>['paradas'][number];

const acao = (id: number, grupo: string): AcaoNaFila => ({
  id,
  chave: `k${id}`,
  caminho: '/app/x',
  corpo: '{}',
  grupo,
  descricao: 'x',
});

function parada(entregaId: string, status: string, ordem: number, aReceber = false): Parada {
  return {
    entregaId,
    codigo: `E-${entregaId}`,
    status,
    ordem,
    cliente: 'Cliente',
    destino: 'Rua A',
    coordenadaColeta: null,
    coordenadaDestino: null,
    telefone: null,
    coleta: { endereco: 'Restaurante', instrucoes: null },
    complemento: null,
    referencia: null,
    observacoes: null,
    pagamento: {
      forma: aReceber ? 'dinheiro' : 'pago_online',
      valorACobrar: aReceber ? '10.00' : '0.00',
      trocoPara: null,
      trocoNecessario: null,
      maquininhaDe: null,
      recebimentoStatus: aReceber ? 'a_receber' : 'nao_se_aplica',
    },
    comprovante: { exigido: 'nenhum', tipo: null, pendente: false },
    ausencia: null,
    acoesPermitidas: [],
  };
}

function inicio(
  paradas: Parada[],
  status: NonNullable<Inicio['rotaAtiva']>['status'] = 'em_entrega',
): Inicio {
  return {
    turno: {
      id: 't',
      motoboyId: 'm',
      status: 'aberto',
      abertoEm: '2026-11-22T10:00:00.000Z',
      encerradoEm: null,
      caixaStatus: 'aberto',
      competencia: '2026-11-22',
      disponibilidade: 'ocupado',
    },
    ofertas: [],
    rotaAtiva: {
      id: 'r',
      codigo: 'R-1',
      status,
      motoboyId: 'm',
      modoOferta: 'manual',
      motivoCancelamento: null,
      exigeCodigoColeta: false,
      criadoEm: '2026-11-22T10:00:00.000Z',
      acoesPermitidas: [],
      paradas,
    },
  };
}

const daParada = (dados: Inicio, id: string): Parada | undefined =>
  dados.rotaAtiva?.paradas.find((item) => item.entregaId === id);

describe('desfecho de cada envio', () => {
  it('2xx sai da fila; sem rede, 401, 429 e 5xx tentam depois; 4xx é conflito', () => {
    expect(desfechoDo(200)).toBe('concluida');
    expect(desfechoDo(201)).toBe('concluida');
    expect([null, 401, 429, 500, 503].map(desfechoDo)).toEqual(Array(5).fill('tentar_depois'));
    expect([400, 403, 404, 409, 422].map(desfechoDo)).toEqual(Array(5).fill('conflito'));
  });

  it('um conflito derruba só as ações seguintes da mesma rota', () => {
    const fila = [acao(1, 'r1'), acao(2, 'r1'), acao(3, 'turno'), acao(4, 'r1')];
    expect(dependentes(fila, acao(2, 'r1')).map((item) => item.id)).toEqual([4]);
  });
});

describe('avanço otimista sem sinal', () => {
  it('cheguei na porta com dinheiro a receber pede o pagamento antes de entregar', () => {
    const depois = avancar(inicio([parada('a', 'a_caminho', 1, true)]), { tipo: 'cheguei', entregaId: 'a' });
    expect(daParada(depois, 'a')?.status).toBe('no_local_entrega');
    expect(daParada(depois, 'a')?.acoesPermitidas).toContain('recebimentos');
    expect(daParada(depois, 'a')?.acoesPermitidas).not.toContain('entregar');
    const paga = avancar(depois, { tipo: 'recebimento', entregaId: 'a' });
    expect(daParada(paga, 'a')?.acoesPermitidas).toContain('entregar');
  });

  it('entregar passa para a próxima parada coletada, pela ordem', () => {
    const dados = inicio([
      parada('a', 'no_local_entrega', 1),
      parada('c', 'coletada', 3),
      parada('b', 'coletada', 2),
    ]);
    const depois = avancar(dados, { tipo: 'entregar', entregaId: 'a' });
    expect(daParada(depois, 'a')?.status).toBe('entregue');
    expect(daParada(depois, 'b')?.status).toBe('a_caminho');
    expect(daParada(depois, 'c')?.status).toBe('coletada');
  });

  it('coletar deixa de fora o que não veio e começa pela primeira', () => {
    const dados = inicio([parada('a', 'no_local_coleta', 1), parada('b', 'no_local_coleta', 2)], 'em_coleta');
    const depois = avancar(dados, { tipo: 'coletar', entregaIds: ['b'] });
    expect(depois.rotaAtiva?.status).toBe('em_entrega');
    expect(depois.rotaAtiva?.paradas.map((item) => [item.entregaId, item.status])).toEqual([
      ['b', 'a_caminho'],
    ]);
  });

  it('a pausa muda só a disponibilidade do turno', () => {
    const depois = avancar(inicio([]), { tipo: 'disponibilidade', valor: 'pausa' });
    expect(depois.turno?.disponibilidade).toBe('pausa');
  });
});
