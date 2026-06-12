# Roadmap · HMC

> 4 fases · MVP → Polish → Mobile → Advanced.

---

## Fase 1 — MVP (3-4 meses)

**Objetivo:** levar primeiros 10-30 High Mentors ao ar com Studio funcional + Clube básico + fluxo mentorado completo.

**Marcos:** lançamento privado em junho 2026 com Codex Vol I (Founding Edition).

### Backend
- Schema `clube` no Supabase `febracis-dre` + migrations
- RLS tier-based completo
- Supabase Auth com email+senha + magic link
- Capacidades granulares na tabela `capabilities`
- Audit log em todas operações sensíveis
- Inngest setup + primeiros jobs (CISPay webhook handler, payout calc)
- Resend setup + templates transacionais (welcome, candidatura, payment confirmed)

### Frontend Web
- ✅ Landing, catalog, mentor-public, checkout, login, signup mentor (4 steps), signup mentorado
- ✅ Hub, notifications, account
- ✅ Onboarding tour + acesso liberado
- ✅ Candidatura status timeline

### Mundo Studio (mentor)
- ✅ Studio home, mentorias, biblioteca aulas
- ❌ Editor de aula (upload Mux ingestion + metadata)
- ❌ CRM básico (lista de mentorados, status, jornada)
- ❌ Configuração da página pública (`/m/:slug` config)
- ❌ Financeiro básico (próximo payout CISPay + histórico)

### Mundo Mentorado
- ✅ Biblioteca, player Mux, comunidade básica
- ❌ Sessões 1:1 (Cal.com embed)
- ❌ Certificado (versão MVP — só PDF download)

### Mundo Clube
- ✅ Sala do Membro, Council read-only, Codex read-only, Seal Kit
- ❌ Antechamber (link out WhatsApp + log)

### Curator
- ✅ Aprovações fila
- ❌ Dossiê do membro (read + notes privadas)
- ❌ Pipeline financeiro consolidado (versão MVP)

### Auth/Public restantes
- ❌ Forgot/reset password
- ❌ Política privacidade + termos (LGPD)
- ❌ 404 + verification email

### Dev
- ⚠ Dev login switch (wireframe pronto, falta implementar funcional)
- ❌ Audit log viewer

### Integrações
- CISPay webhook + split + payout
- Mux Video ingestion + signed URLs
- Resend transactional emails
- Supabase Storage para selos + evidências

### Mobile
- PWA installable (manifest + service worker)
- **Capacitor wrap NÃO entra no MVP** — vem na Fase 3

---

## Fase 2 — Polish (1-2 meses pós-MVP)

**Objetivo:** completar features que tornam o clube robusto. Primeiro HMC Council em set/2026 com plataforma madura.

### Studio
- Comunidade admin/moderação completa
- Analytics (engajamento, conclusão, dropoff por aula)
- Financeiro detalhado (split detalhado, exportação CSV, fiscal)
- Studio config avançado (custom domain `lucas.hmc.club` opcional)

### Mentorado
- Histórico de pagamentos
- Notas pessoais por aula
- Perfil de progresso (gamification leve)

### Clube
- Cross-Floor completo (publicar vagas, applies, aprovação, cap 20%)
- HMC Yield com integração Salesforce (16% CIS, dashboard, leads pipeline)
- Pilgrimages com RSVP + elegibilidade automática
- Perfil público do High Mentor (`/clube/codex/:slug`)
- HMC Summit detalhado por edição

### Curator
- Pipeline financeiro consolidado completo
- Analytics global (LTV, churn, NPS, cohort retention)
- Council agenda + host tools (live session management)
- Codex publishing (decretos PV, "Palavra do Curador" mensal)
- Cross-Floor disputes resolution
- Tier promotion workflow (assinado por 3 aprovadores)
- Moderação Antechamber/Comunidades

### Mentorado polish
- Sessões 1:1 com lembretes + reagendamento
- Certificado verificável online (página pública com QR)

### Integrações novas
- Salesforce (CIS — leads, conversões, comissões)
- Meilisearch (Codex, Cross-Floor, biblioteca search)
- PostHog (funnels + session replay + feature flags)
- Sentry (errors web + mobile)

---

## Fase 3 — Mobile Launch (1-2 meses)

**Objetivo:** publicar apps iOS + Android via Capacitor + push notifications + biometria.

### Capacitor setup
- Monorepo Turborepo: `apps/web`, `apps/mobile`, `packages/ui`, `packages/domain`, `packages/config`
- Capacitor shell + plugins essenciais (`push-notifications`, `biometric-auth`, `share`, `deep-links`, `browser`, `filesystem`)
- iOS build + Apple Developer account + provisioning
- Android build + Google Play Console
- Test flight com primeiros High Mentors Tier III como beta

### Features mobile-specific
- Push notifications via FCM (Android) + APNs (iOS)
  - Topics: `council`, `pilgrimage`, `yield`, `cross_floor`, `new_enrollment`
