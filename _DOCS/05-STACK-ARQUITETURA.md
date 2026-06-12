# Stack + Arquitetura · HMC

> Decisões técnicas + estratégia mobile híbrida + RBAC implementation.

---

## 1. Stack travado (não negociar sem aprovação Lucas)

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript estrito
- **Estilo:** Tailwind CSS (manter design system mono chrome blue)
- **Componentes:** próprios + Radix primitives + shadcn/ui base
- **Forms:** React Hook Form + Zod (schema compartilhado via `packages/domain`)
- **Player vídeo:** `@mux/mux-player-react`

### Backend
- **Opção A:** **NestJS** + Prisma (recomendado se ficar pesado de business logic — Success Fee calc, Cross-Floor matching, Codex generation)
- **Opção B:** **Supabase Edge Functions** (recomendado se ficar leve — CRUD + webhooks CISPay + auth)
- **Recomendação:** começar com **B** (Edge Functions) e migrar para A se a complexidade crescer

### Banco de dados
- **Postgres** no projeto Supabase `febracis-dre` existente (NÃO criar novo projeto)
- **Schema dedicado:** `clube` (não tocar em `public`, `dre`, ou schemas de outros produtos)
- **ORM:** Supabase JS client + Drizzle ORM (se for NestJS) ou Prisma (alternativa)
- **Migrations:** Supabase CLI + `supabase migration new`

### Auth
- **Supabase Auth** com:
  - Email + senha
  - Magic link (preferencial)
  - Social login (Google, LinkedIn) — opcional
  - **RLS tier-based** (impede membro Tier I de acessar dados Tier III)

### Pagamento
- **CISPay** (gateway proprietário Febracis) — webhook + reconciliação
- **NUNCA** Stripe / Asaas / Pagar.me / Hotmart / Eduzz

### Vídeo
- **Mux Video** (ingestion + player + analytics + DRM via signed URLs TTL 4h)
- **Mux Data** (telemetria por aula)

### Hosting
- **Web:** Vercel Pro
- **API (se NestJS):** Railway
- **Edge functions:** Supabase

---

## 2. Stack expansion (peças críticas pra escala)

| Camada | Recomendação | Justificativa |
|---|---|---|
| **CDN / Edge cache** | Vercel Edge Network + ISR | Codex e catálogo público = ISR `revalidate(3600)` |
| **Queue / Background jobs** | **Inngest** | Webhooks CISPay → payout calc, geração de certificado, Mux signed URLs refresh, digest semanal Council. Inngest > BullMQ pq não exige Redis dedicado + retry/replay nativo + observabilidade. |
| **Cron jobs** | **Inngest scheduled functions** | Mesmo runtime das queues — evita 2 sistemas. Crons críticos: digest semanal, Success Fee mensal, Codex annual generation. |
| **Search** | **Meilisearch** (self-host Railway) | Codex (busca por mentor/área), Cross-Floor (vagas), biblioteca de aulas. Meilisearch > Algolia pq custo R$ 0 vs ~R$ 3k/mês p/ <1k membros + LGPD (dados não saem do Brasil). |
| **Email transacional** | **Resend** + React Email | Templates JSX = reuso com Next.js. Welcome, aprovação candidatura, Council reminder, Success Fee payout statement. |
| **Monitoring crashes** | **Sentry** | Cobre crashes web/mobile (Capacitor). Source maps via Vercel integration. |
| **Product analytics + flags** | **PostHog** (cloud ou self-host) | Substitui Vercel Analytics + LaunchDarkly. Funnels (signup mentorado → primeira aula), session replay, feature flags. |
| **Push mobile** | **FCM** (Android) + **APNs** via `@capacitor/push-notifications` | Topics: `council`, `pilgrimage`, `yield`, `cross_floor` |
| **Object storage** | **Supabase Storage** (selos, anuários, evidências) + **Cloudflare R2** (Mux source backups, uploads brutos) | Supabase Storage com RLS pra itens privados; R2 pra storage frio (egress R$ 0) |
| **Realtime** | **Supabase Realtime** | Council chat, Antechamber espelho, notifications, presença em comunidade |
| **Calendário 1:1** | **Cal.com** (self-host Railway ou cloud) | Mentor conecta agenda Google/Outlook; mentorado agenda via iframe |
| **Secrets** | **Doppler** ou **Vercel + Supabase Vault** | CISPay credentials, Mux keys, Salesforce OAuth tokens |
| **Logs / Audit** | Tabela `clube.audit_log` + export diário p/ R2 + Sentry breadcrumbs | LGPD exige rastreabilidade de acesso a PII |
| **Error budgets / SLO** | Sentry + Grafana Cloud (opcional) | SLO 99.9% para checkout, 99.5% pros outros |

---

## 3. Estratégia Mobile Híbrida ⭐

### Recomendação: **Capacitor + PWA + Next.js 15 (single codebase)**

