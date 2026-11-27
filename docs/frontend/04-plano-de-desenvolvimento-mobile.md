# 04 — Plano de desenvolvimento do app do motoboy

Feito a partir do contrato `moto-delivery-api/contrato/openapi.json` (commit `95d5cfa`, 10/11/2026). O app consome **as 25 rotas `/app/*`** e mais 4 de autenticação. O repositório `moto-delivery-mobile` está vazio, então o plano começa da fundação.

Os documentos 01 a 03 desta pasta dizem **como** o app se parece e se comporta: identidade, tela guiada pelo estado, toque de 56 px, deslizar para confirmar. Este diz **em que ordem** construir e **quais rotas** cada parte usa.

---

## 1. O que o contrato entrega ao app

| Momento do motoboy | Rotas |
| --- | --- |
| Entrar e manter a sessão | `POST /auth/app/login` (JWT de 15 min + refresh de 30 dias), `POST /auth/app/refresh`, `POST /auth/logout`, `GET /auth/me` |
| Avisos | `POST /app/dispositivo` (token de push a cada abertura) |
| Tela inicial | `GET /app/inicio` → `turno`, `ofertas`, `rotaAtiva` (com paradas, cliente e destino), `caixa` |
| Turno | `POST /app/turnos/abrir`, `/app/turnos/fechar` (recusado com rota em andamento), `POST /app/disponibilidade` (disponível ↔ pausa) |
| GPS | `POST /app/localizacao` (lote de até 100 pontos, só com turno aberto, precisão pior que 100 m é descartada) |
| Oferta | `GET /app/ofertas`, `POST /app/ofertas/{id}/visualizar`, `/aceitar` (perdeu a disputa: `409 oferta_indisponivel`), `/recusar` |
| Coleta | `POST /app/rotas/{id}/cheguei-coleta`, `/coletar` (coleta parcial: o que não veio volta para a fila), `/ordem` |
| Parada | `POST /app/entregas/{id}/iniciar`, `/cheguei` (longe: `422 longe_do_destino`), `/contato`, `/recebimentos` (até 4 partes), `/entregar` |
| Problemas na porta | `/ausente`, `/recusada-pelo-cliente`, `/devolver` (código de 6 dígitos; errado: `422 codigo_devolucao_invalido`), `POST /app/ocorrencias` |
| Dinheiro | `GET /app/caixa`, `GET /app/extrato` (até 62 dias, com memória de cálculo), `GET /app/fechamentos` |

**O contrato já está pronto para trabalhar sem sinal.** Todas as ações de turno, coleta, parada e oferta exigem `Idempotency-Key`. As de turno, coleta e parada também aceitam `eventoEm`, com a hora real do toque. As de parada aceitam ainda a `posicao`. A exceção é a oferta: aceitar e recusar precisam de conexão, porque a disputa é decidida na hora.

---

## 2. Regras de integração (valem para todas as fases)

1. **Tipos gerados.** `npm run gerar:api` = `openapi-typescript ../moto-delivery-api/contrato/openapi.json -o src/api/schema.d.ts`. O arquivo vai versionado e o CI não o regenera, porque o contrato fica no repositório da API: depois de `npm run openapi` na API, rode `npm run gerar:api` aqui e commite o resultado.
2. **Cliente único** (`src/api/cliente.ts`) com `openapi-fetch`:
   - `baseUrl` vem de `EXPO_PUBLIC_API_URL`, com `/api/v1` no fim;
   - middleware que coloca `Authorization: Bearer <access>`;
   - middleware de erro pelo `codigo`, com um mapa de textos curtos para quem está na moto.
3. **Refresh numa fila só.** O refresh é rotativo, e reusar um refresh antigo **revoga a família inteira**: o motoboy cai para o login.
   - Por isso existe uma única promessa de refresh em andamento (`renovador.ts`).
   - Toda resposta 401 espera essa promessa e repete a chamada uma vez.
   - Dois refresh em paralelo nunca acontecem.
4. **Tokens no `expo-secure-store`**, nunca no AsyncStorage. O `dispositivoId` é gerado uma vez e guardado junto.
5. **`/app/inicio` é a fonte da tela inicial.** O estado do app sai dele (sem turno, disponível, com oferta, coletando, em parada). Nenhuma tela guarda um estado próprio que contradiga a API.
6. **Tempo real só invalida.** O Socket.IO conecta com `auth: { token }`, e o servidor põe o motoboy na sala dele.
   - `oferta.nova`, `oferta.expirada`, `oferta.retirada`, `rota.atualizada`, `rota.transferida` e `entrega.atualizada` fazem o app buscar `/app/inicio` de novo.
   - O socket só fala com o app aberto. Com o app em segundo plano, quem acorda o motoboy é o push, que hoje só existe para `oferta.nova` e `rota.transferida`.
