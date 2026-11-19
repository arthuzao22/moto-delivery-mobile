# 05 — Análise para iniciar o app: Android e iOS

Feita em 17/11/2026 sobre os documentos 00 a 04 desta pasta, a documentação técnica da API (`02-documentacao-tecnica.md`, §2.3 e §6.1) e o contrato atual `moto-delivery-api/contrato/openapi.json` (commit `dd12da1`).

O objetivo é o mesmo app rodando em **Android e iOS desde o primeiro dia**, e não "Android agora, iPhone depois". O documento 04 (plano M0 a M8) continua valendo. Este documento diz o que **muda** nele para isso acontecer.

---

## 1. Resumo

| Pergunta | Resposta |
| --- | --- |
| A stack escolhida serve para os dois? | **Sim.** Expo + React Native + Expo Router + NativeWind + RN Reusables geram Android e iOS do mesmo código. Nenhuma troca de tecnologia é necessária. |
| Dá para desenvolver o iOS no Windows? | **Sim, sem Mac.** O EAS Build compila o iOS na nuvem, e o build de desenvolvimento roda num iPhone físico. O que não existe no Windows é o simulador de iPhone. |
| O que custa a mais? | Conta Apple Developer (US$ 99/ano) e conta Google Play Console (US$ 25, uma vez). Um iPhone de teste. |
| Quanto tempo a mais? | De **37 para cerca de 47 dias úteis**, ou seja, de 7 para 9 semanas (§6). |
| Dá para começar já? | **Sim.** As lacunas que bloqueavam a M4 (telefone, pagamento e botões da parada) foram resolvidas na API em 17/11/2026 (§3). |

---

## 2. Situação atual dos três repositórios

| Repositório | Estado |
| --- | --- |
| `moto-delivery-api` | S0 a S7 feitas e a S8 em andamento. Já tem as 29 rotas `/app/*`, arquivos (Vercel Blob), comprovantes, mapas (Google), coordenadas na parada e o script `npm run simular:motoboy`, que hoje faz o papel do app. |
| `moto-delivery-web` | Adiantado: já fez o fechamento e a fatura (W5). |
| `moto-delivery-mobile` | **Só a pasta `docs/`.** Não tem `package.json` nem código. O passo 0 do documento 03 se resume a criar o projeto. |

Hoje, o mobile é o **caminho crítico do piloto**. A API e o painel estão à frente.

### O que mudou no contrato desde o documento 04 (§5)

| Lacuna do documento 04 | Hoje |
| --- | --- |
| Sem `arquivos` (foto de comprovante) | ✅ **Resolvida.** Existem `POST /app/arquivos/upload-url`, `/app/arquivos/{id}/confirmar`, `GET /app/arquivos/{id}/url` e `POST /app/entregas/{id}/comprovantes` |
| Coordenada do destino | ✅ **Resolvida.** A parada traz `coordenadaColeta` e `coordenadaDestino`, e o `NavButtons` pode abrir por coordenada |
| Oferta sem ganho e sem km | 🟡 **Metade.** Desde 18/11/2026, a oferta (em `/app/ofertas` e em `/app/inicio`) traz `kmEstimado`, que é `null` quando falta a distância de alguma parada. O `ganhoEstimado` espera o componente `percentual_cobranca` do cálculo entrar, porque a estimativa precisa seguir o mesmo caminho da remuneração. Até lá, a tela mostra km, paradas e bairros |
| Push só para `oferta.nova` e `rota.transferida` | ✅ **Resolvida em 18/11/2026.** O `entrega.atualizada` agora chega ao motoboy da rota pelo socket (antes nem isso), e as decisões que pedem ação dele saem por push no canal `avisos`: espera esgotada, aguardar mais, novo destino, retorno autorizado e cancelamento. O push leva `entregaId` e `acao` |
| Schemas sem nome no OpenAPI | ❌ Continua (1 schema com nome) |

---

## 3. Lacunas novas no contrato (pedir à API)

Achadas conferindo o contrato contra as telas do documento 02.

