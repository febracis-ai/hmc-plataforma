# PRD · HMC — High Mentor Club

> **Product Requirements Document** · v1.0 · 2026-06-03
> Stakeholder principal: **Paulo Vieira** (Curador) · Operação: **Michelle + Sofia** · Build: **Lucas Vieira (IA Tec Febracis)**

---

## 1. Visão do produto

**Em uma frase:** Plataforma SaaS premium onde mentores high-ticket curados pelo Paulo Vieira operam suas mentorias (Studio próprio com checkout proprietário CISPay) enquanto convivem ritualisticamente no clube fechado HMC — sem dependência de Hotmart/Eduzz/Kiwify.

**3 mundos integrados sob a mesma conta:**

1. **Clube** (ritualístico) — Council, Pilgrimages, Codex, Cross-Floor, Success Fee, Antechamber, Seal
2. **Studio** (comerce) — mentor vende mentoria com aulas Mux, checkout CISPay, comunidade Discord-like, CRM de mentorados
3. **Mentorado** (consumo) — Netflix de aulas, sessões 1:1, comunidade, certificado verificável

**Tom institucional:** old money editorial. Aman × Patek Philippe × Goldman Sachs print × Hermès digital. Sem dourado vivo, sem ícones genéricos, sem cards com bordas grossas. Tipografia editorial Cormorant Garamond + Inter.

---

## 2. Personas-alvo

(Detalhamento completo em [03-PERSONAS-GOVERNANCA.md](03-PERSONAS-GOVERNANCA.md))

- **The Curator (Paulo Vieira)** — Curador, não sócio. Voz determinante sobre admissão/expulsão. Não faz mentoria individual nem vende produto de membro.
- **High Mentor** (3 tiers): Mentor of HMC (R$ 25-55k) → High Mentor (R$ 56-85k) → Sovereign Mentor (R$ 86k+)
- **Mentorado** — cliente final de cada High Mentor
- **Time Curadoria** (Michelle + Sofia) — operação de admissão, financeiro, moderação
- **Mentores externos** — candidatos ainda não admitidos
- **Visitante público** — descobre mentores via SEO

---

## 3. Métricas de sucesso (12 meses pós-launch)

| Métrica | Meta MVP | Meta v1 (6m) | Meta v2 (12m) |
|---|---|---|---|
| High Mentors ativos no clube | 10–20 | 40–60 | 100+ |
| Mentorados ativos pagantes | 200 | 1.000 | 5.000 |
| Receita bruta processada via CISPay (mensal) | R$ 500k | R$ 3M | R$ 12M+ |
| HMC Success Fee (16% CIS) gerado mensal | R$ 20k | R$ 100k | R$ 500k+ |
| Cross-Floor — vagas trocadas/mês | 5 | 30 | 150+ |
| Pilgrimages — taxa de RSVP (members elegíveis) | 60% | 75% | 85% |
| Council attendance rate | 70% | 80% | 85% |
| Tier upgrade rate anual | — | 15% | 20% |
| Churn anual de membros | < 10% | < 8% | < 5% |
| NPS membros High Mentor | > 60 | > 75 | > 85 |
| NPS mentorados | > 50 | > 65 | > 75 |
| Tempo médio até primeira aula assistida (mentorado) | < 2h pós-checkout | < 1h | < 30min |
| Conversão visitante → mentorado | 2% | 3% | 5% |
| Conversão candidato mentor → admitido | 25% | 30% | 35% |

---

## 4. Fluxos críticos de negócio

### 4.1 Jornada do High Mentor (admissão → operação)

1. Visitante chega pela landing (`/`) ou indicado por um membro
2. Clica "Iniciar candidatura" → `signup-mentor-1..4` (4 etapas: dados, mentoria, credenciais, revisão)
3. Envia candidatura → status `applicant` → `candidatura-status.html` mostra timeline
4. Time Curadoria (Michelle/Sofia) avalia dossiê via `/curator/aprovacoes`
5. Curador (PV) bate o martelo na próxima Curatoria
6. Aprovado → recebe email com Seat assignment → `onboarding` → `hub` ativado
7. Acessa Studio, sobe aulas via Mux, configura página pública, abre checkout CISPay
8. Conforme mentorados compram, recebe split 90% (10% fee HMC) via CISPay
9. Participa mensalmente do Council, vê Codex, recebe Success Fee CIS, decide vagas Cross-Floor

