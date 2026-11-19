import type { ConfigContext, ExpoConfig } from 'expo/config';

/**
 * Uma configuração, três variantes (o `APP_VARIANT` vem do perfil do `eas.json`):
 * - development: build de desenvolvimento, fala com a API da máquina pela rede local (HTTP);
 * - preview: APK/ad hoc do piloto, contra a homologação com HTTPS;
 * - production: lojas.
 * Cada variante tem identificador próprio para as três conviverem no mesmo aparelho.
 */
type Variante = 'development' | 'preview' | 'production';

const VARIANTES: readonly Variante[] = ['development', 'preview', 'production'];

function varianteAtual(): Variante {
  const valor = process.env.APP_VARIANT;
  return VARIANTES.find((variante) => variante === valor) ?? 'development';
}

/** Não dá para trocar depois de publicar nas lojas (documento 05 §4.1). */
const IDENTIFICADOR = 'tec.zanart.motodelivery';
const NOME = 'Moto Delivery';
const PRETO = '#0A0A0A';

const SUFIXOS: Readonly<Record<Variante, { id: string; nome: string }>> = {
  development: { id: '.dev', nome: ' (dev)' },
  preview: { id: '.preview', nome: ' (teste)' },
  production: { id: '', nome: '' },
};

/** Só o build de desenvolvimento fala HTTP com `192.168.x.x`; os demais usam HTTPS. */
function redeLocal(variante: Variante): { android: object; ios: Record<string, unknown> } {
  if (variante !== 'development') return { android: {}, ios: {} };
  return {
    android: { usesCleartextTraffic: true },
    ios: {
      NSAppTransportSecurity: { NSAllowsLocalNetworking: true },
      NSLocalNetworkUsageDescription: 'Para falar com a API na sua máquina durante o desenvolvimento.',
    },
  };
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const variante = varianteAtual();
  const sufixo = SUFIXOS[variante];
  const rede = redeLocal(variante);
  return {
    ...config,
    name: `${NOME}${sufixo.nome}`,
    slug: 'moto-delivery-mobile',
    scheme: 'motodelivery',
    /** Vai no X-App-Version: abaixo do APP_VERSAO_MINIMA da API (hoje 1.0.0), tudo dá 426. */
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    backgroundColor: PRETO,
    runtimeVersion: { policy: 'appVersion' },
    ios: {
      bundleIdentifier: `${IDENTIFICADOR}${sufixo.id}`,
      supportsTablet: false,
      infoPlist: rede.ios,
    },
    android: {
      package: `${IDENTIFICADOR}${sufixo.id}`,
      adaptiveIcon: {
        backgroundColor: PRETO,
        foregroundImage: './assets/android-icon-foreground.png',
        backgroundImage: './assets/android-icon-background.png',
        monochromeImage: './assets/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
    },
    plugins: [
      'expo-router',
      'expo-font',
      'expo-secure-store',
      [
        'expo-splash-screen',
        { image: './assets/splash-icon.png', imageWidth: 160, backgroundColor: PRETO, resizeMode: 'contain' },
      ],
      ['expo-build-properties', { android: rede.android }],
    ],
    experiments: { typedRoutes: true },
    extra: { variante },
  };
};
