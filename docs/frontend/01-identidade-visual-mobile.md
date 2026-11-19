# 01 — Identidade visual Zanart no app mobile

> Fonte: *Brandbook Zanart Tec — Ed. 01*, seções 02 (paleta), 03 (tipografia), 04 (sistema) e 08 ("Aplicativo mobile").
> Mesma paleta do painel web (`moto-delivery-web/docs/frontend/01-identidade-visual.md`). **O que muda aqui é escala, toque e contexto de uso.**

---

## 1. Regras do brandbook específicas para app

| Regra do brandbook | Aplicação |
| --- | --- |
| Status bar sempre dark (iOS "Always Dark", Android `#0A0A0A`) | No tema escuro: status bar `light-content` sobre `#0A0A0A`. No tema claro: barra `#0A0A0A` mantida no **topo do app** (faixa de cabeçalho escura) para preservar a regra |
| Bottom navigation: preto com borda superior `#222`; item ativo com rótulo laranja + ícone preenchido | Tab bar `#0A0A0A` + `border-t #222`. Ativo: rótulo e ícone laranja, ícone com `strokeWidth 2.5` (Lucide não tem versão preenchida; o traço mais grosso faz o papel do "preenchido") |
| Botões primários com largura total, fixos na parte inferior via safe area | Toda tela com ação principal tem **barra de ação inferior fixa** |
| Touch target mínimo 44×44px | Mínimo **48×48** (padrão Android, mais folga para luva); ação principal **56px** de altura |

---

## 2. Tokens de cor (NativeWind + React Native Reusables)

O React Native Reusables usa variáveis CSS no `global.css` (formato HSL sem `hsl()`) e o `tailwind.config.js` mapeia `hsl(var(--x))`. Valores equivalentes à paleta do web:

```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* LIGHT — Paper + Ink ("modo dia") */
    --background: 0 0% 98%;          /* #FAFAFA */
    --foreground: 0 0% 10.2%;        /* #1A1A1A */
    --heading: 0 0% 3.9%;            /* #0A0A0A */
    --card: 0 0% 100%;               /* #FFFFFF */
    --card-foreground: 0 0% 10.2%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 10.2%;
    --primary: 18.1 100% 50%;        /* #FF4D00 Signal Orange */
    --primary-foreground: 0 0% 3.9%; /* texto preto no botão — contraste 5,95:1 */
    --brand-text: 17.9 100% 38%;     /* #C23A00 — laranja como TEXTO no light */
    --secondary: 0 0% 94.9%;         /* #F2F2F2 */
    --secondary-foreground: 0 0% 10.2%;
    --muted: 0 0% 94.9%;
    --muted-foreground: 0 0% 42%;    /* #6B6B6B — 5,11:1 sobre Paper */
    --accent: 0 0% 94.9%;
    --accent-foreground: 0 0% 3.9%;
    --attention: 18.1 100% 50%;
    --destructive: 4.2 76.5% 40%;    /* #B42318 */
    --border: 0 0% 89.8%;            /* #E5E5E5 */
    --input: 0 0% 89.8%;
    --ring: 18.1 100% 50%;
    --chrome: 0 0% 3.9%;             /* faixa superior e tab bar: sempre escuras */
    --chrome-foreground: 0 0% 89.8%;
    --chrome-border: 0 0% 13.3%;     /* #222222 */
  }

  .dark:root {
    /* DARK — nativo da marca (padrão) */
    --background: 0 0% 3.9%;         /* #0A0A0A */
    --foreground: 0 0% 89.8%;        /* #E5E5E5 */
    --heading: 0 0% 100%;            /* #FFFFFF */
    --card: 0 0% 6.7%;               /* #111111 */
    --card-foreground: 0 0% 89.8%;
    --popover: 0 0% 6.7%;
    --popover-foreground: 0 0% 89.8%;
    --primary: 18.1 100% 50%;
    --primary-foreground: 0 0% 3.9%;
    --brand-text: 18.1 100% 50%;
    --secondary: 0 0% 10.2%;         /* #1A1A1A */
    --secondary-foreground: 0 0% 89.8%;
    --muted: 0 0% 10.2%;
    --muted-foreground: 0 0% 53.3%;  /* #888888 */
    --accent: 0 0% 10.2%;
    --accent-foreground: 0 0% 100%;
    --attention: 18.1 100% 50%;
    --destructive: 3.9 85.8% 58%;    /* #F04438 */
    --border: 0 0% 13.3%;            /* #222222 */
    --input: 0 0% 20%;               /* #333333 */
    --ring: 18.1 100% 50%;
    --chrome: 0 0% 3.9%;
    --chrome-foreground: 0 0% 89.8%;
    --chrome-border: 0 0% 13.3%;
  }
}
```

### Contraste (mesma verificação do web)

