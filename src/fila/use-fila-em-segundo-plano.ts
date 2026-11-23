import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { enviarFila, lerEstado, ouvirFila } from './envio-da-fila';

/**
 * A fila também é enviada sem ninguém esperando (sinal voltando, app abrindo). Quando ela anda
 * (ações enviadas ou recusadas), a previsão otimista da tela deixa de valer: o Início é lido de novo
 * na API. Sem isso, a tela ficaria presa ao que o app previu offline.
 */
export function useFilaEmSegundoPlano(): void {
  const clienteDeConsultas = useQueryClient();

  useEffect(() => {
    let anterior = lerEstado();
    const pararDeOuvir = ouvirFila(() => {
      const atual = lerEstado();
      const andou =
        atual.pendentes < anterior.pendentes ||
        (atual.conflito !== null && atual.conflito !== anterior.conflito);
      anterior = atual;
      if (andou) void clienteDeConsultas.invalidateQueries({ queryKey: ['inicio'] });
    });
    // Ao abrir o app logado, manda o que ficou na fila da última vez.
    void enviarFila().catch(() => undefined);
    return pararDeOuvir;
  }, [clienteDeConsultas]);
}