#### Comparação de opções

| Opção | Prós | Contras | Veredito |
|---|---|---|---|
| **Capacitor + PWA** ⭐ | 1 codebase Next.js 15 (App Router) já travado · reuse 100% de UI · plugins nativos (push, biometria, share, deep links) · publica em App Store / Play Store · time-to-market 4-6 semanas pós web | UI precisa respeitar safe-areas iOS/Android · gestos nativos limitados · cold start mais lento que RN | ✅ **Escolhido** |
| React Native + monorepo (Turborepo) | UI verdadeiramente nativa · gestos premium | Reescrita do design system (Tailwind → Nativewind ou Tamagui) · 2 times mentais · 3-5 meses extras · custo alto p/ <1k membros + 10-50k mentorados | ❌ over-engineering |
| Tauri Mobile | Bundle pequeno | Mobile ainda alpha em 2026 — risco produção pra clube premium | ❌ |
| Expo Router + Web export | Conhecimento RN · web export decente | Web export inferior a Next.js pra SEO/marketing; HMC precisa landing SEO-first | ❌ |

#### Justificativa pro caso HMC

- **Audiência total** < 1.000 High Mentors + ~10–50k mentorados → não justifica 2 codebases
- **80% do uso mobile** será consumo de aula (Mux player tem SDK web/iOS/Android nativo via Capacitor)
- **Push notifications nativos** cobertos por `@capacitor/push-notifications` + Firebase/APNs
- **Branding "old money"** exige tipografia editorial (Cormorant Garamond) — Capacitor renderiza idêntico ao web; RN exigiria embed de fontes e ajustes finos
- **Velocidade de iteração** Next.js → mobile é grande vantagem competitiva

#### Arquitetura proposta (monorepo Turborepo)

```
apps/
  web/                       # Next.js 15 — produção web (Vercel)
  mobile/                    # Capacitor shell + plugins nativos
                             # (push, biometria, deep links, share, in-app browser p/ CISPay)
packages/
  ui/                        # componentes Tailwind compartilhados
  domain/                    # hooks, fetchers, types (Supabase client wrapper)
  config/                    # design tokens + RBAC schema (Zod)
```

**Build mobile:** `next export` para rotas estáticas + SSR via Capacitor `server.url` apontando Vercel em rotas dinâmicas (hybrid). Mux Data SDK + Mux Player web funcionam dentro do WebView Capacitor.

**Plugins nativos essenciais:**
- `@capacitor/push-notifications` — FCM + APNs
- `@capacitor/biometric-auth` — Face ID / fingerprint
- `@capacitor/share` — share native sheet
- `@capacitor/deep-links` — `hmc://clube/codex/seat-12`
- `@capacitor/browser` — in-app browser pro CISPay (não sai do app)
- `@capacitor/filesystem` — download offline de aulas (Tier III pode pedir)

---

## 4. RBAC — Implementação técnica

### 4.1 Schema na DB (`clube`)

```sql
-- Roles canônicas
create table clube.roles (
  id text primary key,        -- 'visitor','applicant','mentee','high_mentor','curator_team','super_admin'
  label text not null,
  weight smallint not null    -- ordem hierárquica
);

-- Perfil estendido (1:1 com auth.users)
create table clube.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role_id text not null references clube.roles(id),
  tier smallint check (tier in (1,2,3)),                       -- só p/ high_mentor
  mentee_status text check (mentee_status in ('new','active','churned')),
  application_status text check (application_status in ('draft','review','approved','rejected')),
  is_dev boolean default false,
  seat_number int,                                              -- I, II, III... XX (founding)
  display_name text,
  slug text unique,                                             -- para /m/:slug pública
  bio text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Relação mentor↔mentorado (quem comprou de quem)
create table clube.enrollments (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid references clube.profiles(user_id),
  mentee_id uuid references clube.profiles(user_id),
  program_id uuid,
  status text,                                                  -- 'active','paused','completed','refunded'
  cispay_subscription_id text,
  enrolled_at timestamptz default now(),
  unique(mentor_id, mentee_id, program_id)
);

-- Capabilities granulares
create table clube.capabilities (
  role_id text references clube.roles(id),
  resource text,                                                -- 'cross_floor','bridge','codex','yield'
  action text,                                                  -- 'read','write','approve'
  tier_min smallint,                                            -- null = aplica a todos
  primary key (role_id, resource, action)
);

-- Audit log
create table clube.audit_log (
  id uuid primary key default gen_random_uuid(),
  acting_user uuid references auth.users(id),
  impersonated_user uuid references auth.users(id),             -- se dev-login
  action text not null,
  resource text,
  resource_id text,
  metadata jsonb,
  ip inet,
  user_agent text,
  created_at timestamptz default now()
);
create index idx_audit_acting_user on clube.audit_log(acting_user);
create index idx_audit_resource on clube.audit_log(resource, resource_id);
```