| # | Lacuna | Efeito no app | Pedido | Bloqueia? |
| --- | --- | --- | --- | --- |
| A1 | ✅ **Resolvida em 17/11/2026.** Antes, a parada só trazia texto de cliente e destino | — | A parada do app (em `rotaAtiva` e nas respostas das ações) agora traz `telefone` (até a parada terminar), `coleta.{endereco, instrucoes}`, `complemento`, `referencia`, `observacoes` e `pagamento.{forma, valorACobrar, trocoPara, trocoNecessario, maquininhaDe, recebimentoStatus}`, com o troco calculado pela API | — |
| A2 | ✅ **Resolvida em 17/11/2026.** Antes, só a rota tinha `acoesPermitidas` | — | Cada parada tem `acoesPermitidas` com o nome da rota que o botão chama: `iniciar`, `cheguei`, `contato`, `recebimentos`, `comprovantes`, `ausente`, `recusada_pelo_cliente`, `entregar` e `devolver`. O `entregar` só aparece com o pagamento registrado e o comprovante exigido enviado | — |
| A3 | ✅ **Resolvida em 17/11/2026.** Antes, a parada não dizia o comprovante exigido nem o prazo do ausente | — | A parada agora traz `comprovante.{exigido, tipo, pendente}`, em que `tipo` é o que enviar em `/comprovantes`, e `ausencia.{desde, expiraEm}`, o cronômetro, que é `null` fora da espera | — |
| A4 | ✅ **Resolvida em 17/11/2026.** Antes, nenhum middleware conferia o `X-App-Version` | — | Nas rotas `/app/*` e `/auth/app/*`, a API responde `426 app_desatualizado` com `detalhes.versaoMinima` abaixo de `APP_VERSAO_MINIMA`, antes da autenticação. O app manda sempre a versão nativa (`Application.nativeApplicationVersion`, não a do OTA), e o `client.ts` trata o `426` com a tela de atualizar, que abre a loja certa em cada plataforma | — |
| A5 | ✅ **Resolvida em 17/11/2026.** Antes, o push saía com `sound: 'default'` e sem `channelId` | — | A `oferta.nova` sai com `channelId: 'ofertas'`, `sound: 'oferta.wav'`, `interruptionLevel: 'time-sensitive'` e prioridade alta. Os outros pushes (hoje, `rota.transferida`) saem com `channelId: 'avisos'`, sem som. **O app precisa criar os dois canais** (`ofertas` com importância máxima e o som; `avisos` com importância alta e sem som) antes de pedir o token: no Android, uma notificação de canal inexistente não aparece | — |
| A6 | ✅ **Resolvida em 18/11/2026.** Antes, sair do app não desativava o token de push, e o aparelho continuava recebendo as ofertas daquele motoboy | — | `POST /app/dispositivo/desativar` com o `expoToken`, chamado ao sair e antes do `/auth/logout`. Só desativa o token do próprio usuário | — |

> A ordem de trabalho do projeto continua: a mudança nasce na API, roda `npm run openapi` e o mobile regenera os tipos. As lacunas A1 a A6 já estão na API.

---

## 4. O que muda por plataforma

### 4.1 Ferramentas e contas (afeta a M0)

| Item | Android | iOS |
| --- | --- | --- |
| Conta | Google Play Console (US$ 25, uma vez) | Apple Developer Program (US$ 99/ano) |
| Tipo de conta | **Organização** (exige D-U-N-S). Uma conta **pessoal** nova precisa de um teste fechado com 12 testadores por 14 dias seguidos antes de publicar | **Organização** (também exige D-U-N-S), para a loja mostrar "Zanart" e não o nome de uma pessoa |
| Build | EAS Build ou local (Android Studio no Windows) | **Só EAS Build** (nuvem), porque não há Mac |
| Teste no aparelho | Build de desenvolvimento (`expo-dev-client`) por APK | Build de desenvolvimento num iPhone **registrado** (`eas device:create`), que exige a conta paga |
| Expo Go serve? | Não para o projeto todo | **Não**: GPS em segundo plano, som próprio de push e módulos nativos exigem o build de desenvolvimento |
| Credenciais de push | FCM v1 (projeto Firebase + chave de conta de serviço enviada ao EAS) | Chave APNs (`.p8`), que o EAS gera e guarda |

Também na M0:

- **`expo-updates` (EAS Update)**: correção só de JavaScript chega aos dois sistemas sem passar pela revisão da loja. Isso pesa mais no iOS, onde a revisão leva de horas a dias.
- **HTTP na rede local**: o Android bloqueia `http://` em builds de release, e o iOS bloqueia pelo ATS. Use `expo-build-properties` para liberar o tráfego sem TLS **só no perfil `development`**. O `preview` e o `production` apontam para a homologação com HTTPS (Render).
- O iOS pede a permissão de **rede local** para falar com `192.168.x.x`. Ela precisa de texto no `NSLocalNetworkUsageDescription` (só em desenvolvimento).
- **Identificadores**: definir já o `ios.bundleIdentifier` e o `android.package`. Não dá para trocá-los depois de publicar.

