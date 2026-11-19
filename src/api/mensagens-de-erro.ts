/**
 * Texto curto do erro pelo `codigo` estável da API, para quem está na moto (documento 04 §2.2).
 * A `mensagem` da API é a reserva para os códigos que ainda não estão aqui.
 */
const MENSAGENS: Readonly<Record<string, string>> = {
  // Conexão e versão
  sem_conexao: 'Sem sinal com o servidor. Confira sua internet.',
  app_desatualizado: 'Atualize o app para continuar.',
  erro_interno: 'Erro no servidor. Tente de novo em instantes.',
  erro_inesperado: 'Não deu certo. Tente de novo.',
  // Acesso
  credenciais_invalidas: 'E-mail ou senha incorretos.',
  conta_bloqueada: 'Muitas tentativas. Tente de novo em 15 minutos.',
  limite_excedido: 'Muitas tentativas. Aguarde um pouco.',
  nao_autenticado: 'Sua sessão terminou. Entre de novo.',
  sessao_invalida: 'Sua sessão terminou. Entre de novo.',
  token_expirado: 'Sua sessão terminou. Entre de novo.',
  refresh_invalido: 'Sua sessão terminou. Entre de novo.',
  refresh_reutilizado: 'Sua sessão foi encerrada por segurança. Entre de novo.',
  usuario_inativo: 'Este acesso está desativado. Fale com a central.',
  sem_vinculo_motoboy: 'Este acesso não é de motoboy. Fale com a central.',
  sem_permissao: 'Você não pode fazer isso.',
  // Estado e repetição
  validacao: 'Confira os dados e tente de novo.',
  transicao_invalida: 'Isso não vale mais agora. A tela foi atualizada.',
  estado_alterado: 'Algo mudou agora há pouco. A tela foi atualizada.',
  requisicao_em_andamento: 'Ainda enviando a ação anterior.',
  idempotencia_conflito: 'Esta ação já foi enviada.',
  motivo_obrigatorio: 'Informe o motivo.',
  // Turno e oferta
  turno_ja_aberto: 'Seu turno já está aberto.',
  turno_fechado: 'Seu turno está fechado.',
  turno_ja_encerrado: 'Seu turno já foi encerrado.',
  rota_em_andamento: 'Termine a rota antes de encerrar o turno.',
  oferta_indisponivel: 'Outro motoboy aceitou antes.',
  motoboy_ocupado: 'Você já está em uma rota.',
  motoboy_indisponivel: 'Fique disponível para receber ofertas.',
  // Coleta e parada
  codigo_coleta_obrigatorio: 'Informe o código de coleta.',
  codigo_coleta_invalido: 'Código de coleta errado.',
  parada_em_andamento: 'Termine a parada atual primeiro.',
  longe_do_destino: 'Você ainda está longe do endereço.',
  recebimento_pendente: 'Registre o pagamento primeiro.',
  recebimento_ja_registrado: 'O pagamento já foi registrado.',
  comprovante_pendente: 'Envie o comprovante primeiro.',
  codigo_cliente_invalido: 'Código do cliente errado.',
  codigo_devolucao_invalido: 'Código de devolução errado.',
  codigo_devolucao_nao_gerado: 'Peça ao restaurante para gerar o código.',
  // Arquivos
  arquivo_nao_enviado: 'A foto não terminou de enviar. Tente de novo.',
  arquivo_nao_confirmado: 'A foto não terminou de enviar. Tente de novo.',
};

export function mensagemDoErro(codigo: string, reserva: string): string {
  return MENSAGENS[codigo] ?? reserva;
}
