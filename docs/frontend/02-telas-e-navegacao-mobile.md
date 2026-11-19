# 02 — Telas, navegação e componentes (app do motoboy)

> Depende de: `01-identidade-visual-mobile.md`. Rotas da API: `/api/v1/app/*` (Documentação Técnica do backend, seção 7.6).
> Proposta mobile: **o app é guiado pelo estado do motoboy**, não por menus. A tela inicial muda sozinha conforme o momento (offline → disponível → oferta → coleta → parada → fim). O motoboy quase nunca precisa navegar.

---

## 1. Navegação (Expo Router)

```
app/
├── _layout.tsx                 providers (fontes, tema, query, safe area, notificações)
├── (auth)/
│   ├── login.tsx
│   └── permissoes.tsx          onboarding de localização, notificação e câmera
├── (app)/
│   ├── _layout.tsx             Tabs (tab bar Zanart)
│   ├── index.tsx               Início — tela guiada pelo estado (ver §2)
│   ├── caixa.tsx               Dinheiro em mãos e recebimentos do turno
│   ├── extrato.tsx             Ganhos com memória de cálculo + fechamentos
│   └── perfil.tsx              Dados, documentos, aparência, sair
├── oferta/[id].tsx             modal de tela cheia (presentation: 'fullScreenModal')
├── entrega/[id]/pagamento.tsx  bottom sheet
├── entrega/[id]/comprovante.tsx câmera
└── turno/encerrar.tsx          resumo + confirmação
```

| Tab | Ícone Lucide | Conteúdo |
| --- | --- | --- |
| Início | `home` | O que fazer agora |
| Caixa | `wallet` | Dinheiro dos clientes que está com ele |
| Extrato | `receipt` | Quanto ganhou e por quê |
| Perfil | `user` | Conta, documentos, aparência |

**Durante uma rota**, a tab bar continua visível, mas o Início ocupa a tela com a parada atual. Notificações levam direto à tela certa (deep link `motodelivery://oferta/:id`).

---

## 2. A tela Início em cada estado

O estado vem de `GET /app/inicio` (turno, oferta aberta, rota ativa, caixa) e da ação permitida (`acoesPermitidas`).

| Estado | O que aparece | Ação dominante (barra inferior) |
| --- | --- | --- |
| **Offline** | Saudação, resumo do último turno | **Iniciar turno** |
| **Disponível, sem oferta** | Indicador calmo "Aguardando ofertas", entregas e dinheiro do turno | Pausar · Encerrar turno (secundárias) |
| **Oferta** | Modal tela cheia (§3) | **Aceitar** · Recusar |
| **Indo ao restaurante** | Restaurante, endereço, **troco a levar** (se houver dinheiro na rota) | Abrir no Waze · **Cheguei no restaurante** |
| **Coleta** | Lista de pedidos com checkbox grande; desmarcar = pedido não pronto | **Sair para entrega** |
| **A caminho** | Barra de progresso das paradas, cliente, endereço completo, forma de pagamento | Abrir no Waze · **Cheguei** |
| **No cliente** | Pagamento esperado com troco calculado; atalhos Ligar / WhatsApp | Registrar pagamento → Foto (se exigida) → **Deslizar para concluir** |
| **Cliente ausente** | Cronômetro, "restaurante já foi avisado", tentativas de contato | Ligar · WhatsApp · (concluir se o cliente aparecer) |
| **Aguardando decisão** | Mensagem clara: "Aguarde a decisão do restaurante" | Ligar para a central |
| **Retornando** | Endereço do restaurante, pedido a devolver | Abrir no Waze · Mostrar **código de devolução** |
| **Rota finalizada** | Ganho da rota com memória de cálculo (2s) e volta ao "Disponível" | — |

### Regras de interação
- **Uma** ação primária laranja por estado, sempre na barra inferior fixa (safe area).
- **Deslizar para confirmar** (`SlideToConfirm`) em: Concluir entrega, Cliente ausente, Encerrar turno. Evita toque acidental com a moto em movimento.
- Bloqueios da API (guards) aparecem **antes** do gesto: o botão de concluir fica desabilitado com o motivo visível ("Registre o pagamento primeiro"), em vez de deixar tentar e falhar.
- Ações enviadas sem sinal ficam com ícone `clock` e o texto "Aguardando sinal"; o fluxo continua normalmente.

---

## 3. Oferta (a tela mais importante do app)

```
┌──────────────────────────────┐
│ NOVA ROTA · R-0013           │  eyebrow
│ R$ 25,00                     │  32pt, laranja no dark
│ estimado · 3 paradas · 6,7 km│
│ ████████████░░░░  22s        │  barra de tempo (linear)
├──────────────────────────────┤
│ Coleta   Hamburgueria Central│
│ 1  Centro        Dinheiro    │
│ 2  São Mateus    Cartão      │
│ 3  São Mateus    Pago online │
│                              │
│ [        Aceitar rota       ]│  56px, laranja
│ [          Recusar          ]│  48px, outline
└──────────────────────────────┘
```

