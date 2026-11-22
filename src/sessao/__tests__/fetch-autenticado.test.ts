import { describe, expect, it, vi } from 'vitest';
import { criarFetchAutenticado, type DependenciasDoFetch } from '../fetch-autenticado';
import type { Renovacao } from '../renovador';
import type { Tokens } from '../tokens';

const AGORA = new Date('2026-11-22T12:00:00.000Z');
const API = 'http://192.168.0.2:3333/api/v1';

const tokens = (acesso: string, expiraEm = '2026-11-22T12:15:00.000Z'): Tokens => ({
  accessToken: acesso,
  refreshToken: `refresh-${acesso}`,
  acessoExpiraEm: expiraEm,
  organizacaoId: 'org',
  motoboyId: 'm1',
});

function montar(respostas: number[], deps: Partial<DependenciasDoFetch> = {}) {
  const enviados: Request[] = [];
  const fetch = vi.fn(async (requisicao: Request) => {
    enviados.push(requisicao);
    return new Response(null, { status: respostas.shift() ?? 200 });
  });
  const aoPerderSessao = vi.fn();
  const chamar = criarFetchAutenticado({
    fetch,
    ler: async () => tokens('a'),
    renovar: async (): Promise<Renovacao> => ({ tipo: 'renovada', tokens: tokens('b') }),
    aoPerderSessao,
    agora: () => AGORA,
    ...deps,
  });
  return { chamar, enviados, aoPerderSessao };
}

const bearer = (requisicao: Request | undefined): string | null =>
  requisicao?.headers.get('Authorization') ?? null;

describe('fetch autenticado', () => {
  it('põe o Bearer do token guardado', async () => {
    const { chamar, enviados } = montar([200]);
    await chamar(new Request(`${API}/auth/me`));
    expect(bearer(enviados[0])).toBe('Bearer a');
  });

  it('no 401, renova uma vez e repete a chamada com o token novo e o mesmo corpo', async () => {
    const { chamar, enviados } = montar([401, 200]);
    const resposta = await chamar(new Request(`${API}/app/dispositivo`, { method: 'POST', body: '{"x":1}' }));
    expect(resposta.status).toBe(200);
    expect(enviados.map(bearer)).toEqual(['Bearer a', 'Bearer b']);
    expect(await enviados[1]?.text()).toBe('{"x":1}');
  });

  it('refresh recusado avisa que a sessão acabou', async () => {
    const { chamar, aoPerderSessao } = montar([401], { renovar: async () => ({ tipo: 'perdida' }) });
    expect((await chamar(new Request(`${API}/auth/me`))).status).toBe(401);
    expect(aoPerderSessao).toHaveBeenCalledTimes(1);
  });

  it('access vencido renova antes de chamar', async () => {
    const renovar = vi.fn(async (): Promise<Renovacao> => ({ tipo: 'renovada', tokens: tokens('b') }));
    const { chamar, enviados } = montar([200], {
      ler: async () => tokens('a', '2026-11-22T11:59:00.000Z'),
      renovar,
    });
    await chamar(new Request(`${API}/auth/me`));
    expect(renovar).toHaveBeenCalledTimes(1);
    expect(bearer(enviados[0])).toBe('Bearer b');
  });

  it('login e refresh não levam Bearer nem renovam', async () => {
    const renovar = vi.fn();
    const { chamar, enviados } = montar([401], { renovar });
    await chamar(new Request(`${API}/auth/app/login`, { method: 'POST', body: '{}' }));
    expect(bearer(enviados[0])).toBeNull();
    expect(renovar).not.toHaveBeenCalled();
  });
});