### 4.2 RLS — exemplos

```sql
-- Mentorado só vê aulas dos programas em que está enrolled
create policy "mentee_reads_own_classes" on clube.classes for select using (
  exists (
    select 1 from clube.enrollments e
    where e.mentee_id = auth.uid()
      and e.program_id = classes.program_id
      and e.status = 'active'
  )
);

-- High Mentor edita só as próprias aulas
create policy "mentor_edits_own_classes" on clube.classes for all using (
  exists (
    select 1 from clube.profiles p
    where p.user_id = auth.uid()
      and p.role_id = 'high_mentor'
      and classes.mentor_id = auth.uid()
  )
);

-- The Bridge: só Tier III
create policy "bridge_tier3_only" on clube.bridge_leads for select using (
  exists (
    select 1 from clube.profiles p
    where p.user_id = auth.uid()
      and p.role_id = 'high_mentor'
      and p.tier = 3
  )
);

-- Curator lê tudo
create policy "curator_reads_all" on clube.profiles for select using (
  exists (
    select 1 from clube.profiles p
    where p.user_id = auth.uid()
      and p.role_id in ('curator_team','super_admin')
  )
);
```

### 4.3 Middleware Next.js

```ts
// middleware.ts (raiz do Next.js)
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

const matrix = {
  '/clube':    { roles: ['high_mentor','curator_team','super_admin'] },
  '/studio':   { roles: ['high_mentor','curator_team','super_admin'] },
  '/m':        { roles: ['mentee','curator_team','super_admin'] },
  '/curator':  { roles: ['curator_team','super_admin'] },
  '/_dev':     { roles: ['super_admin'], devOnly: true },
  '/clube/bridge': { roles: ['high_mentor'], tier: 3 },
}

export async function middleware(req) {
  const supabase = createMiddlewareClient({ req, res: NextResponse.next() })
  const { data: { user } } = await supabase.auth.getUser()

  const rule = Object.entries(matrix).find(([path]) =>
    req.nextUrl.pathname.startsWith(path)
  )?.[1]
  if (!rule) return NextResponse.next()
  if (!user) return NextResponse.redirect(new URL('/login', req.url))

  const { data: profile } = await supabase
    .from('profiles').select('role_id,tier,is_dev').eq('user_id', user.id).single()

  if (!rule.roles.includes(profile.role_id))
    return NextResponse.redirect(new URL('/hub', req.url))
  if (rule.tier && (profile.tier ?? 0) < rule.tier)
    return NextResponse.redirect(new URL('/clube', req.url))
  if (rule.devOnly && !profile.is_dev)
    return NextResponse.redirect(new URL('/hub', req.url))

  return NextResponse.next()
}
```

### 4.4 Dev-Login Switch em Produção

- Rota: `/_dev/login` — **só visível com cookie `hmc_dev=<HMAC(email+secret)>`** setado via comando interno
- Tela lista 10 personas seed (`visitor@dev.hmc`, `applicant@dev.hmc`, `mentee.new@dev.hmc`, etc.) — cada uma com `is_dev=true`
- Server Action `impersonate(personaId)` chama `supabase.auth.admin.generateLink({ type: 'magiclink' })` e seta `x-hmc-impersonator` no audit log

**Guard rails em PROD:**
- Exige `2FA` + IP allowlist (whitelist do escritório Febracis)
- Toda ação impersonada grava `acting_user` real + `impersonated_user` no `audit_log`
- Feature flag `dev_login_enabled` (Vercel Edge Config) — kill switch instantâneo
- Banner persistente no topo: "MODO IMPERSONIFICAÇÃO — agindo como X"

---

## 5. LGPD compliance

- Dados PII de candidatos retidos 5 anos (Art. 16 LGPD), depois auto-purge via Inngest job
- Endpoint `/api/user/delete-account` cumpre direito ao esquecimento (Art. 18)
- Endpoint `/api/user/export-data` cumpre direito de portabilidade (Art. 18)
- Audit log de toda operação sobre PII
- Termos + política de privacidade editáveis pela Curadoria (versionados via Notion?)
- Banner de cookies em landing pública

---

## 6. Convenções de código

- **Naming:** `kebab-case` para arquivos, `PascalCase` para componentes, `camelCase` para funções
- **i18n:** chaves estruturadas em `pt-BR` (default), preparado para `en` (V2 HMC Summit) e `es` (V2 LATAM)
- **Tests:** Vitest + Playwright (E2E críticos: signup → checkout → primeira aula; aprovação curadoria; tier promotion)
- **CI/CD:** GitHub Actions → preview Vercel + Railway → main protegida
- **Lint:** Biome (substitui ESLint + Prettier — single tool, mais rápido)

---

**Última atualização:** 2026-06-03 · validado contra brief técnico do Plan agent.
