(function () {
  'use strict';
  const sourceIds = ['public-floor', 'archive-close'];
  function fresh() {
    return { version: 1, copies: {}, hintLevel: 0, solvedAt: null };
  }
  function restore(raw) {
    const state = fresh();
    if (!raw || raw.version !== 1) return state;
    for (const id of sourceIds) {
      const copy = raw.copies?.[id];
      if (copy && typeof copy.title === 'string' && typeof copy.text === 'string'
        && typeof copy.locale === 'string' && typeof copy.capturedAt === 'string') {
        state.copies[id] = { id, title: copy.title, text: copy.text, locale: copy.locale, capturedAt: copy.capturedAt };
      }
    }
    state.hintLevel = Math.min(3, Math.max(0, Number(raw.hintLevel) || 0));
    if (typeof raw.solvedAt === 'string' && sourceIds.every(id => state.copies[id])) state.solvedAt = raw.solvedAt;
    return state;
  }
  function capture(state, copy) {
    if (!sourceIds.includes(copy.id) || state.copies[copy.id]) return false;
    state.copies[copy.id] = { ...copy };
    return true;
  }
  function compare(state, ids, relation, now) {
    if (!sourceIds.every(id => state.copies[id])) return 'missing';
    if (new Set(ids).size !== 2 || !sourceIds.every(id => ids.includes(id))) return 'selectBoth';
    if (relation !== 'removed') return relation === 'never' ? 'notNever' : 'notTransfer';
    state.solvedAt ||= now;
    return 'solved';
  }
  window.WARD13_INVESTIGATION_MODEL = { sourceIds, fresh, restore, capture, compare };
})();
