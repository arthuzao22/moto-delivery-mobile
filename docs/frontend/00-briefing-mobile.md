# 00 — Briefing do app do motoboy (moto-delivery-mobile)

> Versão mobile do briefing de frontend. Mesma marca (Brandbook Zanart Tec), **outra proposta**: o painel web é para quem está sentado em frente ao computador; o app é para quem está **em cima de uma moto**.

## Quem usa e em que condição

| Condição real | Consequência para o design |
| --- | --- |
| Celular preso no suporte do guidão, às vezes com luva | Alvos de toque grandes, ações principais embaixo, ao alcance do polegar |
| Sol forte, tela com brilho no máximo | Contraste alto; nada de texto cinza claro sobre preto; opção de tema claro |
| Olhada rápida em semáforo | Uma informação dominante por tela; números grandes; status legível em 1 segundo |
| Sinal fraco, 4G caindo | O app nunca trava esperando a rede: ação é registrada na hora e enviada depois |
| Bateria importa | Sem animação contínua, sem mapa renderizado dentro do app, tela escura por padrão |
| Toque acidental em buraco/lombada | Ações irreversíveis exigem gesto deliberado (deslizar), não um toque |
| Ganha por entrega | Velocidade: aceitar oferta é **um** toque; ganho aparece antes de aceitar |

## O que o app precisa transmitir

Mesmo princípio da Zanart ("produto bem-feito, zero decoração"), traduzido para o motoboy:

- **Clareza**: o que fazer agora, sem pensar.
- **Confiança**: o que ele ganhou e por quê (memória de cálculo visível).
- **Velocidade**: nada entre ele e a próxima entrega.
- **Respeito**: linguagem direta, de parceiro ("Você ganhou R$ 7,00 nesta entrega"), nunca de chefe.

## Requisitos (adaptados do briefing original)

1. **Identidade Zanart**: paleta, Inter, ícones Lucide e regras do brandbook — incluindo as específicas de app (status bar sempre escura, bottom navigation preta com borda `#222`, item ativo com rótulo laranja, botão primário de largura total fixo na safe area, alvo mínimo 44px).
2. **Biblioteca**: **React Native Reusables** (o equivalente do shadcn/ui para React Native) sobre **NativeWind**, com os componentes copiados para o projeto e personalizados com os tokens da Zanart.
3. **Minimalismo**: uma ação dominante por tela; nada de cards gigantes, sombras, gradientes ou excesso de informação.
4. **Temas**: escuro (padrão da marca), claro e "seguir o sistema", com preferência persistida.
5. **Responsividade mobile**: telas de 360 a 430pt de largura, Android e iOS, fonte do sistema ampliada até 130% sem quebrar layout, orientação retrato.
6. **Sem funcionalidade fictícia**: cada botão chama a API real (`/api/v1/app/*`) ou abre um app real (Waze, discador, câmera).
7. **Arquitetura**: respeitar a estrutura do repositório e a regra de que **a API é a dona das regras** — o app exibe `acoesPermitidas` e valores calculados pela API, nunca calcula.

Detalhes em `01-identidade-visual-mobile.md`, `02-telas-e-navegacao-mobile.md` e `03-plano-de-implementacao-mobile.md`.
