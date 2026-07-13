(function () {
  'use strict';

  const current = document.currentScript;
  if (!current) return;
  const endings = (() => {
    try { return Object.keys(JSON.parse(localStorage.getItem('ward13_endings') || '{}')).length; } catch { return 0; }
  })();
  const visits = Number(localStorage.getItem('ward13_visit_count') || '0');
  const complete = localStorage.getItem('ward13_arg_complete') === '1';
  const polluted = localStorage.getItem('ward13_polluted') === '1';
  if (!complete && !polluted && endings === 0 && visits < 2) return;

  const base = new URL('../', current.src);
  const contentScript = document.createElement('script');
  contentScript.src = new URL('data/arg-content.js', base).href;
  contentScript.onload = () => {
    const saved = (() => {
      try { return JSON.parse(localStorage.getItem('ward13_arg_state_v1') || '{}'); } catch { return {}; }
    })();
    const locale = saved.locale === 'ja' ? 'ja' : 'zh';
    const text = window.WARD13_ARG_CONTENT?.locales?.[locale]?.bridge;
    if (!text) return;
    const link = document.createElement('a');
    link.className = 'ward13-arg-bridge';
    link.href = new URL(complete ? 'evidence.html' : 'index.html', base).href;
    link.textContent = complete ? text.complete : text.entry;
    link.setAttribute('aria-label', link.textContent);
    const style = document.createElement('style');
    style.textContent = '.ward13-arg-bridge{position:fixed;right:12px;bottom:72px;z-index:9997;max-width:min(300px,calc(100vw - 24px));padding:9px 12px;border:1px solid #5d1b2d;background:rgba(12,10,14,.94);color:#c86b82;font:12px/1.45 monospace;letter-spacing:.04em;text-decoration:none;box-shadow:0 10px 28px #0008}.ward13-arg-bridge:hover,.ward13-arg-bridge:focus-visible{color:#fff;border-color:#d34f70}@media(max-width:600px){.ward13-arg-bridge{bottom:64px;font-size:11px}}';
    document.head.appendChild(style);
    document.body.appendChild(link);
  };
  document.head.appendChild(contentScript);
})();
