# Mapa de Telas · HMC

> Reconciliação 2026-06-11 (9ª rodada): diagnóstico completo + 4 bugs críticos fechados.
> Cache global **v=16** · 100% das 60 mode-pages carregam `_persona.js` · RBAC client-side garantido.
> Status: ✅ feita · ⚠ parcial · ❌ falta

---

## Resumo executivo

| Área | Total escopo | Feitas | Faltam |
|---|---|---|---|
| Público (00-public + raiz) | 12 | 11 ✅ | 1 ⚠ |
| Auth + onboarding | 12 | 12 ✅ | 0 |
| Estados / Erros | 5 | 5 ✅ | 0 |
| Hub / global (por papel) | 9 | 9 ✅ | 0 |
| Mundo Clube (10-clube) | 18 | 18 ✅ | 0 |
| Studio (20-mentor) | 15 | 15 ✅ | 0 |
| Mentorado (30-mentorado) | 11 | 11 ✅ | 0 |
| Curator (40-curator) | 16 | 16 ✅ | 0 |
| Curadoria PV (raiz) | 2 | 2 ✅ | 0 |
| Manual / Bíblia | 1 | 1 ✅ | 0 |
| Dev (`_dev/*`) | 4 | 4 ✅ | 0 |
| **TOTAL** | **105** | **104 ✅** | **1 ⚠** |

⚠ pendente: `/_status` (página de health pública — adiada pra Polish, não MVP).

**Telas adicionadas na 8ª/9ª rodada (6):**
- `hub-pv.html` — Hub exclusivo do The Curator (PV) com 6 KPIs + mesa curatorial + fila PV-only
- `hub-suporte.html` — Hub do time de suporte (Beatriz Lima) com fila SLA-sorted + moderação
- `antechamber-pv.html` — Lado PV do Antechamber (lista lateral + thread + composer)
- `curator-address-editor.html` — Editor de carta mensal do PV com toolbar, auto-save, sidebar de arquivo
- `candidatura-recusada.html` — Carta pessoal de PV em caso de "agora não" + rota MELID + reaplicação em 12m
- `manual.html` — **Bíblia do produto** · TOC com 15 seções, glossário A-Z com 25+ termos, RBAC matrix, 5 rituais, 4 processos. Acessível pelo dev-login (card dourado).

**Bugs críticos corrigidos na 9ª rodada:**
- ✅ Cache busting completo (321 refs sem versão → `?v=16`)
- ✅ `_persona.js` injetado em 42 mode-pages que faltavam (/20-mentor/, /30-mentorado/, /40-curator/) — RBAC client-side funcional em 100%
- ✅ `candidatura-recusada.html` linkada via dev-login + simulador de cenário no candidatura-status

---

## Matriz RBAC oficial

| Persona | Hub | Clube | Studio | Estudos | Curator |
|---|---|---|---|---|---|
| Visitante (não logado) | — | — | — | — | — |
| Mariana · mentorada pura | `hub-mentorado` | — | — | ✓ | — |
| Lucas · multi-role (mentor + member + mentorado) | `hub` | ✓ Tier II | ✓ | ✓ | — |
| Bruno · mentor puro | `hub` | ✓ Tier II | ✓ | — | — |
| Carlos · Tier III · Sovereign Mentor | `hub` | ✓ +Antechamber +Bridge | ✓ | — | — |
| Michelle · Time Curator | `hub-curator` | — | — | — | ✓ Full |
| Paulo Vieira · The Curator (founder) | `hub` | ✓ The Curator | — | — | ✓ Super |

**Enforcement em produção:** Supabase RLS tier-based + JWT validado no NestJS + Cloudflare Worker (`apps/edge`) com IP allowlist. Mode-switch é renderizado server-side baseado em `user.capabilities` — membros sem permissão veem `403-forbidden.html` ao tentar URL inválida.

**Mode-switch por papel (wireframe):**
- Mentorado puro → `[Hub, Estudos]` (2 pills)
- Curator → `[Hub, Curator]` (2 pills)
- Mentor / Member / Multi-role → `[Hub, Clube, Studio, Estudos]` (4 pills 2x2)

**Auditoria de integridade (4ª rodada · 2026-06-03):**
- ✅ Cross-check Python de `href=...html` resolvido por filesystem real → **zero links quebrados** em 96 HTMLs
- ✅ Cross-check de `href="#"` → **zero botões mortos**
- ✅ Cross-check de versão de cache `?v=12` → **100% consistente**

