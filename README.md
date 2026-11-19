# moto-delivery-mobile

App do motoboy (Android e iOS). Expo SDK 57, Expo Router, TypeScript estrito, NativeWind v4 com os
tokens da Zanart e RN Reusables. Planos em `docs/frontend/` (o 04 diz a ordem; o 05, o que muda por
plataforma).

## Rodar no celular

O app não roda no Expo Go (GPS em segundo plano, som próprio de push e módulos nativos exigem o
build de desenvolvimento). Uma vez por máquina e por conta:

```bash
npm ci
npx eas-cli@latest login
npx eas-cli@latest init                      # liga o projeto à sua conta Expo
npx eas-cli@latest build --profile development --platform android
```

Instale o APK que o EAS gerar. No iPhone, registre o aparelho antes (`eas device:create`, exige a
conta Apple Developer) e use `--platform ios`.

Depois, no dia a dia:

1. Copie `.env.example` para `.env` e ponha o IP da sua máquina na rede local.
2. Suba a API (`npm run dev` em `moto-delivery-api`).
3. `npm start` e abra o app de desenvolvimento no celular, na mesma rede Wi-Fi.

A tela inicial mostra se o celular falou com a API (`GET /saude`).

## Perfis do EAS

| Perfil        | Para quê                 | Rede                                         |
| ------------- | ------------------------ | -------------------------------------------- |
| `development` | Build de desenvolvimento | HTTP liberado só aqui, para a API da máquina |
| `preview`     | APK e _ad hoc_ do piloto | HTTPS (homologação)                          |
| `production`  | Lojas                    | HTTPS                                        |

Cada perfil tem identificador próprio (`tec.zanart.motodelivery.dev`, `.preview` e sem sufixo),
para os três conviverem no mesmo aparelho. O identificador de produção não muda depois de publicar.

Nos perfis `preview` e `production`, defina `EXPO_PUBLIC_API_URL` nas variáveis de ambiente do EAS.

## Comandos

| Comando             | O que faz                                                                             |
| ------------------- | ------------------------------------------------------------------------------------- |
| `npm run typecheck` | TypeScript                                                                            |
| `npm run lint`      | ESLint (mesmas regras do painel: sem `as`, sem `any`, sem desativar regra)            |
| `npm test`          | Testes da lógica pura (Vitest)                                                        |
| `npm run gerar:api` | Regera `src/api/schema.d.ts` a partir de `../moto-delivery-api/contrato/openapi.json` |
| `npm run doctor`    | `expo-doctor`                                                                         |

Instale dependências com `npx expo install <pacote>`, que escolhe a versão do SDK. O TypeScript fica
no 5.9 (exceção registrada no `package.json`) porque o `openapi-typescript` ainda não aceita o 6.
