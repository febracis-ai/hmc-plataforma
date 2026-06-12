# Jornadas por Tipo de Usuário · HMC

> Compilado em 2026-06-10 após 8ª rodada de auditoria.
> 99 HTMLs · 0 links quebrados · 0 botões mortos · 7 telas persona-aware.

---

## Resumo executivo

| Persona | Acesso | Hub | Quantos modos | Implementado? |
|---|---|---|---|---|
| **Visitante** (público) | landing, catalog, mentor-public, checkout, tiers, legal | — | 0 | ✅ 100% |
| **Candidato em análise** | candidatura-status, acesso-liberado, onboarding | — | 0 | ✅ 100% |
| **Mentorado puro** (Mariana) | hub-mentorado + 30-mentorado/* | hub-mentorado | 2 (Hub + Estudos) | ✅ |
| **Mentor puro** (Bruno) | hub + 10-clube + 20-mentor | hub | 3 (Hub + Clube + Studio) | ⚠ Hub mostra 3 mundos hardcoded |
| **Multi-role** (Lucas) | hub + 10-clube + 20-mentor + 30-mentorado | hub | 4 (todos) | ✅ |
| **Tier III** (Carlos) | tudo do mentor + Antechamber + Bridge + Curator's Address | hub | 3 + áreas exclusivas | ✅ Telas existem · sidebar precisa ajuste pra ele |
| **Curator/Admin** (Michelle) | hub-curator + 40-curator/* | hub-curator | 2 (Hub + Curator) | ✅ |
| **Founder** (PV) | hub + clube + 40-curator (super admin) | hub | 3 (Hub + Clube + Curator) | ⚠ Reusa telas do Michelle · falta personalização |
| **Time produto / Dev** | dev-login + _dev/* | dev-login | Acesso transversal | ✅ Read-only |
| **Suporte** | subset do Curator (moderação + suporte-admin + tickets) | hub-curator | 1 (subset Curator) | ❌ Não tem persona registrada |

---

## 1. Visitante (não logado · público)

**Quem é:** Alguém que chega via landing page, anúncio, indicação. Não tem conta.

**Tela inicial:** [`landing.html`](../landing.html)

**Jornadas:**

### 1.1. Descobrir o HMC (passivo)
```
landing.html
  ├─→ #o-clube (anchor) · "Não é uma escola. É uma mesa"
  ├─→ #mentores-ativos · 12 cadeiras + carrossel
  ├─→ #a-plataforma · 4 features
  ├─→ #como-funciona · 4 etapas
  └─→ #quem-entra-nao-sai · CTA final
```

### 1.2. Explorar catálogo
```
landing.html → 00-public/catalog.html
  └─→ 00-public/mentor-public.html (página individual do mentor)
       └─→ 00-public/checkout.html (compra como mentorado)
            └─→ acesso-liberado.html → 30-mentorado/biblioteca.html
```

### 1.3. Aplicar como mentor (jornada principal)
```
landing.html → signup.html (V2 com 3 opções)
  ├─→ [Mentor existente] signup-mentor-1.html → 2 → 3 → 4
  │    └─→ candidatura-status.html
  │         └─→ acesso-liberado.html → onboarding.html → hub.html
  ├─→ [Aspirante mentor] melid-bridge.html → LP externa MELID
  └─→ [Mentorado] signup-mentorado.html → checkout → biblioteca
```

### 1.4. Páginas legais
- `tiers.html` (sobre os 3 tiers)
- `privacidade.html` (LGPD)
- `termos.html` (Termos de Uso)

**A/B tests ativos:** `signup.html` (V2) · `signup-v1-2opcoes.html` (V1) · `signup-v3-construir.html` (V3) — pra decisão do time.

---

## 2. Candidato em análise

**Quem é:** Aplicou como mentor, está coletando endorsos ou em revisão da curadoria.

**Jornada:**
```
signup-mentor-4.html (finalizou candidatura)
  └─→ candidatura-status.html (timeline em tempo real)
       ├─→ [aprovado] acesso-liberado.html
       │    └─→ onboarding.html (tour 4 etapas)
       │         └─→ hub.html (multi-role)
       ├─→ [reprovado] — falta tela explícita ❌
       └─→ [em revisão] mantém status timeline
```

**Gap:** falta tela de "candidatura recusada" com explicação curatorial + sugestão de MELID.

---

## 3. Mentorado puro (Mariana Souza)

**Quem é:** Comprou mentoria de algum mentor do HMC. Não opera mentoria própria nem é membro do clube.

**Acessa:** `hub-mentorado.html` + `30-mentorado/*` (11 telas)

**Mode-switch:** 2 pills (Hub · Estudos)

**Jornadas:**

### 3.1. Login → Hub
```
login.html → hub-mentorado.html
  ├─→ Continue de onde parou (player)
  ├─→ Card "Seu progresso" → 30-mentorado/progresso.html
  ├─→ Card "Próxima 1:1" → 30-mentorado/sessoes-1-1.html
  └─→ Card "Comunidade" → 30-mentorado/comunidade.html
```

### 3.2. Consumir curso
```
hub-mentorado → biblioteca.html (lista cursos)
  └─→ curso-detail.html (Netflix-style)
       ├─→ player.html (aula)
       ├─→ comunidade-canal.html (dúvidas do canal)
       ├─→ notas.html (suas anotações)
       └─→ sessoes-1-1.html (agendar 1:1)
```

### 3.3. Conta + suporte
```
account.html (segurança, LGPD, pagamentos)
30-mentorado/pagamentos.html
30-mentorado/suporte.html
30-mentorado/certificados.html (ao concluir)
```

**Telas que ela vê** (11): biblioteca, curso-detail, player, comunidade, comunidade-canal, sessoes-1-1, notas, progresso, certificados, pagamentos, suporte.

**Não vê:** 10-clube/*, 20-mentor/*, 40-curator/*, _dev/*

**Persona-aware ✓** — sidebar dinâmica via `_persona.js` quando navega pra cross-context (agenda, notifications, buscar, account).

---

## 4. Mentor puro (Bruno Vaz)

**Quem é:** Membro Tier II do clube, opera Studio próprio. Não compra mentoria de outros.

**Acessa:** `hub.html` + `10-clube/*` + `20-mentor/*` (33 telas)

**Mode-switch:** 3 pills (Hub · Clube · Studio) — sem Estudos

**Jornadas:**

### 4.1. Studio (vendas e operação)
```
hub.html → studio-home.html
  ├─→ mentorias.html (criar/editar programas)
  │    └─→ mentoria-detail.html
  │         └─→ aula-edit.html (Mux upload)
  ├─→ aulas-biblioteca.html (gerenciar conteúdo)
  ├─→ mentorados.html (CRM)
  │    └─→ mentorado-detail.html
  ├─→ sessoes-1-1.html (Cal.com)
  ├─→ comunidade.html (moderar canais)
  ├─→ receitas.html (CISPay payouts)
  ├─→ checkout-builder.html
  ├─→ cupons.html
  ├─→ pagina-publica.html (vitrine)
  ├─→ configuracoes.html
  └─→ integracoes.html
```

### 4.2. Clube (rituais)
```
10-clube/01-dashboard.html (sala do membro)
  ├─→ 02-calendar.html (Council mensal)
  │    └─→ council-replay.html
  ├─→ 03-codex.html (anuário)
  │    └─→ codex-entry.html
  ├─→ 04-cross-floor.html (marketplace de vagas)
  ├─→ 05-yield.html (HMC Success Fee · CIS 16%)
  ├─→ 06-pilgrimages.html (eventos)
  │    └─→ pilgrimage-detail.html
  │    └─→ summit-edicao.html
  ├─→ 07-seal.html (kit visual)
  └─→ perfil-tier.html (jornada I → II → III)
```

**Gap crítico Bruno:** Hub.html ainda mostra os 3 mundos hardcoded incluindo "Estudos" (que ele não tem). Persona-aware atualiza a sidebar mas o conteúdo do hub não.

---

## 5. Multi-role (Lucas Vieira) — persona principal

**Quem é:** Mentor Tier II + mentorado de outros mentores + membro do clube.

**Acessa:** TODAS as telas do Mentor + Mentorado + Clube (44 telas)

**Mode-switch:** 4 pills (Hub · Clube · Studio · Estudos)

**Jornadas:**
Igual ao Bruno + a jornada 3 (Mentorado) — mas no mesmo login. Hub.html foi feito pra ele (mostra 3 cards de mundos).

---

## 6. Tier III · Sovereign Mentor (Carlos Ribeiro)

**Quem é:** Membro elevado do Clube. Acessa rituais exclusivos.

**Acessa:** TUDO do mentor + áreas restritas:

### Áreas Tier III exclusivas
| Tela | O que é |
|---|---|
| `10-clube/antechamber.html` | Chat 1:1 PV ↔ membro |
| `10-clube/curator-address.html` | Arquivo das cartas mensais PV |
| `10-clube/curator-letter.html` | Carta individual completa |
| `10-clube/bridge.html` | Marketplace das franquias do ecossistema PV |
| `10-clube/franquia-detail.html` | Detalhe da franquia |
| `10-clube/quatro-motores.html` | Programa de renovação Tier II+ |

**Gap Tier III:** sidebar do clube tem essas opções pra qualquer membro · em produção RLS deve bloquear · em wireframe o `_persona.js` precisa de override de sidebar do mode-clube pra Carlos.

---

## 7. Curator / Admin operacional (Michelle)

**Quem é:** Time de curadoria. Responsável pela operação diária do clube.

**Acessa:** `hub-curator.html` + `40-curator/*` (16 telas)

**Mode-switch:** 2 pills (Hub · Curator)

### 7.1. Fluxo diário (fila do hub)
```
hub-curator.html (queue do dia)
  ├─→ Disputas urgentes → disputas-cross-floor.html
  ├─→ Aprovações 3 pendentes → aprovacoes.html
  │    └─→ candidato-dossie.html (dossiê do candidato)
  ├─→ Moderação 2 reports → moderacao.html
  └─→ Payouts → financeiro-consolidado.html
```

### 7.2. Curadoria estratégica
```
aprovacoes.html (fila + crivo)
membros-ativos.html (CRM dos 68 membros)
tier-promotion.html (pipeline de promoções)
disputas-cross-floor.html (resolução)
moderacao.html (auto-flags + revisão humana)
```

### 7.3. Operação HMC
```
council-admin.html (host do Council mensal)
pilgrimages-admin.html (gestão de eventos)
codex-publishing.html (decretos PV)
antechamber-admin.html (visão sobre chats Tier III · PV approve)
```

### 7.4. Negócio
```
financeiro-consolidado.html (GMV, fee 10%, payouts)
yield-cis.html (atribuição Salesforce)
analytics-clube.html (LTV, churn, NPS, cohort)
```

### 7.5. Plataforma
```
logs.html (audit log filtrável)
suporte-admin.html (tickets dos mentorados)
config-admin.html (fee, regras, feature flags)
```

**Gap Michelle:** Ela não vê o conteúdo do clube como membro · não pode entrar em Antechamber, Codex, Council com voz. Em produção, Curator tem capabilities cruzadas mas no wireframe não foi modelado.

---

## 8. Paulo Vieira · The Curator (founder)

**Quem é:** Founder. Cura, valida, escreve Codex e Curator's Address.

**Acessa:** hub + clube (como The Curator) + 40-curator (super admin)

### Diferenças vs Michelle
- **Antechamber** · ele é o lado oposto de cada chat 1:1 com Tier III
- **Curator's Address** · ele PUBLICA as cartas
- **Codex** · ele assina decretos
- **Approval definitivo** · Michelle filtra · PV decide
- **Vetar tudo** · qualquer ação de Michelle pode ser revertida

**Gap PV:** todas telas dele reusam as do Michelle. Precisaria de:
- View "lado PV" do Antechamber (compose carta)
- Editor de Curator's Address
- Codex publishing como editor (não consumidor)
- Dashboard founder com KPIs estratégicos

---

## 9. Time produto / Dev

**Quem é:** Engenharia + produto. Não tem persona "user" — tem persona "operador da plataforma".

**Acessa:** `dev-login.html` + `_dev/*`

```
dev-login.html (switcher personas + matriz RBAC)
  ├─→ _dev/feature-flags.html
  ├─→ _dev/seed-data.html
  └─→ _dev/audit-viewer.html
```

**Em produção:** acesso bloqueado por IP allowlist + 2FA + role `dev`.

---

## 10. Suporte (gap atual)

**Quem é:** Atendente de tickets dos mentorados. Subset do Curator.

**Deveria acessar:**
- `40-curator/suporte-admin.html` (já existe)
- `40-curator/moderacao.html` (parcial)
- Tickets dos mentorados (não tem tela dedicada)

**Gap:** persona `suporte` não está em `_persona.js` · não tem hub próprio · não tem fluxo de ticket → resolução → fechamento.

---

## Status de implementação por jornada

| Jornada | Telas | Persona-aware | Hub próprio | Gaps |
|---|---|---|---|---|
| Visitante | ✅ 12 telas | N/A | landing | A/B test ativo |
| Candidato | ✅ 3 telas | N/A | candidatura-status | Falta tela "recusado" |
| Mentorado | ✅ 11 telas | ✓ | ✓ hub-mentorado | — |
| Mentor puro | ✅ 33 telas | ✓ | hub.html (compartilhado) | Hub mostra Estudos hardcoded |
| Multi-role | ✅ 44 telas | ✓ | ✓ hub | — |
| Tier III | ✅ 6 áreas extras | ✓ | hub.html | Sidebar Clube não diferencia Tier |
| Curator | ✅ 16 telas | ✓ | ✓ hub-curator | — |
| PV | ⚠ Reusa Curator | ⚠ Parcial | hub.html | Sem editor de Curator's Address · sem dashboard founder |
| Dev/Produto | ✅ 4 telas | N/A | dev-login | — |
| Suporte | ❌ Não modelado | ❌ | ❌ | Persona inexistente |

---

## Gaps críticos pra fechar antes de apresentar

### Prioridade ALTA (afeta apresentação)

1. **Hub.html dinâmico por persona** — atualmente mostra 3 mundos hardcoded (Lucas). Bruno vê card de Estudos errado. Carlos vê hub como Lucas em vez de Tier III. PV vê hub padrão em vez de founder dashboard.

2. **Sidebar Clube tier-aware** — atualmente mostra Antechamber/Bridge/Curator's Address pra qualquer membro. Em produção, Tier I não vê. Em wireframe ainda não tem JS pra filtrar.

3. **Tela "candidatura recusada"** — completar fluxo de candidato com tela de rejeição + sugestão de MELID.

4. **Persona Suporte** — adicionar em `_persona.js` + criar `hub-suporte.html` simples + fluxo de ticket.

5. **PV founder view** — criar `hub-pv.html` ou variantes específicas de:
   - Antechamber (lado PV · responder mensagens)
   - Curator's Address (editor de cartas)
   - Codex (publishing)

### Prioridade MÉDIA (refinamento)

6. **Botões órfãos em ação** (299 botões sem onclick em 61 telas) — completar com modais ou linkar pra telas que não existem:
   - 20-mentor/comunidade.html (24 botões) → modal de criar canal, anúncio, etc
   - 40-curator/aprovacoes.html (15 botões) → modal de exportar dossiê, marcar reunião
   - 20-mentor/mentorias.html (12 botões) → modal de nova mentoria + filtros

7. **PV reusa telas de Michelle** sem diferenciação — precisa overlay ou variantes.

8. **Hub.html não responsivo a persona** — quando Lucas troca pra Bruno via dev-login, o hub.html continua igual.

### Prioridade BAIXA (polish)

9. **Account.html** específico por persona — atualmente é genérico, poderia ter seções diferentes por tipo de usuário.

10. **Telas de erro com contexto de persona** — 403 sempre diz "mentorado", mas Michelle também pode ver 403 em outras situações.

---

## Próximos passos sugeridos (em ordem)

1. **Fix Hub.html dinâmico por persona** (1 sessão · alta) — implementar conteúdo do hub baseado em `HMC_PERSONA.current()`. Eliminar hardcode de 3 mundos.

2. **Persona "suporte" + hub-suporte** (1 sessão · alta) — adicionar no registro, criar tela.

3. **Tier-aware na sidebar 10-clube** (1 sessão · alta) — JS que esconde Antechamber/Bridge/Curator's Address pra não-Tier-III.

4. **Tela "candidatura recusada"** (30 min · alta) — fechar fluxo candidato.

5. **PV view dedicada** (2 sessões · média) — hub-pv + variantes Antechamber/Curator's Address/Codex.

6. **Modais funcionais** pros 299 botões órfãos (várias sessões · média/baixa) — começar pelos mais usados na demo (comunidade, aprovações).

7. **Doc da apresentação** — após gaps fechados, criar deck com cada jornada visualizada.

---

**Última atualização:** 2026-06-10 (8ª rodada · auditoria estrutural completa)