**Telas adicionadas nesta rodada (5):**
- `hub-mentorado.html` — Hub simplificado pra mentorado puro (Mariana). Mode-switch só Hub + Estudos.
- `hub-curator.html` — Hub específico pro time Curator (Michelle). Mode-switch só Hub + Curator + fila do dia + 16 áreas admin.
- `403-forbidden.html` — Acesso restrito (autenticado sem permissão). RLS deny + audit log + fallback pra Hub do papel.
- `session-expired.html` — Sessão expirou por inatividade. Mantém rascunho local + re-login na mesma conta.
- `logout.html` — Saída intencional com checklist de limpeza (cookies, JWT, audit).

**RBAC aplicado em massa nesta rodada:**
- 11 páginas `30-mentorado/*` — mode-switch reduzido pra `[Hub, Estudos]` (removido Clube e Studio que mentorado puro não acessa)
- 16 páginas `40-curator/*` — mode-switch reduzido pra `[Hub, Curator]` (removido Clube/Studio/Estudos)
- Sidebar mentorado: persona MS unificada (era LV em sessoes-1-1 por inconsistência)
- Sidebar 30-mentorado: Hub → `hub-mentorado.html`
- Sidebar 40-curator: Hub → `hub-curator.html`

---

## Público (`/`, `00-public/`, raiz)

| # | Tela | Rota | Arquivo | Status |
|---|---|---|---|---|
| 1 | Landing HMC | `/` | `landing.html` | ✅ |
| 2 | Index / map institucional | `/index` | `index.html` | ✅ |
| 3 | Catálogo de mentores | `/mentores` | `00-public/catalog.html` | ✅ |
| 4 | Página pública do mentor | `/m/:slug` | `00-public/mentor-public.html` | ✅ |
| 5 | Checkout CISPay | `/checkout/:program` | `00-public/checkout.html` | ✅ |
| 6 | Institucional sobre Tiers | `/tiers` | `tiers.html` | ✅ |
| 7 | Política Privacidade (LGPD) | `/legal/privacidade` | `privacidade.html` | ✅ |
| 8 | Termos de Uso | `/legal/termos` | `termos.html` | ✅ |
| 9 | Esqueci senha | `/auth/forgot` | `forgot-password.html` | ✅ |
| 10 | Reset senha | `/auth/reset/:token` | `reset-password.html` | ✅ |
| 11 | Verificação email | `/auth/verify/:token` | `verify-email.html` | ✅ |
| 12 | 404 | `*` | `404.html` | ✅ |
| 13 | Status / health | `/_status` | — | ⚠ Polish |

---

## Auth + Onboarding

| # | Tela | Rota | Arquivo | Status |
|---|---|---|---|---|
| 14 | Login | `/login` | `login.html` | ✅ |
| 15 | Signup (gate) | `/signup` | `signup.html` | ✅ |
| 16 | Signup mentorado | `/signup/mentorado` | `signup-mentorado.html` | ✅ |
| 17 | Signup mentor 1 | `/signup/mentor?step=1` | `signup-mentor-1.html` | ✅ |
| 18 | Signup mentor 2 | `/signup/mentor?step=2` | `signup-mentor-2.html` | ✅ |
| 19 | Signup mentor 3 | `/signup/mentor?step=3` | `signup-mentor-3.html` | ✅ |
| 20 | Signup mentor 4 | `/signup/mentor?step=4` | `signup-mentor-4.html` | ✅ |
| 21 | Candidatura status | `/candidatura/status` | `candidatura-status.html` | ✅ |
| 22 | Onboarding tour | `/onboarding` | `onboarding.html` | ✅ |
| 23 | Acesso liberado | `/acesso-liberado` | `acesso-liberado.html` | ✅ |

---

## Hub global (pós-login)

| # | Tela | Rota | Arquivo | Status |
|---|---|---|---|---|
| 24 | Hub central | `/hub` | `hub.html` | ✅ |
| 25 | Notificações | `/notifications` | `notifications.html` | ✅ |
| 26 | Agenda agregada | `/agenda` | `agenda.html` | ✅ |
| 27 | Buscar global | `/buscar` | `buscar.html` | ✅ |
| 28 | Account / Settings | `/account` | `account.html` | ✅ |

---

## Mundo Clube (`/clube/*`)