- Biometria login (Face ID / fingerprint)
- Deep links (`hmc://clube/codex/seat-12`, `hmc://m/aula/123`)
- Mux offline downloads (DRM via Mux Signed URLs com cache local)
- Native share sheet (compartilhar mentor public profile)
- In-app browser para CISPay (não sai do app)

### Submission
- App Store Connect submission (review ~7 dias)
- Play Console submission (review ~3 dias)
- Marketing launch coordenado web + mobile

---

## Fase 4 — Advanced (TBD, após 12 meses operação)

**Objetivo:** features de governança avançada + escala internacional.

### The Bridge (Tier III only)
- Catálogo de franquias do ecossistema PV
- Pipeline de indicação Tier III → franquia
- Dashboard de comissionamento (estrutura específica a definir com PV + rede de franquias)
- Integração bidirecional com sistema franquias do ecossistema PV

### Codex generation automatizada
- Job anual via Inngest cron (1º de janeiro)
- Geração PDF via **Typst** (skill `universal-docs`)
- Estrutura: prefácio editável + manifesto + agenda do ano + página por conselheiro + stats + fechamento
- Saída em PDF impressão premium + distribuição digital
- Aprovação por PV antes de publicar

### Curator's Address ao vivo
- Mux Live + chat Realtime
- RSVP + lembretes
- Recording arquivado
- Acesso a todos mentorados (não só High Mentors)

### IA curatorial
- Embeddings de bio/atuação dos membros → sugestão de conexões "you might like to meet"
- Análise de churn risk em mentorados (PostHog cohort + LLM signals)
- Sumarização automática de Council para "atas privadas"

### Internacionalização
- Multi-idioma (pt-BR default, en, es)
- HMC Summit em localizações internacionais (Florença, Patagônia, Davos, Tóquio)
- Currency conversion para pagamentos internacionais

### Escala
- White label para clubes irmãos do ecossistema PV (se PV expandir o modelo)
- Multi-tenant prep (vários clubes na mesma plataforma)
- Geo-replicação Postgres se latência LATAM for issue

---

## Timeline visual

```
2026 Q2 ─────────────────── MVP (3-4 meses)
        🚀 jun 2026         ↳ anúncio inaugural + Codex Vol I
        🏛 jul 2026         ↳ The House peregrinação (não exige plataforma mobile ainda)

2026 Q3 ─────────────────── Polish (1-2 meses)
        🎯 set 2026         ↳ primeiro HMC Council oficial — plataforma robusta

2026 Q4 ─────────────────── Mobile Launch (1-2 meses)
        🏛 dez 2026         ↳ Inter Business — app mobile completo

2027 Q1 ─────────────────── Advanced features iniciam
        📖 jan 2027         ↳ Codex Vol II (primeiro anuário automatizado)
        🤝 Q1-Q2            ↳ The Bridge em produção

2027 Q3+ ────────────────── Internacionalização + IA curatorial + escala
        🌍 Q3 2027          ↳ HMC Summit internacional + multi-idioma
```

---

## Critérios de Go/No-Go por fase

### Para shipar MVP
- ✅ Auth completa funcional
- ✅ CISPay processando primeiro pagamento real
- ✅ Mux ingestion + player funcionando em todos browsers + mobile web
- ✅ Pelo menos 3 High Mentors testaram Studio completo (criar mentoria → publicar → vender)
- ✅ Pelo menos 5 mentorados testaram fluxo (descobrir → comprar → consumir → comentar comunidade)
- ✅ Curator aprovou pelo menos 1 candidato via plataforma
- ✅ Audit log registrando 100% das ações sensíveis
- ✅ LGPD: política + termos publicados, opt-in cookies, delete account funcional
- ✅ Sentry capturando 0 critical errors em produção por 7 dias seguidos
- ✅ Performance: LCP < 2.5s em catalog + mentor-public em 4G

### Para shipar Polish
- Cross-Floor com 5 vagas trocadas reais
- HMC Yield calculando 16% CIS com Salesforce ao vivo
- Pelo menos 1 Council mensal completo via plataforma (RSVP + execução + post)
- Curator analytics mostrando NPS > 60 nas primeiras cohorts

### Para shipar Mobile
- Apps publicados na App Store + Play Console
- 80%+ dos High Mentors testaram app antes do launch público
- Push notifications testadas em 3 países (BR, EUA, EU)
- Performance: cold start mobile < 3s, primeira aula carregada < 5s em 4G

### Para shipar Advanced features
- Operação estável de 12 meses
- Pelo menos 1 ciclo completo de promoção Tier I → II ou II → III via plataforma
- Codex Vol II gerado automaticamente e aprovado por PV
- Bridge testado com 3 indicações reais para franquias do ecossistema PV

---

**Última atualização:** 2026-06-03
