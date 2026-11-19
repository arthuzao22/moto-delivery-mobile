# 03 — Plano de implementação do app mobile

> Depende de: `01-identidade-visual-mobile.md` e `02-telas-e-navegacao-mobile.md`.
> Escrito sem acesso ao código atual do `moto-delivery-mobile`. **Passo 0 é obrigatório:** conferir a estrutura real antes de criar arquivos.

---

## 0. Antes de começar

1. Ler `package.json` e `app.json`/`app.config.ts`: versão do Expo SDK, se já usa **Expo Router**, se o NativeWind já está instalado.
2. Verificar se existe `global.css`, `tailwind.config.js`, `babel.config.js` com o preset do NativeWind e `metro.config.js` com `withNativeWind`.
3. Verificar se o React Native Reusables já foi iniciado (pasta `components/ui/` e `lib/utils.ts` com `cn()`).
4. Verificar se `src/api/schema.d.ts` (tipos gerados do OpenAPI da API) existe.
5. Se o RN Reusables não estiver iniciado, seguir o guia oficial de instalação manual em projeto Expo existente (NativeWind + `@rn-primitives`), sem criar projeto novo por cima do atual.

---

## 1. Os três arquivos-base

| # | Arquivo | Responsabilidade |
| --- | --- | --- |
| 1 | `global.css` | **Tokens** light/dark da Zanart (conteúdo em `01` §2) |
| 2 | `tailwind.config.js` | **Mapeamento** dos tokens para classes (`bg-background`, `text-muted-foreground`, `bg-chrome`…), fontes Inter/JetBrains Mono, raios (12/16), `darkMode: 'class'` |
| 3 | `app/_layout.tsx` | **Base de execução**: carrega fontes antes da splash, aplica tema (claro/escuro/sistema) com persistência, status bar escura, tema do React Navigation sincronizado com os tokens, `SafeAreaProvider`, `GestureHandlerRootView`, `QueryClientProvider`, `PortalHost` (overlays do RN Reusables) |

Arquivos de apoio:

```
lib/
├── theme.ts             NAV_THEME (cores do React Navigation = mesmos tokens), constantes de tamanho
├── use-app-theme.ts     preferência claro/escuro/sistema salva no aparelho (expo-secure-store ou AsyncStorage)
└── utils.ts             cn()
components/
├── ui/                  RN Reusables personalizados (button, text, card, badge, checkbox, ...)
└── app/                 action-bar, slide-to-confirm, offer-sheet, stop-card, stop-progress,
                         money-line, sync-badge, tab-bar, nav-buttons
assets/brand/            símbolo e lockup oficiais (SVG via react-native-svg)
```

### Esqueleto do `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
const cor = (nome) => `hsl(var(--${nome}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: cor('background'),
        foreground: cor('foreground'),
        heading: cor('heading'),
        card: { DEFAULT: cor('card'), foreground: cor('card-foreground') },
        popover: { DEFAULT: cor('popover'), foreground: cor('popover-foreground') },
        primary: { DEFAULT: cor('primary'), foreground: cor('primary-foreground') },
        secondary: { DEFAULT: cor('secondary'), foreground: cor('secondary-foreground') },
        muted: { DEFAULT: cor('muted'), foreground: cor('muted-foreground') },
        accent: { DEFAULT: cor('accent'), foreground: cor('accent-foreground') },
        attention: cor('attention'),
        destructive: cor('destructive'),
        'brand-text': cor('brand-text'),
        border: cor('border'),
        input: cor('input'),
        ring: cor('ring'),
        chrome: { DEFAULT: cor('chrome'), foreground: cor('chrome-foreground'), border: cor('chrome-border') },
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        medium: ['Inter_500Medium'],
        semibold: ['Inter_600SemiBold'],
        bold: ['Inter_700Bold'],
        mono: ['JetBrainsMono_400Regular'],
      },
      borderRadius: { xl: '12px', '2xl': '16px' },
    },
  },
  plugins: [],
};
```

> No React Native, peso de fonte é uma **família** diferente (`Inter_600SemiBold`), não `fontWeight`. Por isso a escala tipográfica fica nas variantes do componente `Text`.

---

## 2. Ordem de implementação

| Etapa | Entrega | Critério de pronto |
| --- | --- | --- |
| 1. Tema | `global.css`, `tailwind.config.js`, fontes, `_layout.tsx` com tema persistido e status bar | App abre no escuro (`#0A0A0A`), troca para claro e lembra depois de fechar |
| 2. Componentes base | RN Reusables: `button text card badge checkbox switch separator skeleton progress avatar alert-dialog` personalizados | Tela interna de catálogo (só em desenvolvimento) nos dois temas, com fonte em 130% |
| 3. Componentes do app | `action-bar`, `slide-to-confirm`, `tab-bar`, `stop-card`, `stop-progress`, `money-line`, `sync-badge`, `nav-buttons` | Cada um com estado normal, desabilitado e carregando |
| 4. Navegação | Tabs + rotas do `02` §1, deep link `motodelivery://` | Push de teste abre a tela certa |
| 5. Início guiado | Tela que troca conforme `GET /app/inicio` | Todos os estados do `02` §2 navegáveis com dados reais de homologação |
| 6. Oferta | `offer-sheet` em modal tela cheia, contagem regressiva, keep-awake | Aceite concorrente mostra "já foi aceita" |
| 7. Execução | Coleta, parada, pagamento (bottom sheet), comprovante (câmera), cliente ausente, retorno | Guards da API refletidos antes do gesto |
| 8. Offline | Fila local de ações com `Idempotency-Key` e `eventoEm`; `sync-badge` | Modo avião no meio da entrega não perde nenhuma ação |

---

## 3. Dependências

| Pacote | Motivo |
| --- | --- |
| `nativewind`, `tailwindcss` (v3, exigido pelo NativeWind v4) | Estilo |
| `@rn-primitives/*`, `class-variance-authority`, `clsx`, `tailwind-merge` | Base do RN Reusables |
| `lucide-react-native`, `react-native-svg` | Ícones e logo |
| `@expo-google-fonts/inter`, `@expo-google-fonts/jetbrains-mono`, `expo-font`, `expo-splash-screen` | Fontes |
| `react-native-reanimated`, `react-native-gesture-handler` | Animações e o deslizar para confirmar |
| `@gorhom/bottom-sheet` | Bottom sheets (pagamento, motivos) — o RN Reusables não traz um |
| `expo-haptics`, `expo-keep-awake`, `expo-status-bar`, `expo-linking` | Vibração, tela acesa na oferta, status bar, Waze/discador |
| `@tanstack/react-query`, `openapi-fetch` | Dados da API (já previstos na documentação técnica) |

**Não instalar**: outra biblioteca de componentes (Tamagui, gluestack, Paper), biblioteca de mapas (navegação é no Waze/Google Maps), biblioteca de animação extra.

---

## 4. Definição de pronto de qualquer tela

- [ ] Testada em Android pequeno (360pt) e iPhone grande (430pt)
- [ ] Testada com fonte do sistema em 130%
- [ ] Dark e light revisados; status bar e tab bar escuras nos dois
- [ ] Uma ação primária, na barra inferior, ≥ 56px; demais ≥ 48px
- [ ] Ação irreversível usa deslizar para confirmar
- [ ] Funciona sem sinal (ação vai para a fila e o fluxo segue)
- [ ] Ações vêm de `acoesPermitidas`; valores vêm prontos da API
- [ ] Só tokens da Zanart; nenhum hex solto, nenhum dado fictício
