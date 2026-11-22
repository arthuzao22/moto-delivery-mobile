import { describe, expect, it, vi } from 'vitest';
import { Renovador } from '../renovador';
import type { Tokens } from '../tokens';

const tokens = (sufixo: string): Tokens => ({
  accessToken: `acesso-${sufixo}`,
  refreshToken: `refresh-${sufixo}`,
  acessoExpiraEm: '2026-11-22T12:00:00.000Z',
  organizacaoId: 'org',
  motoboyId: 'm1',
});

describe('Renovador', () => {
  it('chamadas ao mesmo tempo dividem uma única renovação', async () => {
    let liberar: (valor: { status: number; tokens: Tokens }) => void = () => undefined;
    const pedir = vi.fn(async () => new Promise<{ status: number; tokens: Tokens }>((r) => (liberar = r)));
    const guardar = vi.fn(async () => undefined);
    const renovador = new Renovador({ ler: async () => tokens('a'), guardar, pedir });

    const [primeira, segunda] = [renovador.renovar(), renovador.renovar()];
    await Promise.resolve();
    await Promise.resolve();
    liberar({ status: 200, tokens: tokens('b') });
    expect(await primeira).toEqual({ tipo: 'renovada', tokens: tokens('b') });
    expect(await segunda).toEqual({ tipo: 'renovada', tokens: tokens('b') });
    expect(pedir).toHaveBeenCalledTimes(1);
    expect(pedir).toHaveBeenCalledWith('refresh-a');
    expect(guardar).toHaveBeenCalledTimes(1);
  });

  it('401 no refresh perde a sessão; falha de rede, não', async () => {
    const recusado = new Renovador({
      ler: async () => tokens('a'),
      guardar: async () => undefined,
      pedir: async () => ({ status: 401, tokens: null }),
    });
    expect(await recusado.renovar()).toEqual({ tipo: 'perdida' });
    const semRede = new Renovador({
      ler: async () => tokens('a'),
      guardar: async () => undefined,
      pedir: async () => Promise.reject(new TypeError('Network request failed')),
    });
    expect(await semRede.renovar()).toEqual({ tipo: 'sem_rede' });
  });

  it('sem tokens guardados não há o que renovar', async () => {
    const pedir = vi.fn();
    const renovador = new Renovador({ ler: async () => null, guardar: async () => undefined, pedir });
    expect(await renovador.renovar()).toEqual({ tipo: 'perdida' });
    expect(pedir).not.toHaveBeenCalled();
  });
});
