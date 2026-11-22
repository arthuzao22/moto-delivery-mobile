import { describe, expect, it } from 'vitest';
import { linkDoDiscador, linkDoWhatsapp, linksDeNavegacao } from '../navegacao';

describe('navegação e contato', () => {
  it('usa a coordenada quando existe e mostra o Apple Maps só no iPhone', () => {
    const destino = { endereco: 'Rua A, 10', coordenada: { lat: -19.9, lng: -43.9 } };
    expect(linksDeNavegacao(destino, 'android').map((link) => link.url)).toEqual([
      'https://waze.com/ul?ll=-19.9,-43.9&navigate=yes',
      'https://www.google.com/maps/dir/?api=1&destination=-19.9,-43.9',
    ]);
    expect(linksDeNavegacao(destino, 'ios').at(-1)).toEqual({
      app: 'Apple Maps',
      url: 'https://maps.apple.com/?daddr=-19.9,-43.9',
    });
  });

  it('sem coordenada, navega pelo endereço em texto', () => {
    const [waze] = linksDeNavegacao({ endereco: 'Rua A, 10', coordenada: null }, 'android');
    expect(waze?.url).toBe('https://waze.com/ul?q=Rua%20A%2C%2010&navigate=yes');
  });

  it('WhatsApp com o 55 e discador só com dígitos', () => {
    expect(linkDoWhatsapp('(31) 99999-8888')).toBe('https://wa.me/5531999998888');
    expect(linkDoWhatsapp('5531999998888')).toBe('https://wa.me/5531999998888');
    expect(linkDoDiscador('(31) 99999-8888')).toBe('tel:31999998888');
  });
});
