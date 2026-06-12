# HMC — High Mentor Club · Plataforma v1

Wireframe da plataforma do **High Mentor Club** — clube fechado para mentores high-ticket no ecossistema Paulo Vieira.

🚀 **Live:** https://hmc-plataforma.vercel.app

## Stack

100% HTML + CSS + JS vanilla. Sem build, sem dependência npm, sem backend.

- **RBAC client-side** via `_persona.js` + `localStorage` (7 personas)
- **Sistema de modais** via `_modals.js` (auto-wire de botões)
- **70 ícones** Lucide-style em `_icons.js`
- **Design system** em `_shared.css` (paleta navy + azul royal + cyan)
- **Cache busting** via `?v=N` em assets auxiliares

## Estrutura

```
/                          → redirect pra /landing.html
landing.html               → vitrine pública
dev-login.html             → switcher de personas (uso interno)
apresentacao.html          → deck institucional de 10 cenas
manual.html                → bíblia do produto (TOC + glossário A-Z)
10-clube/                  → mundo Clube (membro)
20-mentor/                 → mundo Studio (mentor)
30-mentorado/              → mundo Estudos (mentorado)
40-curator/                → painel curadoria (time)
tier-seals/                → 3 selos físicos (bronze/prata/dourado)
_DOCS/                     → especificação e jornadas
```

## Workflow

```bash
# Servir local
python3 -m http.server 8765

# Deploy
git add . && git commit -m "..." && git push
# Vercel auto-deploy em ~30s
```

---

Curated by Paulo Vieira · MMXXVI
