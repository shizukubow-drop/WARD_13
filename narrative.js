(function (root) {
    'use strict';
    const api = {
        remember(state, choice, lead) {
            if (!state.narrativeMemory || typeof state.narrativeMemory !== 'object') state.narrativeMemory = {};
            if (!Array.isArray(state.choiceTrail)) state.choiceTrail = [];
            Object.entries(choice.memory || {}).forEach(([key, value]) => {
                if (key !== '__proto__' && key !== 'constructor' && typeof value === 'string') state.narrativeMemory[key] = value;
            });
            if (lead) state.choiceTrail.push(lead);
        },
        recall(node, memory) {
            return (node.recalls || []).map(item => {
                const value = (memory || {})[item.key];
                return Object.prototype.hasOwnProperty.call(item.lines, value) ? item.lines[value] : '';
            }).filter(Boolean).join('\n\n');
        },
        chooseRoute(scores, keys, trail) {
            const value = key => Number.isFinite(scores[key]) ? scores[key] : 0;
            const maximum = Math.max(...keys.map(value));
            const tied = keys.filter(key => value(key) === maximum);
            for (let i = (trail || []).length - 1; i >= 0; i--) {
                if (tied.includes(trail[i])) return trail[i];
            }
            return tied[0];
        }
    };
    root.WARD13_NARRATIVE = api;
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
