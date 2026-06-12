# Personas + Governança · HMC

> Quem é quem · o que cada um vê · o que pode/não pode fazer.

---

## Resumo: 10 personas em 6 roles canônicas no DB

| Persona | Role DB | Tier? | Status flag |
|---|---|---|---|
| 1. Visitante público | `visitor` | — | — |
| 2. Candidato a Mentor | `applicant` | — | `application_status` ∈ {draft, review, approved, rejected} |
| 3. Mentorado novo | `mentee` | — | `mentee_status = 'new'` |
| 4. Mentorado ativo | `mentee` | — | `mentee_status = 'active'` |
| 5. High Mentor Tier I | `high_mentor` | `tier = 1` | — |
| 6. High Mentor Tier II | `high_mentor` | `tier = 2` | — |
| 7. Sovereign Mentor Tier III | `high_mentor` | `tier = 3` | — |
| 8. Time Curadoria (Michelle/Sofia) | `curator_team` | — | — |
| 9. The Curator (Paulo Vieira) | `super_admin` | — | role com privilégio máximo |
| 10. Admin/Dev | `super_admin` | — | `is_dev = true` |

---

## Detalhamento por persona

### 1. Visitante público (não logado)

**Quem é:** alguém que chegou pela landing, indicação, SEO, ou link compartilhado. Não tem conta.

**Visão:**
- Landing (`/`)
- Catálogo público de mentores (`/mentores`)
- Página pública de cada mentor (`/m/:slug`)
- Login / Signup (mentor/mentorado)

**Pode:** navegar, ver vitrines, iniciar candidatura ou compra
**Não pode:** ver qualquer área autenticada, valores reais de comissão CIS, dados internos do clube
**Restrição:** rate limit em login para evitar brute force

---

### 2. Candidato a Mentor (`applicant`)

**Quem é:** alguém que clicou em "Iniciar candidatura" e está preenchendo o dossiê (4 etapas) ou aguardando veredito.

**Visão:**
- Status da candidatura (`/candidatura/status`)
- Edição do dossiê enquanto em `draft` ou `review`
- Upload de evidências (PDF, vídeo, links)
- Chat assíncrono com Time Curadoria

**Pode:** editar próprio dossiê até envio, ver timeline de status, conversar com Michelle
**Não pode:** acessar Studio, Club, Success Fee, qualquer área de membro ativo
**Workflow:** `draft` → `review` (após envio) → `approved` (vira `high_mentor`) ou `rejected` (dados retidos 5 anos LGPD)

---

### 3. Mentorado novo (`mentee_status = 'new'`)

**Quem é:** acabou de pagar via CISPay e foi liberado o acesso. Primeiros 7 dias.

**Visão:**
- Onboarding (tour da plataforma)
- Primeira aula liberada do programa
- Perfil + edição
- Comunidade do mentor em **read-only por 7 dias** (anti-spam)

**Pode:** consumir conteúdo, agendar primeira sessão 1:1, ler comunidade
**Não pode:** postar na comunidade até completar 7 dias OU primeiro module
**Auto-transição:** vira `mentee_status = 'active'` após 7 dias OR primeira aula concluída

---

### 4. Mentorado ativo (`mentee_status = 'active'`)

**Quem é:** mentorado consumindo programa normalmente.

**Visão:**
- Biblioteca completa do(s) programa(s) contratado(s) — `/m/biblioteca`
- Player Mux (`/m/aula/:id`)
- Sessões 1:1 (`/m/sessoes`) via Cal.com embed
- Comunidade (postar + reagir)
- Certificado quando concluir (`/m/certificado`)
- Notas pessoais por aula
- Histórico de pagamentos próprios
- Pode candidatar-se a vagas Cross-Floor abertas por membros (com consentimento do próprio mentor)

**Pode:** tudo do consumo do programa, candidatar-se a Cross-Floor, receber convite p/ HMC Summit (Tier III mentors podem oferecer)
**Não pode:** Studio admin, dados financeiros do mentor, Council, Codex (interno), Success Fee, Bridge
**Recebe:** Curator's Address mensal (PGR do PV aberto)

---

### 5. High Mentor Tier I — Mentor of HMC

**Quem é:** membro entrante. Ticket próprio entre R$ 25-55k.

