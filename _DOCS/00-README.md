# HMC · Plataforma · Documentação

> **High Mentor Club** — clube fechado de mentores high-ticket curado por Paulo Vieira no ecossistema Febracis.
> Versão da plataforma: **v1 wireframes** · Data: 2026-06-03 · Mantenedor: Lucas Vieira

---

## ⚠️ NÃO ERRAR

| O que | Valor travado |
|---|---|
| **Nome** | `HMC — High Mentor Club` (singular "Mentor", sem "s") |
| **NUNCA usar** | "Human Mentors Club" (erro recorrente de variante de brand guide) |
| **Cliente final do mentor** | `Mentorado` (vocabulário do clube, NUNCA "aluno") |
| **PV** | `The Curator` / O Curador (não sócio, não mentor individual) |
| **Pagamento** | `CISPay` (gateway proprietário Febracis — NUNCA Stripe/Asaas/Pagar.me) |
| **Vídeo** | `Mux` ou Cloudflare Stream |
| **Comunidade** | Discord-like (canais por mentor, threads, voz opcional) |
| **DB** | Postgres `schema clube` no projeto `febracis-dre` existente (NÃO criar novo Supabase) |

---

## 📚 Documentos desta pasta

| # | Documento | Para quê |
|---|---|---|
| 00 | [README.md](00-README.md) | Você está aqui — índice + regras críticas |
| 01 | [PRD.md](01-PRD.md) | Product Requirements: visão, métricas, escopo, out-of-scope |
| 02 | [GLOSSARIO.md](02-GLOSSARIO.md) | Vocabulário oficial completo (Tier, Council, Cross-Floor, Pilgrimage, Codex, Bridge, Seal, Antechamber, Yield…) |
| 03 | [PERSONAS-GOVERNANCA.md](03-PERSONAS-GOVERNANCA.md) | 10 personas + matriz RBAC de permissões |
| 04 | [MAPA-DE-TELAS.md](04-MAPA-DE-TELAS.md) | Inventário das 58 telas (30 ✓ feitas · 28 ❌ faltam) |
| 05 | [STACK-ARQUITETURA.md](05-STACK-ARQUITETURA.md) | Stack final + estratégia mobile híbrida (Capacitor + PWA) + RBAC implementation |
| 06 | [ROADMAP.md](06-ROADMAP.md) | 4 fases: MVP → Polish → Mobile → Advanced |

---

## 🗺 Onde está cada coisa

```
Plataforma-v1/
├── _DOCS/                    ← documentação (você está aqui)
├── _icons.js                 ← sistema de ícones SVG Lucide-style
├── _shared.css               ← design system mono chrome blue
├── hmc-seal.png              ← selo oficial 1244×1244
│
├── landing.html              ← marketing público
├── login.html · signup.html  ← auth entry
├── signup-mentor-1..4.html   ← candidatura mentor (4 etapas)
├── signup-mentorado.html     ← signup mentorado simples
├── candidatura-status.html   ← status pós-envio
├── onboarding.html           ← tour pós-aprovação
├── acesso-liberado.html      ← welcome pós-checkout
├── hub.html                  ← entrada única pós-login (HOME)
├── notifications.html        ← central de notificações
├── account.html              ← perfil + papéis ativos
│
├── 00-public/                ← público (sem login)
│   ├── catalog.html          ← catálogo de mentores
│   ├── mentor-public.html    ← landing do mentor (Netflix preview)
│   └── checkout.html         ← CISPay checkout
│
├── 10-clube/                 ← mundo CLUBE (High Mentors)
│   ├── 01-dashboard.html     ← Sala do Membro
│   ├── 02-calendar.html      ← Council
│   ├── 03-codex.html         ← Codex (anuário)
│   ├── 04-cross-floor.html   ← marketplace de vagas
│   ├── 05-yield.html         ← HMC Yield (16% CIS)
│   ├── 06-pilgrimages.html   ← eventos premium
│   └── 07-seal.html          ← HMC Seal kit
│
├── 20-mentor/                ← mundo STUDIO (mentor vendendo)
│   ├── studio-home.html      ← dashboard mentor
│   ├── mentorias.html        ← programas à venda
│   └── aulas-biblioteca.html ← biblioteca Mux
│
├── 30-mentorado/             ← mundo MENTORADO (cliente final)
│   ├── biblioteca.html       ← Netflix de aulas
│   ├── player.html           ← player Mux
│   └── comunidade.html       ← canais Discord-like
│
└── 40-curator/               ← admin CURATOR (PV + time)
    └── aprovacoes.html       ← fila de candidatos
```

---

## 🧭 Como navegar a plataforma

1. **Pra ver como visitante público:** abre `landing.html`
2. **Pra ver pós-login:** abre `hub.html` (entrada única)
3. **Pra trocar entre visões de persona:** abre `dev-login.html` ⭐ (persona switcher)
4. **Pra ver o mapa completo:** abre `index.html` (jornada visual)

---

## 📋 Como contribuir nesta documentação

- **Adicionar termo travado:** edita `02-GLOSSARIO.md`
- **Mudou alguma persona/permissão:** edita `03-PERSONAS-GOVERNANCA.md`
- **Adicionou tela nova:** edita `04-MAPA-DE-TELAS.md`
- **Decisão técnica importante:** documenta em `05-STACK-ARQUITETURA.md`
- **Tudo que muda escopo:** registra em `01-PRD.md` na seção "Changelog de escopo"

**Regra de ouro:** se uma decisão custou mais de 10 minutos pra tomar, ela merece estar documentada aqui.

---

## 🔗 Referências externas

- **Docs originais do projeto (JSON):** `Documentação/_content/01-entendimento.json` … `10-wireframes-spec.json`
- **PDFs gerados a partir dos JSONs:** `Documentação/*.pdf`
- **Brand book completo:** `Documentação/_content/07-brand-book-hmc.json`
- **Design brief para IAs de imagem:** `Documentação/_content/08-design-brief.json`
- **Skill global Claude:** `~/.claude/skills/hmc-project/SKILL.md` (carrega contexto automaticamente)

---

**Última atualização:** 2026-06-03 · Lucas Vieira
