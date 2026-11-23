// JavaScript puro de propósito: o EAS CLI lê este arquivo com o próprio leitor, que em Node 20
// não entende TypeScript (vem com o TypeScript 7, sem a função de conversão que ele usa).

/**
 * Uma configuração, três variantes (o `APP_VARIANT` vem do perfil do `eas.json`):
 * - development: build de desenvolvimento, fala com a API da máquina pela rede local (HTTP);
 * - preview: APK/ad hoc do piloto, contra a homologação com HTTPS;
 * - production: lojas.
 * Cada variante tem identificador próprio para as três conviverem no mesmo aparelho.
 * @typedef {'development' | 'preview' | 'production'} Variante
 */

/** @type {readonly Variante[]} */
const VARIANTES = ['development', 'preview', 'production'];

/** @returns {Variante} */
function varianteAtual() {
  const valor = process.env.APP_VARIANT;
  return VARIANTES.find((variante) => variante === valor) ?? 'development';
}

/** Não dá para trocar depois de publicar nas lojas (documento 05 §4.1). */
const IDENTIFICADOR = 'tec.zanart.motodelivery';
const NOME = 'Moto Delivery';
const PRETO = '#0A0A0A';

/** @type {Readonly<Record<Variante, { id: string; nome: string }>>} */
const SUFIXOS = {
  development: { id: '.dev', nome: ' (dev)' },
  preview: { id: '.preview', nome: ' (teste)' },
  production: { id: '', nome: '' },
};

/**
 * Só o build de desenvolvimento fala HTTP com `192.168.x.x`; os demais usam HTTPS.
 * @param {Variante} variante
 */
function redeLocal(variante) {
  if (variante !== 'development') return { android: {}, ios: {} };
  return {
    android: { usesCleartextTraffic: true },
    ios: {
      NSAppTransportSecurity: { NSAllowsLocalNetworking: true },
      NSLocalNetworkUsageDescription: 'Para falar com a API na sua máquina durante o desenvolvimento.',
    },
  };
}

/**
 * @param {import('expo/config').ConfigContext} contexto
 * @returns {import('expo/config').ExpoConfig}
 */
module.exports = ({ config }) => {
  const variante = varianteAtual();
  const sufixo = SUFIXOS[variante];
  const rede = redeLocal(variante);
  return {
    ...config,
    name: `${NOME}${sufixo.nome}`,
    /** Conta da Expo dona do projeto no EAS. */
    owner: 'arthurreiss-zanart',
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
      // O som da oferta vai no app para o push tocá-lo (canal "ofertas" no Android, sound no iOS).
      ['expo-notifications', { sounds: ['./assets/sons/oferta.wav'] }],
      [
        // GPS do turno com o app em segundo plano (documento 05 §4.2). Os textos dizem o porquê,
        // como a revisão das lojas exige (documento 02 §6).
        'expo-location',
        {
          locationWhenInUsePermission: 'Para a central ver onde você está durante o turno e as entregas.',
          locationAlwaysAndWhenInUsePermission:
            'Para a central ver onde você está durante o turno, mesmo com a tela apagada. Só enquanto o turno estiver aberto.',
          isIosBackgroundLocationEnabled: true,
          isAndroidBackgroundLocationEnabled: true,
          isAndroidForegroundServiceEnabled: true,
        },
      ],
      [
        'expo-splash-screen',
        { image: './assets/splash-icon.png', imageWidth: 160, backgroundColor: PRETO, resizeMode: 'contain' },
      ],
      ['expo-build-properties', { android: rede.android }],
    ],
    experiments: { typedRoutes: true },
    /** O EAS não grava em configuração dinâmica: o id do projeto fica aqui. */
    extra: { variante, eas: { projectId: '95136fd4-f517-4db2-94a6-f3fa78585879' } },
  };
};
