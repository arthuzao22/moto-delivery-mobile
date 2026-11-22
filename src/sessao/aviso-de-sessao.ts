type Ouvinte = () => void;

const ouvintes = new Set<Ouvinte>();

/** O cliente da API avisa aqui quando o refresh é recusado; o provedor da sessão volta ao login. */
export function avisarSessaoPerdida(): void {
  ouvintes.forEach((ouvinte) => ouvinte());
}

export function ouvirSessaoPerdida(ouvinte: Ouvinte): () => void {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}