**Visão:**
- **Mundo Clube:** Sala do Membro, Council (RSVP), Codex (read), Pilgrimages (T1 only), Seal Kit (bronze), Antechamber
- **Mundo Studio:** próprio Studio com aulas Mux, mentorias, CRM, sessões, comunidade, financeiro
- **Mundo Mentorado:** se comprou de outro mentor, acessa também
- **HMC Success Fee:** dashboard próprio

**Pode:** operar Studio próprio, RSVPs em Council/Pilgrimages T1, baixar Seal bronze
**Não pode:** publicar vagas no Cross-Floor (só APPLY, oferta limitada a 20%), HMC Summit (T2+), The Bridge (T3)

---

### 6. High Mentor Tier II — High Mentor

**Quem é:** identidade central do clube. Ticket R$ 56-85k.

**Visão:** tudo de Tier I MAIS:
- Cross-Floor completo (publicar vagas próprias até 20%)
- HMC Summit (RSVP)
- Spread destacado no Codex
- Seal prata

**Pode:** publicar vagas Cross-Floor, voz audível no Council, prioridade em Pilgrimages
**Não pode:** The Bridge (só T3), Curator's Address privado

---

### 7. Sovereign Mentor Tier III

**Quem é:** topo da pirâmide. Ticket R$ 86k+.

**Visão:** tudo de Tier II MAIS:
- **The Bridge** (catálogo de franquias do ecossistema PV + pipeline indicação)
- Curator's Address dedicado
- Founder spread no Codex Vol I (se Founding Member)
- Seal ouro vivo
- Prioridade absoluta no Cross-Floor
- Voz determinante no Council

**Pode:** indicar mentorados para franquias do ecossistema PV e ganhar comissionamento; candidato natural a sociedade futura com PV
**Não pode:** ver Backstage curatorial de outros membros (notas privadas sobre ele só The Curator vê)

---

### 8. Time Curadoria (`curator_team`) — Michelle, Sofia

**Quem é:** operação interna do clube. Aprovam candidatos, moderam, fazem curadoria de conteúdo.

**Visão:**
- Aprovações (`/curator/aprovacoes`) — fila de candidatos com dossiê
- Dossiê do membro (read + notes privadas) (`/curator/membros/:id`)
- Pipeline financeiro consolidado
- Analytics global (LTV, churn, NPS)
- Agenda Council + tools de host
- Moderação Antechamber (espelho read-only)
- Cross-Floor disputes
- Codex publishing (edita prefácio, "Palavra do Curador")

**Pode:** aprovar/rejeitar candidatos (com endorsement de PV), adicionar notas em dossiês, moderar comunidades
**Não pode:** publicar em nome de PV no Council, alterar tier de membro sem PV approval, acessar CISPay bruto, override de decisão de PV

---

### 9. The Curator (Paulo Vieira) (`super_admin` flag específica)

**Quem é:** Paulo Vieira no papel institucional.

**Visão:** TUDO do time de Curadoria MAIS:
- **Promoção/demoção de tier** (workflow assinado)
- Decretos no Codex (anúncios institucionais permanentes)
- Override de qualquer aprovação/rejeição
- Leitura de receita CISPay bruta consolidada
- Sinalizador "potencial sócio" em dossiês

**Pode:** TUDO. Voz final em qualquer decisão. Edita "Palavra do Curador" mensal.
**Não pode:** nenhuma restrição funcional (só auditoria interna mantém histórico)

---

### 10. Admin/Dev (`is_dev = true`)

**Quem é:** Lucas Vieira + equipe IA Tec Febracis. Time interno do produto.

**Visão:**
- Dev login switch (`/_dev/login`) — impersonificação de qualquer persona
- Feature flags (`/_dev/flags`)
- Seed/reset data (`/_dev/seed`)
- Audit log viewer (`/_dev/audit`)
- Acesso técnico a qualquer área (com auditoria)

**Pode:** bypass de RLS via service role key (auditado), reset de dados em ambiente dev, criar contas seed
**Não pode (em produção):** acessar dados PII sem registro de motivo, impersonar sem 2FA + IP allowlist
**Guard rails:**
- Em PROD: exige 2FA + IP allowlist (whitelist do escritório Febracis)
- Toda ação impersonada grava `acting_user` real + `impersonated_user`
- Feature flag `dev_login_enabled` (Vercel Edge Config) — kill switch instantâneo
- Banner persistente: "MODO IMPERSONIFICAÇÃO — agindo como X"

