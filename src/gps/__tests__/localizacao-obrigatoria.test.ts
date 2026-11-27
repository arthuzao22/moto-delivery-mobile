import { describe, expect, it } from 'vitest';
import { bloqueioPara } from '../localizacao-obrigatoria';

const android = { android: true, podePerguntar: true };
const ios = { android: false, podePerguntar: true };

describe('bloqueioPara', () => {
  it('libera o app quando a localização está ok', () => {
    expect(bloqueioPara('ok', android)).toBeNull();
  });

  it('GPS desligado: no Android abre o diálogo do sistema; no iOS, os Ajustes', () => {
    expect(bloqueioPara('gps_desligado', android)?.acao).toBe('ligar_gps');
    expect(bloqueioPara('gps_desligado', ios)?.acao).toBe('abrir_ajustes');
  });

  it('permissão negada: pede de novo enquanto o sistema deixa; depois, só pelos Ajustes', () => {
    expect(bloqueioPara('negada', android)?.acao).toBe('pedir_permissao');
    expect(bloqueioPara('negada', { android: true, podePerguntar: false })?.acao).toBe('abrir_ajustes');
  });

  it('aproximada e sem "o tempo todo" só se resolvem nos Ajustes', () => {
    expect(bloqueioPara('aproximada', android)?.acao).toBe('abrir_ajustes');
    expect(bloqueioPara('sem_segundo_plano', android)?.acao).toBe('abrir_ajustes');
  });

  it('todo bloqueio tem título, texto e botão', () => {
    for (const situacao of ['gps_desligado', 'negada', 'aproximada', 'sem_segundo_plano'] as const) {
      const bloqueio = bloqueioPara(situacao, android);
      expect(bloqueio?.titulo).toBeTruthy();
      expect(bloqueio?.texto).toBeTruthy();
      expect(bloqueio?.botao).toBeTruthy();
    }
  });
});