- Chega por **push de alta prioridade com som** (canal Android dedicado) e abre por cima de qualquer tela.
- Mostra **ganho estimado antes de aceitar** (vem da API).
- Aceitar = **1 toque** (velocidade). Recusar pede motivo opcional depois, sem travar.
- Se outro motoboy aceitar primeiro (modo broadcast), a tela fecha com a mensagem "Esta rota já foi aceita" (resposta `409 oferta_indisponivel`).
- Tela mantida acesa (`expo-keep-awake`) enquanto a oferta estiver aberta.

---

## 4. Componentes

Base: **React Native Reusables** (copiados para `components/ui/`, personalizados uma vez com os tokens). Componentes específicos do app em `components/app/`.

| Componente | Origem | Especificação Zanart |
| --- | --- | --- |
| `Button` | RN Reusables | `default` laranja/texto preto 56px · `secondary` 48px · `outline` · `ghost` · `destructive`. Sempre largura total na barra inferior |
| `Text` | RN Reusables | Variantes da escala do `01` §3 (`valor`, `titulo`, `corpo`, `secundario`, `eyebrow`, `mono`) |
| `Card` | RN Reusables | `rounded-2xl p-4 border`, sem sombra |
| `Badge` | RN Reusables | `neutral` · `attention` (laranja) · `muted` · `destructive` |
| `Checkbox` | RN Reusables | 28px, área de toque 48px (linha inteira clicável) |
| `Switch`, `Separator`, `Skeleton`, `Progress`, `Avatar`, `AlertDialog` | RN Reusables | Padrão com tokens |
| `BottomSheet` | `@gorhom/bottom-sheet` | Pagamento, motivo de recusa, filtros. Preferido a `Select`/dropdown no celular |
| `ActionBar` | próprio | Barra inferior fixa com safe area, fundo `background` + borda superior |
| `SlideToConfirm` | próprio (Reanimated + Gesture Handler) | Trilho 56px, polegar laranja, texto "Deslize para concluir" |
| `OfferSheet` | próprio | Tela da oferta (§3) |
| `StopCard` | próprio | Parada atual: cliente, endereço, pagamento, comprovante exigido |
| `StopProgress` | próprio | Barras por parada (feita / atual / pendente) |
| `MoneyLine` | próprio | Linha rótulo + valor `tabular-nums` |
| `SyncBadge` | próprio | "Aguardando sinal (2)" quando há ações na fila offline |
| `TabBar` | próprio sobre Tabs do Expo Router | Fundo `chrome` + borda `chrome-border`; ativo laranja, `strokeWidth 2.5` |
| `NavButtons` | próprio | Abrir no Waze / Google Maps por **coordenadas** (`destino_lat/lng` da API) com fallback por texto |

**Não usar no app**: tabelas, dropdown/`Select` com lista longa, tooltip (não existe hover), menus de contexto.

---

## 5. Estados de sistema

| Situação | Tratamento |
| --- | --- |
| Sem conexão | Faixa discreta no topo "Sem sinal — suas ações serão enviadas quando voltar". Nada bloqueia |
| Carregando a tela inicial | `Skeleton` no formato do card do estado |
| Erro da API | Mensagem em linguagem simples + "Tentar de novo"; `requestId` só em Perfil → Diagnóstico |
| App desatualizado (`426`) | Tela única: "Atualize o app para continuar" com botão para a loja |
| Localização negada | Tela explicando por que precisa ("para a central ver onde você está durante a entrega") + botão para Ajustes |
| Bateria < 20% | Aviso único no Início sugerindo carregar (o GPS em segundo plano consome bateria) |

---

## 6. Permissões (onboarding)

Uma tela por permissão, na ordem em que fazem sentido, com o motivo antes do pedido do sistema:
1. **Notificações** — "para você receber as ofertas".
2. **Localização "o tempo todo"** — "só durante o turno; desligamos quando você encerra".
3. **Câmera** — pedida só na primeira entrega que exigir foto.

---

## 7. Acessibilidade

- `accessibilityLabel` em todo botão com ícone; `accessibilityRole` correto.
- Leitores de tela anunciam a oferta ("Nova rota, 25 reais, 3 paradas, 22 segundos para responder").
- Fonte ampliada até 130% sem cortar endereço nem valores.
- Nunca informação só por cor: estado sempre com texto.

---

## 8. Linguagem

- Imperativo curto nos botões: "Cheguei", "Sair para entrega", "Registrar pagamento".
- Valores sempre com a explicação: "R$ 7,00 · valor por entrega", "R$ 3,39 · 2,8 km × R$ 1,20".
- Nada de jargão interno (`no_local_entrega`, `rota.atualizada`) na tela.
