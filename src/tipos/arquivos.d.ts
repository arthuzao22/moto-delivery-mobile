/** Arquivos que o Metro empacota como asset: o import devolve o id numérico do asset. */
declare module '*.wav' {
  const asset: number;
  export default asset;
}
