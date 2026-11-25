import { describe, expect, it } from 'vitest';
import { ErroDaApi, paraErroDaApi } from '../erro-da-api';
import { dadosDe } from '../executar';
import { mensagemDaDevolucao, mensagemDoErro } from '../mensagens-de-erro';

const resposta = (status: number): Response => new Response(null, { status });

describe('erros da API', () => {
  it('usa o texto curto do app pelo código, com a mensagem da API de reserva', () => {
    const conhecido = paraErroDaApi(422, {
      erro: { codigo: 'recebimento_pendente', mensagem: 'x', requestId: 'r1' },
    });
    expect(conhecido.message).toBe('Registre o pagamento primeiro.');
    expect(conhecido.requestId).toBe('r1');
    const novo = paraErroDaApi(422, { erro: { codigo: 'codigo_novo', mensagem: 'Texto da API' } });
    expect(novo.message).toBe('Texto da API');
  });

  it('426 é app desatualizado', () => {
    const erro = paraErroDaApi(426, { erro: { codigo: 'app_desatualizado', mensagem: 'x' } });
    expect(erro.appDesatualizado).toBe(true);
    expect(erro.message).toBe('Atualize o app para continuar.');
  });

  it('dadosDe desembrulha `dados`, e falha de rede vira sem_conexao', async () => {
    const ok = Promise.resolve({ data: { dados: { status: 'ok' } }, response: resposta(200) });
    await expect(dadosDe(ok)).resolves.toEqual({ status: 'ok' });
    const semRede = Promise.reject(new TypeError('Network request failed'));
    await expect(dadosDe(semRede)).rejects.toMatchObject({ codigo: 'sem_conexao' });
    const recusada = Promise.resolve({
      error: { erro: { codigo: 'turno_fechado', mensagem: 'x' } },
      response: resposta(422),
    });
    await expect(dadosDe(recusada)).rejects.toBeInstanceOf(ErroDaApi);
  });
});

describe('mensagens da devolução e da correção do pagamento', () => {
  it('código de devolução errado diz quantas tentativas restam', () => {
    expect(mensagemDaDevolucao('codigo_devolucao_invalido', { tentativasRestantes: 4 }, 'x')).toBe(
      'Código incorreto. Restam 4 tentativas.',
    );
    expect(mensagemDaDevolucao('codigo_devolucao_invalido', { tentativasRestantes: 1 }, 'x')).toBe(
      'Código incorreto. Resta 1 tentativa.',
    );
    expect(mensagemDaDevolucao('codigo_devolucao_invalido', {}, 'x')).toBe('Código de devolução errado.');
  });

  it('bloqueio e erros da correção têm texto do app', () => {
    expect(mensagemDaDevolucao('codigo_devolucao_bloqueado', {}, 'x')).toBe(
      'Código bloqueado após 5 tentativas. Peça ao restaurante um novo código.',
    );
    expect(mensagemDoErro('parada_concluida', 'x')).not.toBe('x');
    expect(mensagemDoErro('recebimento_nao_registrado', 'x')).not.toBe('x');
  });
});
