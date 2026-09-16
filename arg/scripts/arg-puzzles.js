(function () {
  'use strict';

  const manifest = window.WARD13_ARG_MANIFEST;
  if (!manifest) throw new Error('WARD_13 ARG manifest is unavailable');

  const previewSession = (window.location.pathname.match(/\/preview\/([^/]+)\//i)?.[1] || '')
    .replace(/[^a-z0-9_-]/gi, '');
  const previewInstanceKey = previewSession ? `ward13.arg.preview-instance.${previewSession}` : '';
  let previewInstance = previewSession
    ? (new URLSearchParams(window.location.search).get('studioPreview') || '').replace(/[^a-z0-9_-]/gi, '')
    : '';
  if (previewSession) {
    try {
      if (previewInstance) sessionStorage.setItem(previewInstanceKey, previewInstance);
      else previewInstance = sessionStorage.getItem(previewInstanceKey) || 'legacy';
    } catch {
      previewInstance ||= 'legacy';
    }
  }
  const storageSuffix = previewSession ? `::preview:${previewSession}:${previewInstance || 'legacy'}` : '';
  const storageKey = `${manifest.storageKey}${storageSuffix}`;
  const completeKey = `${manifest.completeKey}${storageSuffix}`;
  const identityDepartments = new Set(['obstetrics', 'psychiatry', 'anesthesia', 'arrhythmia', 'neurology', 'womens-mental', 'urology', 'emergency']);
  const identityClues = {
    obstetrics: 'trauma_firstborn',
    psychiatry: 'trauma_conditional_love',
    anesthesia: 'trauma_dissociation',
    arrhythmia: 'trauma_panic',
    neurology: 'trauma_many_tabs',
    'womens-mental': 'trauma_testimony_overwritten',
    urology: 'trauma_body_evidence',
    emergency: 'trauma_compensation_collateral'
  };
  const observationPhotos = new Set(['corridor', 'staff', 'night-round', 'procedure']);

  function freshState() {
    return {
      version: 2,
      locale: 'ja',
      textSize: 'standard',
      clues: [],
      gates: {},
      attempts: {},
      departmentVisits: {},
      identityResponses: {},
      photoInspections: {},
      beautySeen: false,
      terminalHistory: [],
      completedAt: null,
      updatedAt: new Date().toISOString()
    };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (!parsed || parsed.version !== 2) return freshState();
      return {
        ...freshState(),
        ...parsed,
        textSize: ['small', 'standard', 'large'].includes(parsed.textSize) ? parsed.textSize : 'standard',
        clues: Array.isArray(parsed.clues) ? parsed.clues.filter(id => manifest.clues.some(clue => clue.id === id)) : [],
        gates: parsed.gates && typeof parsed.gates === 'object' ? parsed.gates : {},
        attempts: parsed.attempts && typeof parsed.attempts === 'object' ? parsed.attempts : {},
        departmentVisits: parsed.departmentVisits && typeof parsed.departmentVisits === 'object' ? parsed.departmentVisits : {},
        identityResponses: Object.fromEntries(Object.entries(parsed.identityResponses && typeof parsed.identityResponses === 'object' ? parsed.identityResponses : {}).filter(([slug]) => identityDepartments.has(slug)).map(([slug, choice]) => [slug, String(choice).slice(0, 32)])),
        photoInspections: Object.fromEntries(Object.entries(parsed.photoInspections && typeof parsed.photoInspections === 'object' ? parsed.photoInspections : {}).filter(([photoId, inspected]) => observationPhotos.has(photoId) && inspected === true)),
        beautySeen: parsed.beautySeen === true,
        terminalHistory: Array.isArray(parsed.terminalHistory) ? parsed.terminalHistory.slice(-30) : []
      };
    } catch {
      return freshState();
    }
  }

  function saveState(state) {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(storageKey, JSON.stringify(state));
    if (state.completedAt) localStorage.setItem(completeKey, '1');
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

  function identityStatus(state) {
    const responses = Object.keys(state.identityResponses || {}).filter(slug => identityDepartments.has(slug));
    const inspections = Object.keys(state.photoInspections || {}).filter(photoId => observationPhotos.has(photoId) && state.photoInspections[photoId] === true);
    return {
      responses: responses.length,
      totalResponses: identityDepartments.size,
      inspections: inspections.length,
      totalInspections: observationPhotos.size,
      galleryReady: responses.length >= 3,
      recognized: responses.length >= 4,
      beautyReady: responses.length >= 6 && inspections.length === observationPhotos.size
    };
  }

  function recordIdentity(state, department, choice) {
    if (!identityDepartments.has(department)) return { ok: false, first: false, ...identityStatus(state) };
    const first = !Object.prototype.hasOwnProperty.call(state.identityResponses, department);
    state.identityResponses[department] = String(choice || '').slice(0, 32);
    if (first) addClue(state, identityClues[department]);
    const status = identityStatus(state);
    if (status.recognized) addClue(state, 'akiba_mai_recognized');
    saveState(state);
    return { ok: true, first, ...status };
  }

  function inspectPhoto(state, photoId) {
    if (!observationPhotos.has(photoId)) return { ok: false, first: false, ...identityStatus(state) };
    const first = state.photoInspections[photoId] !== true;
    state.photoInspections[photoId] = true;
    const status = identityStatus(state);
    if (status.inspections === observationPhotos.size) addClue(state, 'photo_subjects_identical');
    saveState(state);
    return { ok: true, first, ...status };
  }

  function markBeautySeen(state) {
    if (!identityStatus(state).beautyReady) return false;
    const first = state.beautySeen !== true;
    state.beautySeen = true;
    addClue(state, 'beautiful_note');
    saveState(state);
    return first;
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
    storageKey,
    loadState,
    saveState,
    normalize,
    addClue,
    solveGate,
    finalStatus,
    identityStatus,
    recordIdentity,
    inspectPhoto,
    markBeautySeen,
    runTerminalCommand
  };
})();