7. **Botões pelo `acoesPermitidas`.** A barra de ações de cada parada mostra só o que a API permite. Por exemplo, "Entregar" não aparece antes do "Cheguei".
8. **Dinheiro é texto.** `valor`, `trocoDado` e totais são strings decimais. O teclado de valor monta a string; o app não soma com `number`.
9. **Navegação externa sem custo.** Waze (`https://waze.com/ul?q=<endereço>&navigate=yes`) e Google Maps abrem pelo endereço em texto, igual ao protótipo. Não é preciso coordenada da API.
10. **Ponte do `decode-uri-component` (27/11/2026).** O `expo-router` 57 usa o `query-string` 7, que puxa o `decode-uri-component` 0.2.2, com duas vulnerabilidades altas de DoS por link malformado. A versão corrigida (0.5.1) só existe em ESM, e o `query-string` 7 faz `require()`. Por isso `vendor/decode-uri-component` reexporta a 0.5.1 em CommonJS, ligada por `overrides` no `package.json`. O teste `src/lib/__tests__/ponte-decode-uri.test.ts` falha se a ponte sumir. **Remover** quando `npm ls query-string` não mostrar mais a 7.x sob o `expo-router` (reavaliar na subida para o SDK 58): apagar `vendor/`, a entrada em `dependencies` e o `overrides`, rodar `npm install` e `npm audit --audit-level=high`. As builds do EAS usam o Node 22.12 (`eas.json`).

---

## 3. Fases

Durações para um desenvolvedor só, em dias úteis. Cada fase é testada num celular Android real (a maioria dos motoboys usa Android) com o build de desenvolvimento do Expo.

### M0 — Fundação (3 dias)

- Expo (SDK atual) com Expo Router, TypeScript estrito e ESLint com as regras de código limpo da API.
- NativeWind v4 + React Native Reusables com os tokens do documento 01. Os 3 arquivos-base do documento 03: `global.css`, `tailwind.config.js`, `app/_layout.tsx`.
- TanStack Query, `openapi-fetch`, `socket.io-client`, `expo-secure-store`.
- `gerar:api`, `cliente.ts`, mapa de erros.
- EAS com os perfis `development`, `preview` (APK para os motoboys de teste) e `production`.

**Pronto quando:** o build de desenvolvimento abre no celular, mostra a casca nos dois temas e consulta `GET /saude` na API da sua máquina pela rede local.

### M1 — Acesso (3 dias)

- Tela de entrar (e-mail e senha). O motoboy recebeu o convite por e-mail e criou a senha na página pública do painel (fase W1 do web).
- Tokens no secure store, renovador único, saída (`POST /app/dispositivo/desativar` com o token do Expo e depois `/auth/logout`).
- `GET /auth/me` para nome e organização.
- Pedido de permissão de notificação e `POST /app/dispositivo` com o token Expo, a cada abertura.

**Pronto quando:** um motoboy do seed entra, fecha o app, volta 20 minutos depois sem precisar entrar de novo e recebe um push de teste.

### M2 — Turno, disponibilidade e GPS (5 dias)

- Tela inicial lendo `/app/inicio`, com os estados "sem turno" e "disponível / em pausa".
- Abrir turno, alternar disponibilidade e fechar turno. A recusa com rota em andamento é explicada na tela.
- **GPS:**
  - `expo-location` com tarefa em segundo plano (`expo-task-manager`) só enquanto o turno estiver aberto, e notificação fixa "Turno aberto";
  - os pontos ficam numa fila local e vão em lotes de até 100 para `/app/localizacao`;
  - `422 turno_fechado` para o envio e limpa a fila.
- Pedido de permissão de localização em duas etapas: primeiro "durante o uso", depois "o tempo todo", com tela explicando por quê.
- Socket conectado com o turno aberto.

**Pronto quando:** com o turno aberto e a tela apagada por 30 minutos, a posição do motoboy anda no mapa do painel (`motoboy.posicao`), e a bateria gasta fica anotada para a M8.

### M3 — Oferta (4 dias)

