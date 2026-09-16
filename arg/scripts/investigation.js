(async function () {
  'use strict';
  const base = new URL('../', document.currentScript.src);
  const loadScript = file => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL(file, base).href;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  try {
    await Promise.all([loadScript('scripts/investigation-model.js'), loadScript('data/investigation-content.js')]);
  } catch (error) {
    console.error('Investigation interface could not load', error);
    return;
  }
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = new URL('styles/investigation.css', base).href;
  document.head.appendChild(css);
  const app = document.getElementById('arg-app');
  const engine = window.WARD13_ARG;
  const model = window.WARD13_INVESTIGATION_MODEL;
  const key = `${engine.storageKey}:investigation:1`;
  const dedicated = new URLSearchParams(location.search).get('case') === '13';
  const view = document.body.dataset.view;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const url = file => new URL(file, base).href;
  const boardUrl = url('evidence.html?case=13');
  const storyUrl = new URL('../index.html?story=1&case=13', base).href;
  let caseState;
  function read() {
    try { return model.restore(JSON.parse(localStorage.getItem(key) || 'null')); }
    catch { return model.fresh(); }
  }
  function locale() { return engine.loadState().locale; }
  function words() { return window.WARD13_INVESTIGATION_COPY[locale()] || window.WARD13_INVESTIGATION_COPY.en; }
  function original(path) {
    return path.split('.').reduce((value, part) => value?.[part], window.WARD13_ARG_CONTENT.locales[locale()]) || '';
  }
  function persist(next) {
    try {
      localStorage.setItem(key, JSON.stringify(next));
      caseState = next;
      return true;
    } catch {
      showFeedback(words().storageError);
      return false;
    }
  }
  function sourceUrl(id) {
    return url(id === 'public-floor' ? 'index.html#investigation-source' : 'archive.html#investigation-source');
  }
  function sourceName(id) { return words()[id === 'public-floor' ? 'publicSource' : 'archiveSource']; }
  function refresh() {
    window.dispatchEvent(new Event('ward13-investigation-change'));
  }
  function showFeedback(message) {
    const output = app.querySelector('[data-case-feedback]');
    if (output) {
      output.textContent = message;
      output.focus({ preventScroll: true });
    }
  }
  function actionLink(href, text, primary = false) {
    return `<a class="case-link${primary ? ' case-primary' : ''}" href="${escape(href)}">${escape(text)}</a>`;
  }
  function receipt() {
    const w = words();
    return `<aside class="case-receipt"><span class="case-eyebrow">${escape(w.receipt)}</span><strong>${escape(w.recalled)}</strong><p>${escape(w.recallBody)}</p>${actionLink(boardUrl, w.board)}</aside>`;
  }
  function sourcePanel(id) {
    const w = words();
    const saved = Boolean(caseState.copies[id]);
    return `<section class="case-source" id="investigation-source" aria-labelledby="case-source-title"><p class="case-eyebrow">${escape(w.label)}</p><h2 id="case-source-title">${escape(w.title)}</h2><p>${escape(id === 'public-floor' ? w.task : w.archiveTask)}</p><div class="case-actions"><button type="button" data-case-save="${id}"${saved ? ' disabled' : ''}>${escape(saved ? w.saved : w.save)}</button>${saved ? actionLink(id === 'public-floor' && !caseState.copies['archive-close'] ? url('archive.html#investigation-source') : boardUrl, id === 'public-floor' && !caseState.copies['archive-close'] ? w.archive : w.board, true) : ''}</div><p class="case-feedback" data-case-feedback role="status" tabindex="-1"></p>${caseState.solvedAt && id === 'public-floor' ? receipt() : ''}</section>`;
  }
  function copyCard(id) {
    const w = words();
    const copy = caseState.copies[id];
    const content = copy ? `<p class="case-copy-meta">${escape(w.captured)} · <time datetime="${escape(copy.capturedAt)}">${escape(new Date(copy.capturedAt).toLocaleString())}</time> · ${escape(copy.locale)}</p><blockquote lang="${escape(copy.locale)}"><strong>${escape(copy.title)}</strong><p>${escape(copy.text)}</p></blockquote>` : `<p class="case-empty">${escape(w.empty)}</p>`;
    return `<article class="case-copy${copy ? ' case-copy-saved' : ''}"><label class="case-copy-label"><input type="checkbox" name="source" value="${id}"${caseState.solvedAt ? ' checked disabled' : copy ? '' : ' disabled'}><span>${escape(sourceName(id))}</span></label>${content}${actionLink(sourceUrl(id), w.source)}</article>`;
  }
  function board() {
    const w = words();
    const count = Object.keys(caseState.copies).length;
    const complete = Boolean(caseState.solvedAt);
    const hints = caseState.hintLevel ? `<ol class="case-hints">${w.hints.slice(0, caseState.hintLevel).map(hint => `<li>${escape(hint)}</li>`).join('')}</ol>` : '';
    const conclusion = complete
      ? `<section class="case-complete" aria-labelledby="case-complete-title"><p class="case-eyebrow">01 / VERIFIED</p><h3 id="case-complete-title">${escape(w.completeTitle)}</h3><p>${escape(w.solved)}</p><p>${escape(w.completeBody)}</p><div class="case-actions">${actionLink(sourceUrl('public-floor'), w.revisit)}${actionLink(storyUrl, w.keep, true)}</div></section>`
      : `<fieldset class="case-question"><legend>${escape(w.question)}</legend>${['never', 'removed', 'transfer'].map(value => `<label><input type="radio" name="relation" value="${value}" required><span>${escape(w[value])}</span></label>`).join('')}<button class="case-primary" type="submit">${escape(w.compare)}</button></fieldset>`;
    return `<section class="case-board" id="investigation-board" aria-labelledby="case-board-title"><header class="case-board-heading"><div><p class="case-eyebrow">${escape(w.label)}</p><h2 id="case-board-title">${escape(w.title)}</h2></div><span class="case-count">${count} / 2 ${escape(w.progress)}</span></header><p>${escape(w.lead)}</p><form class="case-form"><div class="case-copies">${model.sourceIds.map(copyCard).join('')}</div>${conclusion}<p class="case-feedback" data-case-feedback role="status" tabindex="-1"></p></form>${!complete ? `<div class="case-hint-area"><button type="button" data-case-hint${caseState.hintLevel >= 3 ? ' disabled' : ''}>${escape(w.hint)} · ${caseState.hintLevel}/3</button>${hints}</div>` : ''}<nav class="case-bottom-links" aria-label="${escape(w.label)}">${actionLink(url('index.html'), w.back)}${actionLink(url('evidence.html'), w.deeper)}${!complete ? actionLink(storyUrl, w.optional) : ''}</nav></section>`;
  }
  function mount() {
    caseState = read();
    const w = words();
    // Existing links remain useful even though the root now opens the ARG.
    for (const link of app.querySelectorAll('a[href="../index.html"]')) link.href = storyUrl;
    const main = app.querySelector('main');
    if (!main || main.querySelector('.case-board, .case-source')) return;
    if (view === 'portal') {
      const guide = app.querySelector('.floor-guide');
      if (guide) guide.insertAdjacentHTML('beforeend', sourcePanel('public-floor'));
      const hero = app.querySelector('.hero');
      if (hero) hero.insertAdjacentHTML('afterend', `<aside class="case-invitation"><span class="case-eyebrow">${escape(w.label)}</span><a href="#investigation-source">${escape(caseState.solvedAt ? w.revisit : caseState.copies['public-floor'] ? w.resume : w.title)} <span aria-hidden="true">↗</span></a><details><summary>${escape(w.quiet)}</summary><p>${escape(w.warning)}</p></details></aside>`);
    }
    if (view === 'archive') {
      const firstRecord = app.querySelector('.archive-card');
      if (firstRecord) firstRecord.insertAdjacentHTML('beforeend', sourcePanel('archive-close'));
    }
    if (view === 'evidence') {
      document.body.classList.toggle('case-dedicated', dedicated);
      if (dedicated) for (const child of [...main.children]) child.hidden = true;
      main.insertAdjacentHTML('afterbegin', board());
      // Reveal source locations, not internal implementation identifiers.
      for (const item of main.querySelectorAll('.evidence-list > li')) {
        const identifier = item.querySelector(':scope > span');
        const clue = engine.manifest.clues.find(clue => clue.id === identifier?.textContent);
        const destination = engine.manifest.views.find(item => item.id === clue?.source);
        if (identifier && destination) {
          const link = document.createElement('a');
          link.href = url(destination.id === 'department' ? 'departments.html' : destination.file);
          link.textContent = `${w.source} ↗`;
          identifier.replaceWith(link);
        }
      }
      const missing = main.querySelector('.final-gate code');
      if (missing) {
        const links = document.createElement('nav');
        links.className = 'case-missing-sources';
        links.setAttribute('aria-label', w.source);
        const needed = engine.finalStatus(engine.loadState()).missing;
        const views = [...new Set(needed.map(id => engine.manifest.clues.find(clue => clue.id === id)?.source))];
        for (const id of views) {
          const destination = engine.manifest.views.find(item => item.id === id);
          if (!destination) continue;
          const link = document.createElement('a');
          link.href = url(destination.file);
          link.textContent = original(`nav.${id}`) || w.source;
          links.appendChild(link);
        }
        missing.replaceWith(links);
      }
    }
    if (Object.keys(caseState.copies).length && !app.querySelector('.case-notebook-link')) {
      const nav = app.querySelector('.header-actions');
      if (nav) nav.insertAdjacentHTML('beforeend', `<a class="case-notebook-link" href="${escape(boardUrl)}">${escape(w.board)} <span aria-hidden="true">· ${Object.keys(caseState.copies).length}/2</span></a>`);
    }
    // The source card is loaded asynchronously, so native fragment scrolling
    // may have occurred before it existed.
    if (location.hash === '#investigation-source') requestAnimationFrame(() => app.querySelector('#investigation-source')?.scrollIntoView({ block: 'center' }));
  }
  app.addEventListener('click', event => {
    const save = event.target.closest('[data-case-save]');
    if (save) {
      const id = save.dataset.caseSave;
      const next = read();
      const title = original(id === 'public-floor' ? 'portal.floorsTitle' : 'archive.card1Title');
      const text = id === 'public-floor'
        ? ['portal.floorsLead', 'portal.floor12', 'portal.floorGap', 'portal.floor14'].map(original).join('\n')
        : ['archive.card1Meta', 'archive.card1Body'].map(original).join('\n');
      model.capture(next, { id, title, text, locale: locale(), capturedAt: new Date().toISOString() });
      if (!persist(next)) return;
      // Keep the original investigation compatible without replacing its rules.
      try {
        engine.addClue(engine.loadState(), id === 'public-floor' ? 'floor_13_omitted' : 'archive_13_exists');
      } catch { /* The separately verified copy is already safe. */ }
      refresh();
      app.querySelector('#investigation-source .case-link')?.focus({ preventScroll: true });
    }
    if (event.target.closest('[data-case-hint]')) {
      const selected = [...app.querySelectorAll('.case-form input:checked')].map(input => ({ name: input.name, value: input.value }));
      const next = read();
      next.hintLevel = Math.min(3, next.hintLevel + 1);
      if (!persist(next)) return;
      refresh();
      for (const input of app.querySelectorAll('.case-form input')) input.checked = selected.some(item => item.name === input.name && item.value === input.value);
      showFeedback(words().hints[caseState.hintLevel - 1]);
    }
  });
  app.addEventListener('submit', event => {
    if (!event.target.matches('.case-form')) return;
    event.preventDefault();
    const data = new FormData(event.target);
    const next = read();
    const result = model.compare(next, data.getAll('source'), data.get('relation'), new Date().toISOString());
    if (result === 'solved') {
      if (!persist(next)) return;
      refresh();
    }
    showFeedback(words()[result]);
  });
  window.WARD13_INVESTIGATION = { mount };
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === engine.storageKey) refresh();
  });
  mount();
})();
