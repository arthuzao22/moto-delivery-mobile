import { describe, expect, it } from 'vitest';
import { paradaAtual, progresso } from '../parada-atual';

const parada = (entregaId: string, status: string, ordem: number | null) => ({ entregaId, status, ordem });

describe('parada da vez', () => {
  it('a que já está em atendimento vem primeiro, mesmo fora da ordem', () => {
    const paradas = [parada('a', 'coletada', 1), parada('b', 'no_local_entrega', 2)];
    expect(paradaAtual(paradas)?.entregaId).toBe('b');
  });

  it('sem nenhuma em atendimento, a próxima coletada pela ordem', () => {
    const paradas = [parada('c', 'coletada', 3), parada('a', 'entregue', 1), parada('b', 'coletada', 2)];
    expect(paradaAtual(paradas)?.entregaId).toBe('b');
  });

  it('com todas feitas, não há parada da vez', () => {
    expect(paradaAtual([parada('a', 'entregue', 1), parada('b', 'devolvida', 2)])).toBeNull();
  });

  it('conta o progresso sem as canceladas', () => {
    const paradas = [parada('a', 'entregue', 1), parada('b', 'a_caminho', 2), parada('c', 'cancelada', 3)];
    expect(progresso(paradas)).toEqual({ feitas: 1, total: 2 });
  });
});
