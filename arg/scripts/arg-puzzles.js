(function () {
  'use strict';

  const manifest = window.WARD13_ARG_MANIFEST;
  if (!manifest) throw new Error('WARD_13 ARG manifest is unavailable');

  function freshState() {
    return {
      version: 2,
      locale: 'ja',
      clues: [],
      gates: {},
      attempts: {},
      terminalHistory: [],
      completedAt: null,
      updatedAt: new Date().toISOString()
    };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(manifest.storageKey) || 'null');
      if (!parsed || parsed.version !== 2) return freshState();
      return {
        ...freshState(),
        ...parsed,
        clues: Array.isArray(parsed.clues) ? parsed.clues.filter(id => manifest.clues.some(clue => clue.id === id)) : [],
        gates: parsed.gates && typeof parsed.gates === 'object' ? parsed.gates : {},
        attempts: parsed.attempts && typeof parsed.attempts === 'object' ? parsed.attempts : {},
        terminalHistory: Array.isArray(parsed.terminalHistory) ? parsed.terminalHistory.slice(-30) : []
      };
    } catch {
      return freshState();
    }
  }

  function saveState(state) {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(manifest.storageKey, JSON.stringify(state));
    if (state.completedAt) localStorage.setItem(manifest.completeKey, '1');
    return state;
  }

  function normalize(value) {
    return String(value || '')
      .normalize('NFKC')
      .trim()
      .toUpperCase()
      .replace(/[\s._-]+/g, '');
  }

  function addClue(state, clueId) {
    if (!manifest.clues.some(clue => clue.id === clueId)) return false;
    if (state.clues.includes(clueId)) return false;
    state.clues.push(clueId);
    saveState(state);
    return true;
  }

  function solveGate(state, gateId, answer) {
    const gate = manifest.gates[gateId];
    if (!gate) return { ok: false, attempts: 0, hintLevel: 0 };
    if (state.gates[gateId]) return { ok: true, alreadySolved: true, attempts: state.attempts[gateId] || 0, hintLevel: 2 };
    state.attempts[gateId] = (state.attempts[gateId] || 0) + 1;
    const ok = gate.answers.some(candidate => normalize(candidate) === normalize(answer));
    if (ok) {
      state.gates[gateId] = true;
      for (const clueId of gate.grants || []) addClue(state, clueId);
      saveState(state);
    } else {
      saveState(state);
    }
    const attempts = state.attempts[gateId];
    const hintLevel = attempts >= gate.hintAfter[1] ? 2 : attempts >= gate.hintAfter[0] ? 1 : 0;
    return { ok, attempts, hintLevel };
  }

  function finalStatus(state) {
    const missing = manifest.requiredForFinal.filter(id => !state.clues.includes(id));
    return { ready: missing.length === 0, missing };
  }

  function runTerminalCommand(state, rawCommand) {
    const command = normalize(rawCommand).split(/\s+/)[0] || '';
    const definition = manifest.terminalCommands[command];
    if (!definition) return { command, responseKey: 'terminal.unknown', clueAdded: false };
    const clueAdded = definition.clue ? addClue(state, definition.clue) : false;
    state.terminalHistory.push({ command, responseKey: definition.response, at: new Date().toISOString() });
    state.terminalHistory = state.terminalHistory.slice(-30);
    saveState(state);
    return { command, responseKey: definition.response, clueAdded };
  }

  window.WARD13_ARG = {
    manifest,
    loadState,
    saveState,
    normalize,
    addClue,
    solveGate,
    finalStatus,
    runTerminalCommand
  };
})();
