import * as Location from 'expo-location';

/** Uma posição de até 30 s vale para o toque: pedir uma nova atrasaria o botão. */
const IDADE_MAXIMA_MS = 30_000;
const ESPERA_MAXIMA_MS = 4000;

export interface Posicao {
  readonly lat: number;
  readonly lng: number;
}

function deLocal(local: Location.LocationObject | null): Posicao | null {
  return local === null ? null : { lat: local.coords.latitude, lng: local.coords.longitude };
}

/**
 * A posição do momento do toque, que as ações de campo mandam (o "cheguei" confere a distância).
 * Sem permissão ou sem sinal de GPS em 4 s, a ação segue sem posição: nunca trava o motoboy.
 */
export async function posicaoAtual(): Promise<Posicao | null> {
  const { granted } = await Location.getForegroundPermissionsAsync();
  if (!granted) return null;
  const recente = await Location.getLastKnownPositionAsync({ maxAge: IDADE_MAXIMA_MS }).catch(() => null);
  if (recente !== null) return deLocal(recente);
  const limite = new Promise<null>((resolver) => setTimeout(() => resolver(null), ESPERA_MAXIMA_MS));
  const nova = Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High }).catch(() => null);
  return deLocal(await Promise.race([nova, limite]));
}