| # | Tela | Rota | Arquivo | Status |
|---|---|---|---|---|
| 29 | Sala do Membro | `/clube` | `10-clube/01-dashboard.html` | ✅ |
| 30 | Council (calendário) | `/clube/council` | `10-clube/02-calendar.html` | ✅ |
| 31 | Codex | `/clube/codex` | `10-clube/03-codex.html` | ✅ |
| 32 | Codex entry | `/clube/codex/:slug` | `10-clube/codex-entry.html` | ✅ |
| 33 | Cross-Floor marketplace | `/clube/cross-floor` | `10-clube/04-cross-floor.html` | ✅ |
| 34 | HMC Yield | `/clube/yield` | `10-clube/05-yield.html` | ✅ |
| 35 | Pilgrimages catálogo | `/clube/pilgrimages` | `10-clube/06-pilgrimages.html` | ✅ |
| 36 | Pilgrimage detail | `/clube/pilgrimages/:id` | `10-clube/pilgrimage-detail.html` | ✅ |
| 37 | HMC Summit por edição | `/clube/summit/:id` | `10-clube/summit-edicao.html` | ✅ |
| 38 | HMC Seal Kit | `/clube/seal` | `10-clube/07-seal.html` | ✅ |
| 39 | Perfil Tier (próx promoção) | `/clube/perfil-tier` | `10-clube/perfil-tier.html` | ✅ |
| 40 | Os Quatro Motores (Tier III) | `/clube/quatro-motores` | `10-clube/quatro-motores.html` | ✅ |
| 41 | Antechamber (Tier III) | `/clube/antechamber` | `10-clube/antechamber.html` | ✅ |
| 42 | Curator's Address (Tier III) | `/clube/curator-address` | `10-clube/curator-address.html` | ✅ |
| 43 | The Bridge (Tier III) | `/clube/bridge` | `10-clube/bridge.html` | ✅ |
| 44 | Council replay | `/clube/council/:id/replay` | `10-clube/council-replay.html` | ✅ |

---

## Studio (`/studio/*`)

| # | Tela | Rota | Arquivo | Status |
|---|---|---|---|---|
| 45 | Studio home | `/studio` | `20-mentor/studio-home.html` | ✅ |
| 46 | Minhas mentorias | `/studio/mentorias` | `20-mentor/mentorias.html` | ✅ |
| 47 | Mentoria detail | `/studio/mentorias/:id` | `20-mentor/mentoria-detail.html` | ✅ |
| 48 | Biblioteca de aulas | `/studio/aulas` | `20-mentor/aulas-biblioteca.html` | ✅ |
| 49 | Editor de aula | `/studio/aulas/nova` | `20-mentor/aula-edit.html` | ✅ |
| 50 | CRM de mentorados | `/studio/crm` | `20-mentor/mentorados.html` | ✅ |
| 51 | Mentorado detail | `/studio/crm/:id` | `20-mentor/mentorado-detail.html` | ✅ |
| 52 | Comunidade admin | `/studio/comunidade` | `20-mentor/comunidade.html` | ✅ |
| 53 | Sessões 1:1 | `/studio/sessoes` | `20-mentor/sessoes-1-1.html` | ✅ |
| 54 | Receitas + payouts | `/studio/receitas` | `20-mentor/receitas.html` | ✅ |
| 55 | Checkout builder | `/studio/checkout` | `20-mentor/checkout-builder.html` | ✅ |
| 56 | Cupons | `/studio/cupons` | `20-mentor/cupons.html` | ✅ |
| 57 | Página pública (vitrine) | `/studio/vitrine` | `20-mentor/pagina-publica.html` | ✅ |
| 58 | Configurações Studio | `/studio/config` | `20-mentor/configuracoes.html` | ✅ |
| 59 | Integrações | `/studio/integracoes` | `20-mentor/integracoes.html` | ✅ |

---

## Mentorado (`/m/*`)

