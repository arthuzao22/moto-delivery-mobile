/**
 * Dinheiro é texto (documento 04 §2.8): a API manda e recebe string decimal ("25.90"). O app só
 * formata e monta a string do que foi digitado; nunca soma nem converte para número.
 */
const DECIMAL_DA_API = /^(-?)(\d+)\.(\d{2})$/;
const DIGITADO = /^\d{1,7}(,\d{0,2})?$/;
const CASAS = 2;

/** "1234.50" → "R$ 1.234,50"; "-5.00" → "-R$ 5,00". Valor fora do formato aparece como veio. */
export function formatarReais(decimal: string): string {
  const partes = DECIMAL_DA_API.exec(decimal);
  if (partes === null) return `R$ ${decimal}`;
  const [, sinal = '', inteiros = '0', centavos = '00'] = partes;
  const comPontos = inteiros.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${sinal}R$ ${comPontos},${centavos}`;
}

/** O que o motoboy digitou ("25", "25,9", "25,90") → "25.90" para a API; null se não for um valor. */
export function decimalDigitado(texto: string): string | null {
  const limpo = texto.trim();
  if (!DIGITADO.test(limpo)) return null;
  const [inteiros = '0', centavos = ''] = limpo.split(',');
  return `${String(Number(inteiros))}.${centavos.padEnd(CASAS, '0')}`;
}

/** "25.90" → "25,90", para preencher o campo com o valor previsto. */
export function paraDigitar(decimal: string): string {
  return decimal.replace('.', ',');
}