### 4.2 GPS em segundo plano (afeta a M2, o ponto mais sensível)

| Tema | Android | iOS |
| --- | --- | --- |
| Configuração | Plugin do `expo-location` com `isAndroidBackgroundLocationEnabled` e `isAndroidForegroundServiceEnabled`. O Android 14 exige o tipo de serviço `location` (`FOREGROUND_SERVICE_LOCATION`) | `UIBackgroundModes: ["location"]` e os textos `NSLocationWhenInUseUsageDescription` e `NSLocationAlwaysAndWhenInUseUsageDescription` |
| Notificação fixa "Turno aberto" | **Obrigatória.** Vem do `foregroundService` do `startLocationUpdatesAsync` | **Não existe.** No lugar dela, o sistema mostra a pílula azul na barra de status (`showsBackgroundLocationIndicator: true`) |
| Pedido em duas etapas | "Durante o uso" e depois "o tempo todo". Do Android 11 em diante, o "o tempo todo" **só se marca em Ajustes**: o app leva o motoboy até lá | "Durante o uso" e depois "Sempre". O iOS pode mostrar a pergunta do "Sempre" mais tarde, e também oferece "Permitir uma vez" |
| **Localização aproximada** | Desde o Android 12, o motoboy pode dar só a aproximada | Desde o iOS 14, existe a chave "Localização precisa" |
| Efeito da aproximada | **A API descarta ponto com precisão pior que 100 m.** Com a aproximada, o motoboy some do mapa sem ninguém saber por quê | Igual |
| O que fazer | Conferir a precisão concedida ao abrir o turno e **recusar abrir o turno** com uma tela explicando, como no caso da localização negada | Igual. No iOS, dá também para pedir precisão temporária |
| Ajustes para não pausar | `timeInterval` e `distanceInterval` definidos | `pausesUpdatesAutomatically: false` e `activityType: OtherNavigation`. Sem isso, o iOS pausa o GPS quando a moto para no semáforo |
| Quem mata o app | **Economia de bateria das fabricantes** (Xiaomi, Samsung, Motorola), que encerram o serviço mesmo com a notificação fixa. É o risco nº 1 no Android barato | O sistema suspende o app, mas a localização em segundo plano bem configurada continua |
| Mitigação | Tela de onboarding por fabricante, levando a Ajustes → Bateria → "Sem restrições" (`expo-intent-launcher`) | Nenhuma além da configuração acima |

> A medição de bateria da M8 precisa ser feita **nos dois sistemas**: o consumo e o comportamento são diferentes.

### 4.3 Push e a oferta (afeta a M1 e a M3)

| Tema | Android | iOS |
| --- | --- | --- |
| Permissão | Desde o Android 13, é pedida ao usuário (`POST_NOTIFICATIONS`) | Sempre pedida |
| Som próprio da oferta | Fica no **canal** `ofertas`, criado com `setNotificationChannelAsync` **antes** de obter o token, com importância máxima e o som `oferta.wav` | Arquivo de som no bundle (plugin `expo-notifications`, `sounds`), com até 30 s, nomeado no payload |
| Furar o "Não perturbe" e o resumo agendado | Canal de importância alta | `interruptionLevel: 'time-sensitive'` e o entitlement `com.apple.developer.usernotifications.time-sensitive`. O "crítico" exige autorização especial da Apple e não se aplica |
| "Abre por cima de qualquer tela" (doc 02 §3) | **Só dentro do app.** A notificação de tela cheia (full-screen intent) ficou restrita a apps de chamada e alarme desde o Android 14 | **Não existe** para apps comuns |

**Consequência para o design:** com o app em segundo plano, a oferta chega como **notificação de alta prioridade com som**. O motoboy toca nela e vai direto para `oferta/[id]` (deep link `motodelivery://`). O texto do documento 02 §3 precisa ser ajustado: a tela cheia por cima vale só com o app aberto.

O socket não funciona com o app em segundo plano em nenhum dos dois sistemas, como o documento 04 já prevê. No iOS isso é ainda mais rígido, porque o app é suspenso em segundos. Por isso o canal e o som do push (A5, já entregue) e o push de `entrega.atualizada` (documento 04 §5, ainda pendente) têm mais peso com iPhone.

### 4.4 Armazenamento e sessão (afeta a M1)