### 4.2 Jornada do Mentorado (descoberta → consumo)

1. Visitante chega ao `catalog.html` (SEO, indicação, etc.)
2. Click num mentor → `mentor-public.html` (Netflix preview com 3 aulas grátis + pricing)
3. Click "Quero a mentoria" → `signup-mentorado.html` (3 campos) → `checkout.html` (CISPay)
4. Confirma pagamento → `acesso-liberado.html` → `biblioteca.html` (área restrita)
5. Consome aulas via player Mux, agenda sessões 1:1 (Cal.com), entra na comunidade Discord-like
6. Recebe Curator's Address mensal (PGR de PV aberto aos mentorados de membros)
7. Pode ser oferecido em Cross-Floor a outro membro (consentimento explícito)
8. Conclui programa → certificado verificável com QR + selo HMC

### 4.3 Jornada do Curador (governança)

1. PV acessa `/curator` → dashboard de aprovações + dossiês + financeiro consolidado
2. Aprova/veta candidatos na Curatoria mensal (presencial ou via plataforma)
3. Edita "Palavra do Curador" mensal que aparece no dashboard de cada membro
4. Conduz Council mensal (gerencia agenda via `/curator/council`)
5. Promove/demociona High Mentors entre tiers (workflow assinado)
6. Decreta inclusões no Codex anual (Founding Edition em jun/26)
7. Modera Antechamber (link out p/ WhatsApp + log)

### 4.4 Fluxo financeiro CISPay

```
Mentorado paga R$ 6.800/mês  ──CISPay──┬── 10% (R$ 680) → HMC house fee
                                       └── 90% (R$ 6.120) → High Mentor (cartão/PIX/boleto)

Mentorado entra em Método CIS via link único do membro:
  Vendido por R$ X → 16% comissão → HMC Success Fee do membro
  (independente do split do Studio, paga separado pelo Financeiro Febracis)
```

---

## 5. Escopo do MVP (3-4 meses)

**Dentro:** auth Supabase, RBAC tier-based, signup/onboarding completos, landing + catalog + mentor-public + checkout CISPay, Studio (CRUD aulas/programas/CRM básico), Mentorado (biblioteca + player Mux + comunidade básica), Clube (dashboard + Council read-only + Codex read + Seal kit), Curator (aprovações + dossiê + notes), notificações email transacional (Resend), audit log, dev-login switch.

**Fora do MVP (entra em V1/V2):**
- Cross-Floor completo (marketplace)
- HMC Success Fee com integração Salesforce
- Pilgrimages com RSVP automático
- The Bridge
- Curator's Address ao vivo (Mux Live)
- Mobile (Capacitor wrap vem em V2)
- Multi-idioma
- IA curatorial (sugestões de conexão)

Detalhamento das fases em [06-ROADMAP.md](06-ROADMAP.md).

---

## 6. Restrições explícitas (out of scope absoluto)

- ❌ **Não é academia ou curso** — sem trilha de aprendizado, sem nota, sem diploma
- ❌ **Não é open marketplace** — entrada por convite + curadoria, pagamento é pré-requisito mas não único filtro
- ❌ **Não é sociedade comum** — Curador escolhe, conecta, mas NÃO compartilha cap table nem responsabilidade jurídica
- ❌ **PV não faz mentoria individual** — relação é com o grupo
- ❌ **PV não vende produtos dos membros**
- ❌ **NUNCA criar novo projeto Supabase** — usar schema `clube` no `febracis-dre`
- ❌ **NUNCA usar** Stripe / Asaas / Pagar.me / Hotmart / Eduzz — só CISPay
- ❌ **NUNCA dourado vivo brilhante** (cliché bancário brasileiro) — só fosco gravado
- ❌ **Sem leão** no símbolo HMC (é símbolo do MELID, descaracterizaria ambos)
- ❌ **Sem emojis** em peça oficial (usar ícones SVG Lucide via `_icons.js`)
- ❌ **Sem dropshadows pesados, gradientes vivos, múltiplas cores de acento**