- **Chegada:** push `oferta.nova` ou evento no socket. Tocar no push abre direto a oferta.
- **Tela da oferta:**
  - cheia, com contagem regressiva até `expiraEm`, local de coleta e bairros das paradas;
  - `visualizar` ao abrir;
  - "Aceitar" com um toque e "Recusar" com motivo opcional;
  - vibração e som (documento 01).
- **Respostas:** `409 oferta_indisponivel` vira "Outro motoboy aceitou antes". A expiração fecha a tela sozinha.

**Pronto quando:** o restaurante distribui pelo painel (W3), o celular toca em segundo plano, o motoboy aceita e a rota aparece no início.

### M4 — Coleta e paradas (6 dias)

| Passo na tela | Rota |
| --- | --- |
| Cheguei no restaurante | `POST /app/rotas/{id}/cheguei-coleta` (com posição) |
| Conferir os pedidos e coletar (desmarcar o que não veio) | `POST /app/rotas/{id}/coletar` |
| Reordenar as paradas (arrastar) | `POST /app/rotas/{id}/ordem` (manda todas as pendentes) |
| Iniciar a próxima parada + abrir Waze ou Maps | `POST /app/entregas/{id}/iniciar` |
| Cheguei no cliente | `POST /app/entregas/{id}/cheguei`; `422 longe_do_destino` mostra a distância e pede para chegar mais perto |
| Ligar ou chamar no WhatsApp | Abre o discador ou o WhatsApp e registra `POST /app/entregas/{id}/contato` |
| Receber (dinheiro, cartão, Pix, misto em até 4 partes, troco) | `POST /app/entregas/{id}/recebimentos`; valor diferente do previsto avisa que vai para a central como divergência |
| Entregar (deslizar para confirmar; nome de quem recebeu) | `POST /app/entregas/{id}/entregar`; a última parada fecha a rota e volta para "disponível" |
| Avisar a central (pane, trânsito, atraso no restaurante) | `POST /app/ocorrencias` |

**Pronto quando:** uma rota com 3 paradas vai do aceite ao fim no celular, com pagamento misto numa delas, e o painel acompanha cada passo em tempo real.

### M5 — Cliente ausente, recusa e devolução (4 dias)

- **Cliente ausente:** `POST /app/entregas/{id}/ausente` abre a espera com o tempo da parceria. A tela mostra o tempo, o botão de contato e o aviso "a central ou o restaurante vai decidir".
- **Decisão chega por `entrega.atualizada`:**

  | Decisão | O app mostra |
  | --- | --- |
  | Aguardar mais | O tempo estende |
  | Novo destino | Novo endereço, e a navegação abre de novo |
  | Autorizar retorno | Volta para o restaurante |

- **Recusa pelo cliente:** `POST /app/entregas/{id}/recusada-pelo-cliente` volta ao restaurante e abre uma ocorrência.
- **Devolução no restaurante:** teclado numérico de 6 dígitos para o código que o restaurante dita (`POST /app/entregas/{id}/devolver`). O código errado avisa sem perder o que foi digitado.

**Pronto quando:** os três desfechos da ausência funcionam com o app aberto, e a devolução por código fecha a rota.

### M6 — Sem sinal (5 dias)

- **Fila persistente de ações** (`expo-sqlite` ou MMKV):
  - cada toque grava `{ rota, corpo, Idempotency-Key, eventoEm, posicao }` na hora;
  - a tela avança na mesma hora, de forma otimista;
  - o selo `sync-badge` mostra "2 ações aguardando sinal".
- **Reenvio** em ordem, quando a conexão volta (`@react-native-community/netinfo`). A mesma chave nunca gera ação dupla, porque a API guarda a idempotência por 48 h.
- **Conflito ao reenviar** (409 ou 422): para a fila daquela rota, busca `/app/inicio` de novo e mostra o que aconteceu (exemplo: "A central cancelou esta entrega enquanto você estava sem sinal").
- **O que não entra na fila:** aceitar e recusar oferta. Sem sinal, o botão fica desabilitado com o aviso "precisa de internet".

**Pronto quando:** em modo avião, o motoboy faz "cheguei", recebimento e "entregar" de uma parada. Ao religar, as três ações chegam com a hora certa no histórico do painel.

### M7 — Dinheiro do motoboy (3 dias)