- **No iOS, o Keychain sobrevive à desinstalação.** Quem reinstala o app volta com o refresh antigo, que pode já ter sido rotacionado e **revogar a família** (`401 refresh_reutilizado`). Solução: uma marca de "primeira abertura" no AsyncStorage, que é apagado na desinstalação. Sem ela, o app limpa o `expo-secure-store` antes de tudo. O `dispositivoId` também é gerado de novo nesse caso.
- O `expo-sqlite` da fila offline (M6) funciona igual nos dois sistemas. Fica mantida a recomendação do documento 04 §6.

### 4.5 Apps externos (afeta a M4)

| Ação | Android | iOS |
| --- | --- | --- |
| Waze | `https://waze.com/ul?ll=<lat>,<lng>&navigate=yes` | Igual |
| Google Maps | `https://www.google.com/maps/dir/?api=1&destination=<lat>,<lng>` | Igual. O app do Google Maps é opcional no iPhone |
| Apple Maps | — | `https://maps.apple.com/?daddr=<lat>,<lng>`, porque no iPhone ele vem instalado |
| WhatsApp | `https://wa.me/<telefone>` | Igual |
| Discador | `tel:<telefone>` | Igual (o iOS pede confirmação) |
| `canOpenURL` para saber se o app existe | `<queries>` no manifesto (Android 11+) | `LSApplicationQueriesSchemes` (`waze`, `comgooglemaps`, `whatsapp`) |

Os links `https://` abrem o app quando ele está instalado e o navegador quando não está, sem configuração. O `NavButtons` mostra o Apple Maps só no iOS.

### 4.6 Interface (afeta a M0 e a M4)

- **Status bar "sempre escura" (doc 01 §1):** do Android 15 em diante, o app é sempre *edge-to-edge* e não dá mais para pintar a cor da status bar. O efeito vem de uma faixa `bg-chrome` desenhada atrás dela, com o `useSafeAreaInsets().top`. É a mesma técnica do iOS, e já é a que o documento 01 descreve para o tema claro.
- **Barra inferior:** o iPhone tem o indicador de home e o Android tem a navegação por gestos ou por botões. O `ActionBar` e o `TabBar` usam o `insets.bottom` nos dois.
- **Gesto de voltar do iOS × `SlideToConfirm`:** deslizar a partir da borda esquerda volta de tela no iOS. Nas telas com o deslizar para confirmar, use `gestureEnabled: false` e um trilho que não comece colado à borda.
- **Botão voltar do Android:** na tela da oferta e no meio da rota, o voltar físico não pode descartar a oferta nem sair do fluxo (`BackHandler`).
- **Fonte ampliada (130%):** testar nos dois. O tamanho de fonte do iOS (Dynamic Type) e o do Android têm escalas diferentes.
- O **haptics** funciona nos dois. No Android, a intensidade varia muito entre aparelhos.

### 4.7 Lojas (nova fase, §6)

| Exigência | Google Play | App Store |
| --- | --- | --- |
| Localização em segundo plano | Declaração no Play Console, com **vídeo** mostrando o uso e a tela que explica antes do pedido | Justificativa nas notas da revisão. Os textos de permissão precisam dizer o porquê (o doc 02 §6 já tem os textos) |
| Serviço em primeiro plano | Declaração do tipo `location` (Android 14) com vídeo | — |
| Privacidade | Formulário "Segurança dos dados" | Rótulos de privacidade e **Privacy Manifest** (o Expo gera o dos módulos dele; o app declara o uso do `UserDefaults` pelo AsyncStorage) |
| Conta de demonstração | Recomendada | **Obrigatória.** O revisor precisa entrar e ver o fluxo. Como sem turno e sem oferta não há nada para ver, prepare uma organização de demonstração e um vídeo |
| App só para quem trabalha na empresa | Pode ser publicado normalmente | Risco de recusa por "app sem uso para o público". Alternativa: **distribuição não listada** (pedido à Apple), ou app personalizado pelo Apple Business Manager |
| Política de privacidade | URL obrigatória | URL obrigatória |

---

## 5. Distribuição para o piloto

| | Android | iOS |
| --- | --- | --- |
| Caminho do piloto | APK do perfil `preview`, instalado direto (como no doc 04) | **Opção A:** distribuição interna do EAS (*ad hoc*), com o UDID do iPhone de cada motoboy registrado e instalação por link. Não passa por revisão, aceita até 100 aparelhos por ano e o build vale enquanto o perfil valer. **Opção B:** TestFlight. Testadores externos passam por uma revisão beta curta, e cada build expira em 90 dias |
| Recomendação | APK | **Opção A no piloto** (2 motoboys, sem revisão) e TestFlight quando passar de poucos aparelhos |

