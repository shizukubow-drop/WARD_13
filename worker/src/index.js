const BASE_PATIENT_COUNT = 11;
const ALLOWED_ORIGINS = new Set([
    'https://shizukubow-drop.github.io',
    'http://127.0.0.1:8765',
    'http://127.0.0.1:8767',
    'http://localhost:8765'
]);

export default {
    async fetch(request, env) {
        const origin = request.headers.get('Origin') || '';
        const cors = corsHeaders(origin);
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: cors });
        }

        const url = new URL(request.url);
        try {
            if (request.method === 'GET' && url.pathname === '/patients') {
                return json(await patientSummary(env.DB), 200, cors);
            }

            if (request.method === 'POST' && url.pathname === '/patients/complete') {
                if (!ALLOWED_ORIGINS.has(origin)) {
                    return json({ error: 'origin_not_allowed' }, 403, cors);
                }
                const body = await request.json();
                const completionId = String(body?.completionId || '');
                if (!/^[0-9a-f-]{36}$/i.test(completionId)) {
                    return json({ error: 'invalid_completion_id' }, 400, cors);
                }

                const tokenHash = await sha256(completionId);
                await env.DB.prepare(
                    'INSERT OR IGNORE INTO patient_completions (token_hash) VALUES (?)'
                ).bind(tokenHash).run();

                const patient = await env.DB.prepare(
                    'SELECT id FROM patient_completions WHERE token_hash = ?'
                ).bind(tokenHash).first();
                const summary = await patientSummary(env.DB);
                return json({
                    patientNumber: BASE_PATIENT_COUNT + Number(patient.id),
                    total: summary.total
                }, 200, cors);
            }

            return json({ error: 'not_found' }, 404, cors);
        } catch (error) {
            console.error('WARD_13 patient registry error', error);
            return json({ error: 'registry_unavailable' }, 503, cors);
        }
    }
};

async function patientSummary(db) {
    const row = await db.prepare('SELECT COUNT(*) AS completions FROM patient_completions').first();
    return { total: BASE_PATIENT_COUNT + Number(row?.completions || 0) };
}

async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function corsHeaders(origin) {
    const headers = {
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json; charset=utf-8'
    };
    if (ALLOWED_ORIGINS.has(origin)) headers['Access-Control-Allow-Origin'] = origin;
    return headers;
}

function json(value, status, headers) {
    return new Response(JSON.stringify(value), { status, headers });
}
