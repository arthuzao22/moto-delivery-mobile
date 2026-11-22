export interface Destino {
  readonly endereco: string;
  readonly coordenada: { readonly lat: number; readonly lng: number } | null;
}

export interface LinkDeNavegacao {
  readonly app: 'Waze' | 'Google Maps' | 'Apple Maps';
  readonly url: string;
}

/**
 * Links que abrem o app de navegação quando instalado e o navegador quando não (documento 05 §4.5).
 * Pela coordenada quando a API tem; pelo endereço em texto, se não. Apple Maps só no iPhone.
 */
export function linksDeNavegacao(destino: Destino, plataforma: 'ios' | 'android'): LinkDeNavegacao[] {
  const { coordenada } = destino;
  const texto = encodeURIComponent(destino.endereco);
  const ponto = coordenada === null ? null : `${coordenada.lat},${coordenada.lng}`;
  const links: LinkDeNavegacao[] = [
    {
      app: 'Waze',
      url:
        ponto === null
          ? `https://waze.com/ul?q=${texto}&navigate=yes`
          : `https://waze.com/ul?ll=${ponto}&navigate=yes`,
    },
    {
      app: 'Google Maps',
      url: `https://www.google.com/maps/dir/?api=1&destination=${ponto ?? texto}`,
    },
  ];
  if (plataforma === 'ios') {
    links.push({ app: 'Apple Maps', url: `https://maps.apple.com/?daddr=${ponto ?? texto}` });
  }
  return links;
}

/** Só dígitos, com o 55 do Brasil para o WhatsApp quando o número vem sem código do país. */
export function linkDoWhatsapp(telefone: string): string {
  const digitos = telefone.replace(/\D/g, '');
  const comPais = digitos.startsWith('55') && digitos.length > 11 ? digitos : `55${digitos}`;
  return `https://wa.me/${comPais}`;
}

export function linkDoDiscador(telefone: string): string {
  return `tel:${telefone.replace(/[^\d+]/g, '')}`;
}