---

## 7. Constraints técnicos

- **Stack travado:** Next.js 15 + TS + Tailwind / NestJS ou Supabase Edge Functions / Postgres schema `clube` no projeto `febracis-dre` / Supabase Auth com RLS / Vercel + Railway
- **Pagamento:** CISPay (gateway proprietário Febracis) — webhook para confirmar payouts
- **Vídeo:** Mux Video (ingestion + player + analytics + DRM signed URLs TTL 4h)
- **Comunidade:** Discord-like proprietário (Supabase Realtime + channels) — não usar Discord externo
- **Mobile:** Capacitor wrap do PWA Next.js — single codebase
- **LGPD:** dados PII em PT-BR, audit log de toda ação, retention policy 5 anos pra dossiês de candidatura

Detalhamento em [05-STACK-ARQUITETURA.md](05-STACK-ARQUITETURA.md).

---

## 8. Marcos críticos (timeline)

| Data | Marco |
|---|---|
| Jun 2026 | **Anúncio inaugural** + Codex Vol I (Founding Edition) |
| Jul 2026 | The House (peregrinação americana, restrito a quem fez Revolution) |
| Set 2026 | **Primeiro HMC Council oficial** (sessão fundadora) |
| Dez 2026 | Inter Business (peregrinação corporativa) |
| Início 2027 | Codex Vol II (primeiro anuário com membros listados) |
| Anual | HMC Summit (internacional, local definido pela curadoria) |

**Cláusula não-competição** (a confirmar com PV): modelo Flávio Augusto = 10 anos.

---

## 9. Decisões pendentes (precisam validação PV)

| # | Decisão | Quem decide | Quando |
|---|---|---|---|
| 1 | Teto e carência da regra dos 10% do faturamento (Opção B) | PV + jurídico | Antes do lançamento |
| 2 | Critério exato elegibilidade The House | PV + Michelle | Pré-julho 2026 |
| 3 | Estrutura final The Bridge | PV + rede de franquias | Pré-V2 |
| 4 | Cláusula não-competição: 10 anos confirmado? | PV + jurídico | Antes do lançamento |
| 5 | Aprovação final dos nomes de tier (Mentor of HMC / High Mentor / Sovereign Mentor) | PV | Antes do lançamento |
| 6 | Promessa contratual de HMC Summit anual | PV + jurídico | Antes do lançamento |
| 7 | INPI: registrar classes 35, 41, 42 | Michelle + IP advogado | ASAP |
| 8 | Domínios: highmentorclub.com, .com.br, hmc.club, hmcclub.com.br | Lucas + Michelle | ASAP |

---

## 10. Riscos identificados

| Risco | Impacto | Mitigação |
|---|---|---|
| CISPay não estar pronto para split automático | Alto | Negociar antecipação ou implementar fallback manual de payout |
| Mux signed URLs vazarem aulas | Alto | TTL curto (4h), audit log de view, DRM se necessário |
| Tier promotion virar política | Médio | Workflow assinado com 3 aprovadores + criteria documented |
| Cross-Floor virar competição predatória entre membros | Médio | Regras tácitas + moderação Curatoria + cap de 20% |
| Antechamber lotar com mensagens triviais | Médio | Educação: "regras tácitas" + Michelle modera silenciosamente |
| LGPD: dossiês de candidatos rejeitados | Alto | Retention policy 5 anos + opção de delete on demand |
| Churn de membros logo após Founding | Alto | Acompanhamento curatorial trimestral + entrevista de saída |

---

## Changelog de escopo

- **2026-06-03:** Plataforma redirecionada de "clube fechado top-down" para "3 mundos com checkout próprio CISPay". Documentação consolidada em `_DOCS/`. Decisão de mobile híbrido (Capacitor) tomada.
- *(próximas mudanças aqui)*