---

## Matriz de permissões compacta (CRUD por recurso)

Legenda: **R** read · **W** write · **A** approve · **—** sem acesso · **own** somente próprio

| Recurso | Visit | Cand | Mentee | T1 | T2 | T3 | Curad | PV | Dev |
|---|---|---|---|---|---|---|---|---|---|
| Landing / catálogo público | R | R | R | R | R | R | R | R | R |
| Candidatura (dossiê) | — | W own | — | — | — | — | R+A | R+A | R |
| Mentorado profile | — | — | RW own | R (do seu) | R (do seu) | R (do seu) | R | R | R |
| Aulas Mux (player) | — | — | R (contratadas) | R own studio | R own studio | R own studio | R | R | R |
| Studio admin (mentor) | — | — | — | RW own | RW own | RW own | R | R | R |
| Comunidade do mentor | — | — | R+post | RW own | RW own | RW own | R+modera | R+modera | R |
| Council (sessão) | — | — | — | R+RSVP | R+RSVP | R+RSVP | RW agenda | RW agenda+host | R |
| Codex (anuário) | — | — | — | R | R+spread destacado | R+founder spread | RW | RW+decreto | R |
| Cross-Floor | — | — | apply only | R+apply (limitado) | RW (publica) | RW | R+dispute | R+dispute | R |
| The Bridge | — | — | — | — | — | RW indicação | R | RW | R |
| HMC Success Fee (CIS 16%) | — | — | — | R own | R own | R own | R consolidado | R consolidado | R |
| CISPay (gateway) | — | — | checkout | R own payouts | R own payouts | R own payouts | R agregado | R bruto | R logs |
| Pilgrimages | — | — | — | R+RSVP (T1) | R+RSVP | R+RSVP+priority | RW | RW | R |
| Seal Kit (download) | — | — | — | R+download | R+download | R+download+custom | RW templates | RW | R |
| Aprovações pendentes | — | — | — | — | — | — | A | A+override | R |
| Promover/demover tier | — | — | — | — | — | — | — | A | — |
| Feature flags | — | — | — | — | — | — | — | R | RW |
| Dev-login switch | — | — | — | — | — | — | — | — | RW |

---

## Como o RBAC é implementado

(Detalhes técnicos em [05-STACK-ARQUITETURA.md](05-STACK-ARQUITETURA.md))

- **3 camadas de proteção:**
  1. **Middleware Next.js** (rota) — redireciona antes de renderizar
  2. **RLS Supabase** (linha) — impede queries não autorizadas no banco
  3. **Server Actions / API guards** (operação) — exigem role + capability check
- **Service role key** só em jobs assíncronos (Inngest), nunca exposto no browser
- **Audit log** em `clube.audit_log` para toda ação sensível (impersonação, aprovação, tier change, financeiro)

---

## Dev-login (persona switcher para desenvolvimento)

**Arquivo:** `dev-login.html` na raiz da plataforma

**Função:** clicando num card de persona, o cookie `hmc_dev_persona` é setado e a próxima navegação aplica aquela visão. Em wireframe estático, simplesmente navega para a tela de entrada daquela persona.

**Personas selecionáveis:**
1. Visitante público → `landing.html`
2. Candidato Mentor (em análise) → `candidatura-status.html`
3. Mentorado novo (boas-vindas) → `acesso-liberado.html`
4. Mentorado ativo → `30-mentorado/biblioteca.html`
5. High Mentor Tier I → `hub.html` (modo Clube)
6. High Mentor Tier II (Lucas Vieira) → `hub.html` (modo Hub)
7. Sovereign Tier III → `hub.html` (com The Bridge desbloqueado)
8. Time Curadoria (Michelle) → `40-curator/aprovacoes.html`
9. The Curator (PV) → `40-curator/aprovacoes.html` + privilégios máximos
10. Admin/Dev → `dev-login.html` (essa própria tela)

Em produção, esse switcher só estará disponível em ambiente dev OU para usuários com `is_dev = true` + 2FA + IP allowlist.

---

**Última atualização:** 2026-06-03
