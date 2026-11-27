# Roteiro de campo da M8

Roteiro para testar o app fora do Expo Go, no build de desenvolvimento, com a API na rede local. Os testes de rua (turno inteiro, sol) precisam da API com HTTPS na internet: o `preview` só fala HTTPS (regra do projeto) e a rede local some quando o motoboy sai do Wi-Fi.

## 1. Preparar

| Passo | Android | iPhone |
| --- | --- | --- |
| Conta | Já existe (Expo `arthurreiss-zanart`) | Apple Developer (US$ 99/ano) no nome da empresa |
| Aparelho | Nada a registrar | `npx eas-cli device:create`, abrir o link no iPhone e instalar o perfil |
| Build | `npx eas-cli build -p android --profile development` | `npx eas-cli build -p ios --profile development` |
| Instalar | Link/QR do EAS, baixa o APK | Link/QR do EAS (só aparelhos registrados) |

No PC:

1. Docker completo no ar (`docker compose -f docker-compose.completo.yml up -d` na API): API na 3333.
2. `moto-delivery-mobile/.env` com `EXPO_PUBLIC_API_URL=http://<IP do PC>:3333`.
3. `npx expo start -c` (sem `--go`): o app de desenvolvimento acha o Metro pela rede ou pelo QR.
4. Firewall do Windows liberando as portas 3333 (API) e 8081 (Metro) na rede privada.

O build só precisa ser refeito quando mudar algo nativo (dependência nova, `app.config.js`, permissões). Mudança de tela chega pelo Metro.

## 2. O que testar

Marque Android e iPhone separadamente.

| # | Teste | Como | Passa quando |
| --- | --- | --- | --- |
| 1 | GPS com a tela apagada | Abrir turno, apagar a tela, 30 min parado ou andando | Os pontos chegam no mapa do painel sem buraco maior que ~1 min |
| 2 | Push da oferta | Oferecer entrega pelo painel com o app aberto, em segundo plano e fechado | Toca o som da oferta e o toque abre a oferta |
| 3 | Permissões | Negar a localização; depois dar só "aproximada" | Aviso explicando o que fazer nos Ajustes |
| 4 | Bateria (Android) | Medir com e sem "Ajustes > Apps > ZGo > Bateria > Sem restrições" (o app ainda não pede isso sozinho) | O GPS não para depois de 10 min de tela apagada; se parar, o app precisa pedir a exceção |
| 5 | Voltar | Voltar do Android e gesto do iPhone no meio de uma ação | Nada se perde; o deslizar para confirmar não dispara sozinho |
| 6 | Sem sinal | Modo avião no meio de uma entrega, confirmar paradas, voltar o sinal | As ações chegam ao painel na ordem, sem duplicar |
| 7 | Sol | Tela no sol direto, brilho automático, temas claro e escuro | Endereço, valor a cobrar e botões legíveis |
| 8 | Luva | Usar o app inteiro de luva | Deslizar para confirmar e botões funcionam sem errar o alvo |
| 9 | Bateria no turno | Turno inteiro com carga cheia, anotar início e fim | Gasto do app até ~25% no turno; acima disso ajustar intervalo e precisão do GPS |

Bateria: cada ponto de GPS já leva a carga do celular (`bateria_pct`). Diga o motoboy e o horário do turno que a curva sai do banco, sem precisar anotar de hora em hora.

## 3. Registro dos problemas

Cada problema numa linha. A lista vira a fila de correções da semana 2 do piloto.

| Data | Aparelho e sistema | Tela | O que aconteceu | Como repetir | Gravidade (bloqueia / atrapalha / detalhe) |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## 4. Fica para depois

- Sentry do app (relatório de erros sem dados de cliente): depende de conta e DSN.
- APK `preview` para a rua: depende da API com HTTPS (Render ou VPS) e da variável `EXPO_PUBLIC_API_URL` no ambiente `preview` do EAS.