Antes de tudo, é preciso saber **quantos dos 10 motoboys usam iPhone**. Essa pergunta do documento 04 §6 continua aberta e decide se a conta Apple é necessária já na semana 1.

---

## 6. Plano M0 a M9 ajustado para as duas plataformas

As fases do documento 04 continuam. Abaixo está só o que entra a mais em cada uma.

| Fase | Doc 04 | Acréscimo para Android + iOS | Dias |
| --- | --- | --- | --- |
| **M0 — Fundação** | 3 | Contas Apple e Play, identificadores, projeto Firebase (FCM v1), credenciais no EAS, `expo-dev-client`, `expo-updates`, `expo-build-properties` por perfil, iPhone registrado. **Pronto quando:** o build de desenvolvimento abre **no Android e no iPhone** e consulta `/saude` | 3 + 2 = **5** |
| **M1 — Acesso** | 3 | Canais `ofertas` e `avisos` criados antes do token, push testado nos dois sistemas e limpeza do Keychain na reinstalação | 3 + 1 = **4** |
| **M2 — Turno e GPS** | 5 | Configuração de segundo plano por sistema, checagem da localização precisa, onboarding de bateria por fabricante e teste de 30 min de tela apagada **nos dois** | 5 + 2 = **7** |
| **M3 — Oferta** | 4 | Som próprio nos dois, *time-sensitive* no iOS e abertura pelo toque no push (sem tela cheia por cima de outros apps). A5 já está na API | 4 + 1 = **5** |
| **M4 — Coleta e paradas** | 6 | Apple Maps no iOS, gesto de voltar desligado no deslizar e `BackHandler`. A1 e A2 já estão na API | **6** |
| **M5 — Ausente e devolução** | 4 | A3 já está na API | **4** |
| **M6 — Sem sinal** | 5 | — | **5** |
| **M7 — Dinheiro** | 3 | — | **3** |
| **M8 — Campo** | 4 | iPhone no teste de sol, de luva e de bateria; distribuição *ad hoc* ou TestFlight | 4 + 1 = **5** |
| **M9 — Lojas** (nova) | — | Tela de atualizar ligada ao `426` (A4 já está na API), textos e vídeos de permissão, Privacy Manifest, Segurança dos dados, conta de demonstração, envio às duas lojas e resposta às revisões | **3** |
| **Total** | 37 | | **47** |

### Ordem semanal ajustada

| Semana | Mobile | O que a API precisa entregar antes |
| --- | --- | --- |
| 1 | M0 | — |
| 2 | M1, começo da M2 | — (A5 já entregue) |
| 3 | M2 | — |
| 4 | M3 | Ganho e km na oferta (doc 04 §5), ou o contorno com paradas e bairros |
| 5 | M4 | — (A1 e A2 já entregues) |
| 6 | M5, começo da M6 | — (A3 e o push de `entrega.atualizada` já entregues) |
| 7 | M6, M7 | — |
| 8 | M8 (piloto com 2 motoboys) | — |
| 9 | M9 (lojas), em paralelo à semana 2 do piloto | — (A4 já entregue) |

---

## 7. Decisões para o dono do produto

1. **Quantos motoboys do piloto usam iPhone?** Se nenhum usar, o iOS pode seguir em paralelo sem bloquear a semana 1, mas a M0 continua sendo feita com os dois sistemas para não haver surpresa depois.
2. **Contas como organização (D-U-N-S) ou pessoa física?** Recomendo organização nas duas lojas. Pedir o D-U-N-S já, porque ele leva dias.
3. **iPhone no piloto:** *ad hoc* pelo EAS (recomendado) ou TestFlight.
4. **Na App Store:** publicação normal, não listada ou Apple Business Manager. Dá para decidir na M9, mas a conta de demonstração precisa ser pensada antes.
5. **Fila offline:** `expo-sqlite` (recomendado, igual ao doc 04 §6).

---

## 8. Definição de pronto (acréscimos ao doc 04 §7)

- [ ] Testada em **Android real e iPhone real** (não só em emulador)
- [ ] Permissões negadas e "aproximada" tratadas com tela explicativa nos dois
- [ ] Push abre a tela certa com o app fechado, em segundo plano e aberto, nos dois
- [ ] Nada colado nas bordas: `insets` de cima e de baixo usados
- [ ] Voltar do Android e gesto de voltar do iOS não perdem ação em andamento
