/* ─────────────────────────────────────────────────────────────
   HMC · Sistema de modais genéricos (wireframe)
   ───────────────────────────────────────────────────────────────
   Em produção, isto vira modais reais com forms + APIs.
   Aqui dá feedback visual de "ação aconteceu" pra demo.

   Uso:
   <button data-modal-action="confirmar" data-modal-title="Confirmar presença"
           data-modal-msg="Você confirma presença no Council de 10 jul · 20h?">
     Confirmar
   </button>

   Auto-detecta botões com data-modal-action ao carregar.
   Botões sem ação dedicada mostram modal "função em desenvolvimento".
   ───────────────────────────────────────────────────────────── */
(function () {

  const MODAL_PRESETS = {
    'confirmar': { icon: 'check', color: '#2ecc71', defaultTitle: 'Confirmar ação' },
    'cancelar':  { icon: 'x', color: '#FF8888', defaultTitle: 'Cancelar' },
    'salvar':    { icon: 'check', color: '#2ecc71', defaultTitle: 'Salvar alterações' },
    'enviar':    { icon: 'send', color: '#4DB8FF', defaultTitle: 'Enviar' },
    'exportar':  { icon: 'download', color: '#4DB8FF', defaultTitle: 'Exportar' },
    'excluir':   { icon: 'trash', color: '#FF8888', defaultTitle: 'Excluir', warning: true },
    'banir':     { icon: 'alert', color: '#FF8888', defaultTitle: 'Banir membro', warning: true },
    'endossar':  { icon: 'shield-check', color: '#d2a344', defaultTitle: 'Endossar candidato' },
    'vetar':     { icon: 'shield', color: '#FF8888', defaultTitle: 'Vetar candidato', warning: true },
    'criar':     { icon: 'plus', color: '#4DB8FF', defaultTitle: 'Criar novo' },
    'editar':    { icon: 'edit', color: '#4DB8FF', defaultTitle: 'Editar' },
    'reagendar': { icon: 'calendar', color: '#f39c12', defaultTitle: 'Reagendar' },
    'inscrever': { icon: 'user-plus', color: '#2ecc71', defaultTitle: 'Inscrever-se' },
    'preview':   { icon: 'external', color: '#4DB8FF', defaultTitle: 'Pré-visualização' },
    'wip':       { icon: 'settings', color: '#999', defaultTitle: 'Em desenvolvimento' },
  };

  function ensureContainer() {
    let c = document.getElementById('hmc-modal-root');
    if (!c) {
      c = document.createElement('div');
      c.id = 'hmc-modal-root';
      c.innerHTML = `
        <style>
          #hmc-modal-bd { position: fixed; inset: 0; background: rgba(11,11,15,0.55); backdrop-filter: blur(8px); display: none; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
          #hmc-modal-bd.open { display: flex; }
          #hmc-modal { background: var(--bg, white); border: 1px solid var(--divider, #e3e5ea); border-radius: 18px; max-width: 460px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(0,0,0,0.20); font-family: 'Inter', sans-serif; }
          #hmc-modal-head { padding: 22px 26px 14px; display: flex; align-items: center; gap: 14px; border-bottom: 1px solid var(--divider, #e3e5ea); }
          #hmc-modal-icon { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          #hmc-modal-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 500; letter-spacing: -0.015em; line-height: 1.25; }
          #hmc-modal-close { margin-left: auto; width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--divider, #e3e5ea); background: transparent; color: var(--text-muted, #777); cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: inherit; font-size: 16px; }
          #hmc-modal-close:hover { background: var(--bg-card-hover, #f3f4f7); }
          #hmc-modal-body { padding: 18px 26px; font-size: 14px; line-height: 1.6; color: var(--text, #0b0b0f); }
          #hmc-modal-foot { padding: 16px 26px 22px; display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; }
          #hmc-modal-foot .btn { padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; border: 1px solid var(--divider, #e3e5ea); background: transparent; color: var(--text, #0b0b0f); transition: all 150ms; }
          #hmc-modal-foot .btn.primary { background: var(--blue-realce, #4DB8FF); border-color: var(--blue-realce, #4DB8FF); color: white; }
          #hmc-modal-foot .btn.primary:hover { background: var(--blue-chrome, #1554B3); }
          #hmc-modal-foot .btn.danger { background: #C8442B; border-color: #C8442B; color: white; }
          #hmc-modal-foot .btn:hover { transform: translateY(-1px); }
          #hmc-modal-toast { position: fixed; bottom: 24px; right: 24px; padding: 14px 18px; background: var(--bg, white); border: 1px solid var(--divider, #e3e5ea); border-left: 3px solid #2ecc71; border-radius: 10px; box-shadow: 0 12px 28px rgba(0,0,0,0.12); font-size: 13px; font-weight: 500; z-index: 10000; display: none; align-items: center; gap: 10px; transition: opacity 200ms; }
          #hmc-modal-toast.show { display: flex; }
        </style>
        <div id="hmc-modal-bd" onclick="event.target.id==='hmc-modal-bd' && HMC_MODAL.close()">
          <div id="hmc-modal" role="dialog">
            <div id="hmc-modal-head">
              <div id="hmc-modal-icon"></div>
              <div id="hmc-modal-title"></div>
              <button id="hmc-modal-close" onclick="HMC_MODAL.close()" aria-label="Fechar">×</button>
            </div>
            <div id="hmc-modal-body"></div>
            <div id="hmc-modal-foot"></div>
          </div>
        </div>
        <div id="hmc-modal-toast"><span id="hmc-modal-toast-icon">✓</span><span id="hmc-modal-toast-text"></span></div>
      `;
      document.body.appendChild(c);
    }
    return c;
  }

  function open(opts = {}) {
    ensureContainer();
    const action = opts.action || 'wip';
    const preset = MODAL_PRESETS[action] || MODAL_PRESETS.wip;
    const title = opts.title || preset.defaultTitle;
    const message = opts.message || `Esta ação ainda não está implementada no wireframe. Em produção dispara uma chamada de API e atualiza o estado correspondente.`;
    const confirmLabel = opts.confirmLabel || (preset.warning ? 'Confirmar' : 'OK');
    const cancelLabel = opts.cancelLabel || 'Cancelar';
    const onConfirm = opts.onConfirm || (() => toast(`${title} concluído`, '✓'));

    document.getElementById('hmc-modal-icon').style.background = preset.color + '22';
    document.getElementById('hmc-modal-icon').style.color = preset.color;
    document.getElementById('hmc-modal-icon').innerHTML = `<i data-icon="${preset.icon}" class="icon"></i>`;
    document.getElementById('hmc-modal-title').textContent = title;
    document.getElementById('hmc-modal-body').innerHTML = `<p style="margin: 0;">${message}</p>`;

    const foot = document.getElementById('hmc-modal-foot');
    foot.innerHTML = `
      <button class="btn" onclick="HMC_MODAL.close()">${cancelLabel}</button>
      <button class="btn ${preset.warning ? 'danger' : 'primary'}" id="hmc-modal-confirm">${confirmLabel}</button>
    `;
    document.getElementById('hmc-modal-confirm').onclick = () => {
      onConfirm();
      close();
    };

    document.getElementById('hmc-modal-bd').classList.add('open');
    if (window.HMC_ICONS && window.HMC_ICONS.run) window.HMC_ICONS.run();
  }

  function close() {
    const bd = document.getElementById('hmc-modal-bd');
    if (bd) bd.classList.remove('open');
  }

  function toast(text, icon = '✓') {
    ensureContainer();
    const t = document.getElementById('hmc-modal-toast');
    document.getElementById('hmc-modal-toast-icon').textContent = icon;
    document.getElementById('hmc-modal-toast-text').textContent = text;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  /* ─── AUTO-WIRING ──────────────────────────────────────
     Botões dentro de mode-pages (não navegação) que não tem
     onclick nem data-sidebar-* recebem ação genérica.
     ───────────────────────────────────────────────────────── */
  function autoWire() {
    const buttons = document.querySelectorAll('button:not([onclick]):not([data-sidebar-toggle]):not([data-sidebar-mobile-toggle]):not([type="submit"])');
    buttons.forEach(btn => {
      // Skip se for botão de UI control (já tem comportamento próprio)
      const cls = btn.className;
      if (/\b(mobile-fab|sidebar-toggle-btn|acc-tab|ag-view-btn|ag-pill|nt-pill|bs-pill|ag-nav-btn|ag-today|mc-nav-btn|ag-modal-close|bs-history-chip|bs-clear|ag-event-action|nt-action|mv-nav-btn|icon-btn-ghost|role-toggle|toggle|ed-tool|ac-tool)\b/.test(cls)) return;
      // Skip se for botão sem texto (provavelmente ícone-only)
      const text = btn.textContent.trim();
      if (!text || text.length < 2) return;

      btn.addEventListener('click', (e) => {
        if (btn.dataset.modalAction || btn.dataset.modalCustom) return; // já vai ser tratado
        e.preventDefault();
        // Inferir ação pelo texto do botão
        const lower = text.toLowerCase();
        let action = 'wip';
        if (/confirmar|aprovar/.test(lower)) action = 'confirmar';
        else if (/cancelar|recusar/.test(lower)) action = 'cancelar';
        else if (/salvar|publicar/.test(lower)) action = 'salvar';
        else if (/enviar/.test(lower)) action = 'enviar';
        else if (/exportar|baixar|download/.test(lower)) action = 'exportar';
        else if (/excluir|deletar|apagar/.test(lower)) action = 'excluir';
        else if (/banir|suspender/.test(lower)) action = 'banir';
        else if (/endossar/.test(lower)) action = 'endossar';
        else if (/vetar/.test(lower)) action = 'vetar';
        else if (/criar|nov[oa]/.test(lower)) action = 'criar';
        else if (/editar|reagendar/.test(lower)) action = 'editar';
        else if (/inscrever|agendar/.test(lower)) action = 'inscrever';
        else if (/preview|pré-?visualizar/.test(lower)) action = 'preview';

        open({
          action,
          title: text.length < 60 ? text : action.charAt(0).toUpperCase() + action.slice(1),
          message: action === 'wip'
            ? `O botão "${text}" está mapeado no wireframe. Em produção dispara a ação correspondente e atualiza o estado da página.`
            : `Em produção esta ação envia requisição ao servidor, atualiza estado e mostra confirmação.`,
        });
      });
    });
  }

  /* ─── BOTÕES COM data-modal-action explícito ──────────── */
  function wireExplicit() {
    document.querySelectorAll('[data-modal-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        open({
          action: btn.dataset.modalAction,
          title: btn.dataset.modalTitle,
          message: btn.dataset.modalMsg,
          confirmLabel: btn.dataset.modalConfirm,
        });
      });
    });
  }

  window.HMC_MODAL = { open, close, toast };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { wireExplicit(); autoWire(); });
  } else {
    wireExplicit();
    autoWire();
  }
})();
