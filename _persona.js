/* ─────────────────────────────────────────────────────────────
   HMC · Sistema de persona ativa + RBAC dinâmico (wireframe)
   ───────────────────────────────────────────────────────────────
   Em produção, isto é resolvido server-side via Supabase Auth +
   RLS. Aqui no wireframe, simulamos via localStorage + JS render.

   Uso:
   - dev-login salva persona: HMC_PERSONA.set('mariana', true)
   - Telas cross-context chamam: HMC_PERSONA.apply(activeNav)
   - Telas do mode pages têm sidebar estática (não usam isto)
   ───────────────────────────────────────────────────────────── */
(function () {
  const KEY = 'hmc.activePersona';
  const DEFAULT = 'lucas';

  /* ─── REGISTRO DE PERSONAS ──────────────────────────────── */
  const PERSONAS = {
    lucas: {
      id: 'lucas',
      name: 'Lucas Vieira',
      initials: 'LV',
      role: 'Seat 12 · Tier II',
      avatarClass: 'lv',
      modes: ['hub', 'clube', 'studio', 'estudos'],
      hubUrl: 'hub.html',
      seatBadge: 'Seat 12',
      // mode pills no mode-switch
      modeSwitch: [
        { mode: 'hub',     url: 'hub.html',                          short: 'H', icon: 'home',       label: 'Hub' },
        { mode: 'clube',   url: '10-clube/01-dashboard.html',        short: 'C', icon: 'landmark',   label: 'Clube' },
        { mode: 'studio',  url: '20-mentor/studio-home.html',        short: 'S', icon: 'briefcase',  label: 'Studio' },
        { mode: 'estudos', url: '30-mentorado/biblioteca.html',      short: 'E', icon: 'book-open',  label: 'Estudos' },
      ],
      // nav items em telas cross-context
      shortcuts: [
        { href: '10-clube/01-dashboard.html',     icon: 'home',       label: 'Sala do Membro' },
        { href: '20-mentor/studio-home.html',     icon: 'briefcase',  label: 'Studio' },
        { href: '30-mentorado/biblioteca.html',   icon: 'book-open',  label: 'Biblioteca' },
        { href: '40-curator/aprovacoes.html',     icon: 'shield',     label: 'Curator', badge: '3' },
      ],
      avisos: 12,
      eventsCategories: ['clube','studio','estudos','financeiro','pilgrimage','pessoal'],
      tier: 'II',
    },

    mariana: {
      id: 'mariana',
      name: 'Mariana Souza',
      initials: 'MS',
      role: 'Mentorada · 3 cursos',
      avatarClass: 'ms',
      modes: ['hub-mentorado', 'estudos'],
      hubUrl: 'hub-mentorado.html',
      seatBadge: 'Mentorada',
      modeSwitch: [
        { mode: 'hub-mentorado', url: 'hub-mentorado.html',                short: 'H', icon: 'home',       label: 'Hub' },
        { mode: 'estudos',       url: '30-mentorado/biblioteca.html',      short: 'E', icon: 'book-open',  label: 'Estudos' },
      ],
      shortcuts: [
        { href: '30-mentorado/biblioteca.html',   icon: 'book-open',     label: 'Biblioteca' },
        { href: '30-mentorado/player.html',       icon: 'play-circle',   label: 'Continuando' },
        { href: '30-mentorado/comunidade.html',   icon: 'message-circle',label: 'Comunidades', badge: '8' },
        { href: '30-mentorado/sessoes-1-1.html',  icon: 'calendar',      label: 'Sessões 1:1' },
      ],
      avisos: 8,
      eventsCategories: ['estudos','pessoal'],
      tier: 'mentorado',
    },

    bruno: {
      id: 'bruno',
      name: 'Bruno Vaz',
      initials: 'BV',
      role: 'Seat 24 · Tier II',
      avatarClass: 'lv',  // mesmo gradient azul
      modes: ['hub', 'clube', 'studio'],
      hubUrl: 'hub.html',
      seatBadge: 'Seat 24',
      modeSwitch: [
        { mode: 'hub',     url: 'hub.html',                          short: 'H', icon: 'home',       label: 'Hub' },
        { mode: 'clube',   url: '10-clube/01-dashboard.html',        short: 'C', icon: 'landmark',   label: 'Clube' },
        { mode: 'studio',  url: '20-mentor/studio-home.html',        short: 'S', icon: 'briefcase',  label: 'Studio' },
      ],
      shortcuts: [
        { href: '10-clube/01-dashboard.html',     icon: 'home',       label: 'Sala do Membro' },
        { href: '20-mentor/studio-home.html',     icon: 'briefcase',  label: 'Studio' },
      ],
      avisos: 6,
      eventsCategories: ['clube','studio','financeiro','pessoal'],
      tier: 'II',
    },

    carlos: {
      id: 'carlos',
      name: 'Carlos Ribeiro',
      initials: 'CR',
      role: 'Seat 02 · Tier III',
      avatarClass: 'pv',  // gradient diferenciado
      modes: ['hub', 'clube', 'studio'],
      hubUrl: 'hub.html',
      seatBadge: 'Tier III',
      modeSwitch: [
        { mode: 'hub',     url: 'hub.html',                          short: 'H', icon: 'home',       label: 'Hub' },
        { mode: 'clube',   url: '10-clube/01-dashboard.html',        short: 'C', icon: 'landmark',   label: 'Clube' },
        { mode: 'studio',  url: '20-mentor/studio-home.html',        short: 'S', icon: 'briefcase',  label: 'Studio' },
      ],
      shortcuts: [
        { href: '10-clube/antechamber.html',      icon: 'lock',       label: 'Antechamber' },
        { href: '10-clube/curator-address.html',  icon: 'mic',        label: 'Curator\'s Address' },
        { href: '10-clube/bridge.html',           icon: 'link',       label: 'The Bridge' },
        { href: '20-mentor/studio-home.html',     icon: 'briefcase',  label: 'Studio' },
      ],
      avisos: 9,
      eventsCategories: ['clube','studio','pilgrimage','financeiro','pessoal'],
      tier: 'III',
    },

    michelle: {
      id: 'michelle',
      name: 'Michelle',
      initials: 'MC',
      role: 'Time Curadoria',
      avatarClass: 'mc',
      modes: ['hub-curator', 'curator'],
      hubUrl: 'hub-curator.html',
      seatBadge: 'Curator',
      modeSwitch: [
        { mode: 'hub-curator', url: 'hub-curator.html',                short: 'H', icon: 'home',          label: 'Hub' },
        { mode: 'curator',     url: '40-curator/aprovacoes.html',      short: 'X', icon: 'shield-check',  label: 'Curator' },
      ],
      shortcuts: [
        { href: '40-curator/aprovacoes.html',         icon: 'shield-check', label: 'Aprovações', badge: '3' },
        { href: '40-curator/tier-promotion.html',     icon: 'trending-up',  label: 'Promoções', badge: '5' },
        { href: '40-curator/moderacao.html',          icon: 'message',      label: 'Moderação' },
        { href: '40-curator/financeiro-consolidado.html', icon: 'dollar',   label: 'Financeiro' },
      ],
      avisos: 7,
      eventsCategories: ['curator','clube','financeiro','pessoal'],
      tier: 'curator',
    },

    pv: {
      id: 'pv',
      name: 'Paulo Vieira',
      initials: 'PV',
      role: 'The Curator · Founder',
      avatarClass: 'pv',
      modes: ['hub-pv', 'clube', 'curator'],
      hubUrl: 'hub-pv.html',
      seatBadge: 'The Curator',
      modeSwitch: [
        { mode: 'hub-pv',      url: 'hub-pv.html',                     short: 'H', icon: 'home',          label: 'Hub' },
        { mode: 'clube',       url: '10-clube/01-dashboard.html',      short: 'C', icon: 'landmark',      label: 'Clube' },
        { mode: 'curator',     url: '40-curator/aprovacoes.html',      short: 'X', icon: 'shield-check',  label: 'Curator' },
      ],
      shortcuts: [
        { href: 'curator-address-editor.html',    icon: 'mic',         label: 'Address (editor)' },
        { href: 'antechamber-pv.html',            icon: 'lock',        label: 'Antechamber (PV)' },
        { href: '40-curator/codex-publishing.html', icon: 'book',      label: 'Codex publishing' },
        { href: '40-curator/aprovacoes.html',     icon: 'shield-check',label: 'Aprovações' },
      ],
      avisos: 4,
      eventsCategories: ['curator','clube','pilgrimage','pessoal'],
      tier: 'founder',
    },

    suporte: {
      id: 'suporte',
      name: 'Beatriz Lima',
      initials: 'BL',
      role: 'Time Suporte · Atendente',
      avatarClass: 'mc',
      modes: ['hub-suporte', 'suporte'],
      hubUrl: 'hub-suporte.html',
      seatBadge: 'Suporte',
      modeSwitch: [
        { mode: 'hub-suporte', url: 'hub-suporte.html',                short: 'H', icon: 'home',     label: 'Hub' },
        { mode: 'suporte',     url: '40-curator/suporte-admin.html',   short: 'S', icon: 'help',     label: 'Tickets' },
      ],
      shortcuts: [
        { href: '40-curator/suporte-admin.html',  icon: 'help',        label: 'Tickets abertos', badge: '4' },
        { href: '40-curator/moderacao.html',      icon: 'message',     label: 'Moderação',       badge: '2' },
      ],
      avisos: 5,
      eventsCategories: ['curator','pessoal'],
      tier: 'staff',
    },
  };

  /* ─── API ──────────────────────────────────────────────── */
  function current() {
    const id = localStorage.getItem(KEY) || DEFAULT;
    return PERSONAS[id] || PERSONAS[DEFAULT];
  }
  function set(id, redirectToHub = false) {
    if (!PERSONAS[id]) { console.warn('[persona] unknown:', id); return; }
    localStorage.setItem(KEY, id);
    if (redirectToHub) {
      const base = locationBase();
      window.location.href = base + PERSONAS[id].hubUrl;
    }
  }
  function canAccessMode(mode) {
    return current().modes.includes(mode);
  }
  function listAll() {
    return Object.values(PERSONAS);
  }
  function locationBase() {
    // Calcula caminho relativo até a raiz do projeto.
    // Funciona com qualquer raiz (/ no Vercel, /Plataforma-v1/ no legado, etc).
    // Conta quantas pastas precisam ser "subidas" desde a página atual.
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    // Última parte é o nome do arquivo (ex: 'studio-home.html')
    // Pastas acima = parts.length - 1
    const depth = Math.max(0, parts.length - 1);
    return '../'.repeat(depth);
  }

  /* ─── APLICAR NA SIDEBAR (telas cross-context) ───────── */
  function apply(activeNav = 'hub') {
    const p = current();
    const root = document.querySelector('aside.sidebar');
    if (!root) return;

    // 1. Atualiza sidebar-brand (linka pro hub correto)
    const brand = root.querySelector('.sidebar-brand');
    if (brand) brand.setAttribute('href', p.hubUrl);

    // 2. Reescreve mode-switch
    const ms = root.querySelector('.mode-switch');
    if (ms) {
      ms.innerHTML = p.modeSwitch.map(m => {
        const isActive = m.mode === activeNav;
        return `<a href="${m.url}" class="mode-switch-item ${isActive ? 'active' : ''}" data-short="${m.short}"><i data-icon="${m.icon}" class="icon"></i><span>${m.label}</span></a>`;
      }).join('');
    }

    // 3. Reescreve seção de Atalhos com items da persona
    const scroll = root.querySelector('.sidebar-nav-scroll');
    if (scroll) {
      // Primeira seção (Avisos/Agenda/Buscar) fica
      const firstSec = scroll.querySelector('.nav-section');
      if (firstSec) {
        const avisoLink = firstSec.querySelector('a[href*="notifications"]');
        if (avisoLink) {
          const badge = avisoLink.querySelector('.badge-count');
          if (badge) badge.textContent = String(p.avisos);
        }
      }
      // Substitui demais nav-sections por uma seção "Atalhos" customizada
      const allSections = scroll.querySelectorAll('.nav-section');
      // remove tudo a partir da segunda
      allSections.forEach((sec, i) => { if (i > 0) sec.remove(); });
      // adiciona Atalhos
      const atalhos = document.createElement('div');
      atalhos.className = 'nav-section';
      atalhos.innerHTML = `<div class="nav-section-label">— Atalhos</div>` +
        p.shortcuts.map(s => {
          const badgeHTML = s.badge ? ` <span class="badge-count">${s.badge}</span>` : '';
          const badgeCls = s.badge ? ' has-badge' : '';
          return `<a href="${s.href}" class="nav-item${badgeCls}"><i data-icon="${s.icon}" class="icon icon-sm"></i>${s.label}${badgeHTML}</a>`;
        }).join('');
      scroll.appendChild(atalhos);
    }

    // 4. Atualiza user-pill no footer
    const pill = root.querySelector('.user-pill-v3');
    if (pill) {
      pill.innerHTML = `<div class="avatar-sm">${p.initials}</div><div><div class="user-pill-v3-name">${p.name}</div><div class="user-pill-v3-role">${p.role}</div></div>`;
    }

    // 5. Reinjeta ícones
    if (window.HMC_ICONS && window.HMC_ICONS.run) window.HMC_ICONS.run();
  }

  /* ─── APLICAR EM MODE-PAGE (telas dentro de /10-clube, /20-mentor, etc) ─
     Diferente do apply() de cross-context — aqui só reescreve:
       - sidebar-brand (link pro hub correto)
       - mode-switch (filtra pillsque a persona acessa, marca activeMode)
       - user-pill no footer
     NÃO toca em sidebar-nav-scroll (que é específico do mode).
     Se persona não tem acesso ao mode atual → 403.
     ──────────────────────────────────────────────────────── */
  function applyModePage(modeContext, requiredMode) {
    const p = current();
    // Se a página exige acesso a um mode que a persona não tem, bloqueia
    if (requiredMode && !p.modes.includes(requiredMode) && !p.modes.some(m => modeMatches(m, requiredMode))) {
      const base = locationBase();
      window.location.replace(base + '403-forbidden.html');
      return;
    }

    const root = document.querySelector('aside.sidebar');
    if (!root) return;

    const base = locationBase();

    // 1. sidebar-brand → hub da persona (resolvido relativamente)
    const brand = root.querySelector('.sidebar-brand');
    if (brand) brand.setAttribute('href', base + p.hubUrl);

    // 2. mode-switch reescrito com pills da persona, marcando o ativo
    const ms = root.querySelector('.mode-switch');
    if (ms) {
      ms.innerHTML = p.modeSwitch.map(m => {
        const isActive = modeMatches(m.mode, modeContext);
        // URLs do modeSwitch são relativas à raiz; adicionar base
        const finalUrl = base + m.url;
        return `<a href="${finalUrl}" class="mode-switch-item ${isActive ? 'active' : ''}" data-short="${m.short}"><i data-icon="${m.icon}" class="icon"></i><span>${m.label}</span></a>`;
      }).join('');
    }

    // 3. user-pill no footer
    const pill = root.querySelector('.user-pill-v3');
    if (pill) {
      pill.innerHTML = `<div class="avatar-sm">${p.initials}</div><div><div class="user-pill-v3-name">${p.name}</div><div class="user-pill-v3-role">${p.role}</div></div>`;
      const accountUrl = base + 'account.html';
      pill.setAttribute('href', accountUrl);
    }

    // 4. Reinjeta ícones
    if (window.HMC_ICONS && window.HMC_ICONS.run) window.HMC_ICONS.run();
  }

  // Helper: clube/clube-tier3 match com 'clube' etc.
  function modeMatches(personaMode, pageContext) {
    if (personaMode === pageContext) return true;
    // Variantes equivalentes
    const equiv = {
      'clube': ['clube-tier3', 'clube-tier2'],
      'curator': ['curator-full', 'curator-subset', 'suporte'],
      'hub': ['hub-mentorado', 'hub-curator', 'hub-suporte', 'hub-pv'],
    };
    for (const [base, alts] of Object.entries(equiv)) {
      if (personaMode === base && alts.includes(pageContext)) return true;
      if (pageContext === base && alts.includes(personaMode)) return true;
    }
    return false;
  }

  /* ─── TIER-AWARE SIDEBAR (mode-clube) ──────────────────
     Esconde items "Tier III · Inner Council" pra membros não-Tier-III
     ──────────────────────────────────────────────────────── */
  function applyTierAwareSidebar() {
    const p = current();
    // só aplica em mode-page do clube (não cross-context)
    const path = window.location.pathname;
    if (!path.includes('/10-clube/')) return;

    const isTier3OrAbove = p.tier === 'III' || p.tier === 'founder';
    if (isTier3OrAbove) return; // tem acesso, não esconde nada

    // Encontra a nav-section que tem "Tier III · Inner Council" e esconde
    const sections = document.querySelectorAll('aside.sidebar .nav-section');
    sections.forEach(sec => {
      const label = sec.querySelector('.nav-section-label');
      if (label && /Tier III|Inner Council|Privado/i.test(label.textContent)) {
        sec.style.display = 'none';
      }
    });

    // Também esconde "Meu Tier" link específico se persona não tem acesso ao clube
    if (!p.modes.includes('clube')) {
      document.querySelectorAll('aside.sidebar a').forEach(a => {
        const href = a.getAttribute('href') || '';
        if (href.includes('perfil-tier')) a.style.display = 'none';
      });
    }
  }

  /* ─── BLOQUEIO POR ROTA ────────────────────────────────
     Se persona ativa não tem acesso à URL atual, redireciona 403
     ──────────────────────────────────────────────────────── */
  function enforceAccess(requiredModes = null) {
    if (!requiredModes) return; // sem restrição
    const p = current();
    const ok = requiredModes.some(m => p.modes.includes(m));
    if (!ok) {
      // soft redirect — usa 403-forbidden.html
      const base = locationBase();
      window.location.replace(base + '403-forbidden.html');
    }
  }

  /* ─── HUB REDIRECT ─────────────────────────────────────
     Se persona ativa não usa hub.html (vai pra hub-mentorado ou hub-curator),
     telas chamando apply('hub') querem que hub.html redirecione
     ──────────────────────────────────────────────────────── */
  function maybeRedirectHub() {
    const p = current();
    const path = window.location.pathname.toLowerCase();
    const hubFiles = ['hub.html', 'hub-mentorado.html', 'hub-curator.html', 'hub-suporte.html', 'hub-pv.html'];
    for (const hub of hubFiles) {
      if (path.endsWith('/' + hub) && p.hubUrl !== hub) {
        window.location.replace(p.hubUrl);
        return;
      }
    }
  }

  /* ─── EXPÕE GLOBAL ─────────────────────────────────── */
  window.HMC_PERSONA = {
    current, set, canAccessMode, listAll, apply, applyModePage,
    enforceAccess, maybeRedirectHub, applyTierAwareSidebar,
    PERSONAS,  // somente leitura
  };

  /* ─── AUTO-APPLY ───────────────────────────────────────
     Quando o body tem data-persona-aware, aplica sidebar dinâmica
     ─────────────────────────────────────────────────────── */
  function autoApply() {
    const body = document.body;
    if (!body || !body.dataset.personaAware) return;

    const mode = body.dataset.personaAware; // "cross-context" | "mode-page"
    const activeNav = body.dataset.activeMode || 'hub';

    if (mode === 'mode-page') {
      // Mode-page: só ajusta brand + mode-switch + footer, NÃO toca nav-scroll
      const modeContext = body.dataset.modeContext || 'clube';
      const requiredMode = body.dataset.requiredMode || modeContext;
      applyModePage(modeContext, requiredMode);
      // tier-aware (esconde Tier III pra não-Tier-III em /10-clube/)
      applyTierAwareSidebar();
    } else {
      // Cross-context (default): reescreve sidebar completa
      maybeRedirectHub();
      if (body.dataset.requiredModes) {
        const req = body.dataset.requiredModes.split(',').map(s => s.trim());
        enforceAccess(req);
      }
      apply(activeNav);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoApply);
  } else {
    autoApply();
  }
})();