| # | Tela | Rota | Arquivo | Status |
|---|---|---|---|---|
| 60 | Biblioteca | `/m/biblioteca` | `30-mentorado/biblioteca.html` | ✅ |
| 61 | Curso detail (Netflix) | `/m/curso/:id` | `30-mentorado/curso-detail.html` | ✅ |
| 62 | Player Mux | `/m/aula/:id` | `30-mentorado/player.html` | ✅ |
| 63 | Comunidade | `/m/comunidade` | `30-mentorado/comunidade.html` | ✅ |
| 64 | Sessões 1:1 | `/m/sessoes` | `30-mentorado/sessoes-1-1.html` | ✅ |
| 65 | Notas pessoais | `/m/notas` | `30-mentorado/notas.html` | ✅ |
| 66 | Progresso | `/m/progresso` | `30-mentorado/progresso.html` | ✅ |
| 67 | Certificados | `/m/certificados` | `30-mentorado/certificados.html` | ✅ |
| 68 | Pagamentos | `/m/financeiro` | `30-mentorado/pagamentos.html` | ✅ |
| 69 | Suporte | `/m/suporte` | `30-mentorado/suporte.html` | ✅ |

---

## Curator (`/curator/*`)

| # | Tela | Rota | Arquivo | Status |
|---|---|---|---|---|
| 70 | Aprovações | `/curator/aprovacoes` | `40-curator/aprovacoes.html` | ✅ |
| 71 | Candidato dossiê | `/curator/aprovacoes/:id` | `40-curator/candidato-dossie.html` | ✅ |
| 72 | Membros ativos | `/curator/membros` | `40-curator/membros-ativos.html` | ✅ |
| 73 | Promoções de Tier | `/curator/promocoes` | `40-curator/tier-promotion.html` | ✅ |
| 74 | Disputas Cross-Floor | `/curator/disputes` | `40-curator/disputas-cross-floor.html` | ✅ |
| 75 | Moderação | `/curator/moderacao` | `40-curator/moderacao.html` | ✅ |
| 76 | Financeiro consolidado | `/curator/financeiro` | `40-curator/financeiro-consolidado.html` | ✅ |
| 77 | Yield CIS | `/curator/yield` | `40-curator/yield-cis.html` | ✅ |
| 78 | Analytics global | `/curator/analytics` | `40-curator/analytics-clube.html` | ✅ |
| 79 | Council host | `/curator/council` | `40-curator/council-admin.html` | ✅ |
| 80 | Pilgrimages admin | `/curator/pilgrimages` | `40-curator/pilgrimages-admin.html` | ✅ |
| 81 | Codex publishing | `/curator/codex` | `40-curator/codex-publishing.html` | ✅ |
| 82 | Antechamber admin | `/curator/antechamber` | `40-curator/antechamber-admin.html` | ✅ |
| 83 | Logs auditoria | `/curator/logs` | `40-curator/logs.html` | ✅ |
| 84 | Suporte admin | `/curator/suporte` | `40-curator/suporte-admin.html` | ✅ |
| 85 | Config admin | `/curator/config` | `40-curator/config-admin.html` | ✅ |

---

## Dev (`/_dev/*`)

| # | Tela | Rota | Arquivo | Status |
|---|---|---|---|---|
| 86 | Dev login switch | `/_dev/login` | `dev-login.html` | ✅ |
| 87 | Feature flags | `/_dev/flags` | `_dev/feature-flags.html` | ✅ |
| 88 | Seed / reset data | `/_dev/seed` | `_dev/seed-data.html` | ✅ |
| 89 | Audit log viewer | `/_dev/audit` | `_dev/audit-viewer.html` | ✅ |

---

## Notas técnicas por área

- **Telas com upload pesado** (aulas Mux, evidências candidatura, selo download): usar Supabase Storage com RLS + signed URLs TTL 4h
- **Telas com listas longas** (Codex 100+ membros, Cross-Floor): paginação cursor-based + Meilisearch
- **Telas com realtime** (Council chat, Antechamber espelho, notifications): Supabase Realtime
- **Telas com formulários complexos** (signup-mentor-4 etapas, candidatura): React Hook Form + Zod schema sharing via `packages/domain`
- **Telas com cálculo financeiro** (Yield, Studio financeiro, Curator financeiro): jobs Inngest noturnos + cache via Supabase

---

## Histórico de atualizações

- **2026-06-03 (1ª pass — reconciliação):** Identificadas 30+ telas existentes não-listadas no doc anterior. Doc atualizado pra refletir filesystem real.
- **2026-06-03 (2ª pass — implementação):** 17 telas faltantes criadas: 7 público/auth/legal + 4 clube Tier III + 2 mentorado + 1 curator + 3 dev. Sidebars das 12 páginas clube + 8 mentorado + 15 curator atualizadas em massa. Cross-check de integridade: zero links quebrados.

**Última atualização:** 2026-06-03 (89/90 telas implementadas · `_status` adiado pra Polish)