- **Caixa do turno:** `GET /app/caixa`, com dinheiro em mãos por restaurante, recebimentos e acertos. É o que ele leva na conferência.
- **Extrato:** `GET /app/extrato`, com total por dia e toque no dia para ver a memória de cálculo de cada entrega ("R$ 5,00 por entrega + R$ 1,20 por km").
- **Fechamentos:** `GET /app/fechamentos`, com status de aberto, aprovado e pago.

**Pronto quando:** o valor do extrato de um dia do seed bate com o fechamento gerado no painel (W5).

### M8 — Campo (4 dias)

- APK `preview` instalado nos 2 motoboys da primeira semana do piloto.
- Sentry do React Native sem dados de cliente.
- Medição de bateria num turno inteiro. Se passar de cerca de 25%, ajustar o intervalo e a precisão do GPS.
- Teste debaixo de sol (contraste) e de luva (toque).
- Lista de problemas do campo vira a fila de correções da semana 2 do piloto.

---

## 4. Ordem para o piloto (junto com o painel web)

| Semana | Mobile | Web | Marco |
| --- | --- | --- | --- |
| 1 | M0, M1 | W0, W1 | Login nas duas pontas |
| 2 | M2 | W2 | Turno e GPS no celular; motoboys reais cadastrados |
| 3 | M3 | W3 | Restaurante distribui e o motoboy aceita no app |
| 4 | M4, M5 | W4 (começo) | **Entrega de ponta a ponta**, com ausente e devolução |
| 5 | M6 | W4 (fim), W5 (caixa) | Operação sem sinal; dinheiro conferido no fim do turno |
| 6 | M7 | W5 (fechamento e fatura) | Extrato no app; financeiro fecha a semana |
| 7 | M8 | W6, W7 | **Piloto com 2 motoboys** |

---

## 5. O que falta no contrato (pedir à API)

| Lacuna | Efeito no app | Pedido | Bloqueia? |
| --- | --- | --- | --- |
| A oferta não traz o ganho nem a distância (só código, bairros, coleta e prazo) | A tela de oferta não mostra "quanto vou ganhar", que o documento 02 prevê | Incluir `ganhoEstimado` e `kmEstimado` em `/app/ofertas` e `/app/inicio` | **Sim, para a tela de oferta como desenhada.** Contorno: mostrar número de paradas e bairros até a API entregar |
| Push só para `oferta.nova` e `rota.transferida` | Com o app em segundo plano, o motoboy não fica sabendo da decisão sobre o cliente ausente nem de uma entrega cancelada | Push também para `entrega.atualizada` quando o motoboy precisa agir (decisão de ausente, cancelamento, novo destino) | Não, mas importa no campo |
| Sem `arquivos` | Sem foto de comprovante e sem "autorizar terceiro" (exige foto) | Módulo `arquivos` já previsto | Não, se a política de comprovante das parcerias ficar desligada no piloto |
| Schemas sem nome no OpenAPI | Tipos como `Parada` e `Oferta` são extraídos à mão | Schemas com nome (`.meta({ id })`) | Não. Contorno: `src/api/tipos.ts` |
| Coordenada do destino depende de geocodificação | O "cheguei" com posição só recusa por distância quando o destino tem coordenada | `MapasService` (já no plano da API) | Não |

---

## 6. Decisões em aberto

1. **Fila offline:** `expo-sqlite` (consulta e ordem garantidas) ou MMKV (mais simples). Recomendo `expo-sqlite`, porque a fila precisa de ordem e de reenvio parcial.
2. **iPhone no piloto?** Se algum dos 10 motoboys usar iPhone, o build de teste precisa de conta Apple Developer (US$ 99/ano) e TestFlight. Só Android dispensa isso no começo.
3. **GPS em segundo plano:** o Google Play pede justificativa para localização "o tempo todo". Para o piloto com APK direto isso não se aplica, mas para publicar na loja é preciso preparar o vídeo e o texto.

---

## 7. Definição de pronto (cada tela)

- [ ] Tipos só do `schema.d.ts`; nenhum `as` para forçar tipo da API
- [ ] Ações só pelo `acoesPermitidas`; tudo que não tem volta é deslizar para confirmar
- [ ] Toda ação de rota ou parada passa pela fila, com `Idempotency-Key` e `eventoEm`
- [ ] Erro mostrado pelo `codigo` em texto curto, legível de capacete
- [ ] Alvos de 56 px na barra de ação, contraste conferido no sol
- [ ] Funciona em modo avião (ou mostra claramente que precisa de internet)
- [ ] Testado em Android real; lint e typecheck sem `eslint-disable`