| Par | Contraste | Uso |
| --- | --- | --- |
| Preto sobre laranja | 5,95:1 ✅ | Texto do botão primário |
| Branco sobre laranja | 3,33:1 ❌ (texto normal) | **Não usar** em botão |
| `#888` sobre `#0A0A0A` | 5,58:1 ✅ | Texto secundário no dark |
| `#6B6B6B` sobre `#FAFAFA` | 5,11:1 ✅ | Texto secundário no light |
| Laranja sobre `#0A0A0A` | 5,95:1 ✅ | Valor de ganho, rótulo ativo |

### Cores de status
Mesma regra do web: **estado = texto + ícone + tom neutro**; laranja = "precisa de ação agora" (oferta, cliente ausente, ação pendente de envio); vermelho só para erro e confirmação destrutiva; **sem verde**.

---

## 3. Tipografia mobile

Inter (`@expo-google-fonts/inter`: 400, 500, 600, 700) e JetBrains Mono (`@expo-google-fonts/jetbrains-mono`: 400) carregadas com `expo-font` antes de esconder a splash.

Escala pensada para **leitura em movimento** (maior que o web):

| Estilo | Tamanho / altura | Peso | Uso |
| --- | --- | --- | --- |
| Valor de destaque | 32 / 38 | 700, `tabular-nums` | Ganho da oferta, dinheiro em mãos |
| Título de tela | 22 / 28 | 700 | "Parada 2 de 3", "Nova rota" |
| Título de card | 17 / 24 | 600 | Nome do cliente, nome do restaurante |
| Corpo | 16 / 24 | 400 | Endereço, instruções |
| Secundário | 14 / 20 | 400 | Bairro, forma de pagamento, metadados |
| Eyebrow | 12 / 16, caps, `letterSpacing 1.8` | 600 | "PARADA 2 DE 3", "NOVA ROTA" (laranja só quando é o foco) |
| Botão | 17 / 22 | 600 | Ações |
| Mono | 13 / 18 | 400 | `E-1041`, `R-0013` |

Regras:
- Nada abaixo de **12pt**, e 12pt só em eyebrow.
- Respeitar a fonte ampliada do sistema com `maxFontSizeMultiplier={1.3}`; layouts testados em 130%.
- Endereço nunca truncado em uma linha: quebra em até 3 linhas.

---

## 4. Forma, espaço e toque

| Elemento | Valor |
| --- | --- |
| Botão | altura 56 (primário) / 48 (secundário), `rounded-xl` (12px), largura total |
| Card | `rounded-2xl` (16px), `p-4`, borda `border-border`, sem sombra |
| Badge / chip | `rounded-full`, altura 24 |
| Espaçamento | múltiplos de 8: `gap-2` entre ícone e texto, `gap-4` entre itens, `px-4` nas margens da tela |
| Distância entre dois botões | ≥ 12px (evita toque no vizinho) |
| Zona do polegar | ações nos **40% inferiores** da tela; topo só para informação |

**Profundidade**: igual ao web (Black → Surface → Surface High + borda fina). Sem `elevation`/`shadow` no Android, sem sombra no iOS.

---

## 5. Ícones, som e vibração

- **Lucide** (`lucide-react-native`), `strokeWidth 2`, tamanhos 20 (padrão) e 24 (tab bar, ações).
- **Haptics** (`expo-haptics`): `success` ao concluir entrega e ao aceitar oferta; `warning` em bloqueio (ex.: pagamento não registrado); `selection` ao alternar itens da coleta.
- **Som**: só na **oferta** (canal de notificação Android de alta prioridade com som próprio). Nenhum outro som no app.

---

## 6. Movimento

| Interação | Especificação |
| --- | --- |
| Transição entre telas | padrão nativo da plataforma (Expo Router / React Navigation) |
| Oferta chegando | tela cheia sobe de baixo (250ms) + barra de tempo diminuindo de forma linear |
| Botão pressionado | `scale 0.98` + opacidade 0.9 (feedback imediato, mesmo sem rede) |
| Deslizar para confirmar | trilho com o polegar acompanhando o dedo; ao soltar antes do fim, volta (spring curto) |
| Proibido | animação em loop, skeleton colorido, parallax, transição longa |

`Reduce Motion` do sistema desativa tudo que não é feedback essencial.

---

## 7. Temas

| Opção | Comportamento |
| --- | --- |
| **Escuro** (padrão) | Nativo da marca; economiza bateria em telas OLED |
| **Claro** ("modo dia") | Paper + Ink; melhor sob sol forte para alguns aparelhos; faixa do topo e tab bar continuam escuras (regra da marca) |
| Seguir o sistema | Usa a preferência do aparelho |

Preferência salva no aparelho e alternável em **Perfil → Aparência**, e também por atalho no topo da tela inicial (ícone `sun`/`moon`).
