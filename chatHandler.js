/**
 * chatHandler.js - Krushak Sahayak chatbot backend
 *
 * Handles POST /api/chat. Sends the conversation + compact scheme data to Gemini
 * (plain REST via fetch, no extra npm package) and returns:
 *   { reply: string, scheme_ids: string[], source: 'gemini' | 'fallback' }
 *
 * The frontend renders scheme CARDS from scheme_ids using its own copy of
 * MOCK_SCHEMES, so card content can never be hallucinated by the model.
 *
 * Setup: put GEMINI_API_KEY=... in a .env file next to server.js (server-side only,
 * never use a VITE_ prefix for this key).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOCK_SCHEMES } from './src/data/mockSchemes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Tiny .env loader (works on any Node version, no dotenv dependency)
// ---------------------------------------------------------------------------
function loadEnvFile() {
  try {
    const envPath = path.join(__dirname, '.env');
    if (!fs.existsSync(envPath)) return;
    for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!m || line.trim().startsWith('#')) continue;
      const val = m[2].replace(/^['"]|['"]$/g, '');
      if (process.env[m[1]] === undefined) process.env[m[1]] = val;
    }
  } catch (e) {
    console.warn('[chat] Could not read .env:', e.message);
  }
}
loadEnvFile();

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
console.log(`[chat] Gemini model: ${GEMINI_MODEL} | API key ${process.env.GEMINI_API_KEY ? 'loaded' : 'NOT loaded'}`);
const SCHEME_IDS = MOCK_SCHEMES.map((s) => s.id);
const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY = 10;
const MAX_CARDS = 3;

// ---------------------------------------------------------------------------
// Scheme data -> compact JSON for the prompt (drops colours, icons, audio text)
// ---------------------------------------------------------------------------
function compactSchemes(lang) {
  const L = lang === 'en' ? 'en' : 'or';
  return MOCK_SCHEMES.map((s) => ({
    id: s.id,
    name_en: s.name_en,
    name_or: s.name_or,
    for_whom: s[`targetAudience_${L}`],
    eligibility_rules: s.eligibility_criteria,
    eligibility_note: s.eligibility_note_en || undefined,
    summary: s[`description_${L}`],
    benefits: s[`benefits_${L}`],
    documents: s[`documents_${L}`],
    official_link: s.official_link,
    helpline: s.helpline,
    department: s[`department_${L}`]
  }));
}

function buildSystemPrompt(lang) {
  const langRule =
    lang === 'en'
      ? 'Reply ONLY in simple English.'
      : 'Reply ONLY in Odia (ଓଡ଼ିଆ), written in Odia script, using simple spoken-style words. Keep scheme acronyms such as KALIA, BSKY, PM-KISAN, PMFBY in Latin letters. Even if the user writes in English or in romanised Odia, reply in Odia.';

  return `You are "Krushak Sahayak" (କୃଷକ ସହାୟକ), a warm, friendly assistant for farmers and rural families in Odisha, India. You help people discover government schemes.

LANGUAGE: ${langRule}

WHAT YOU DO
1. Casual chat (greetings, "how are you", "what do you do", thanks, goodbye): answer naturally in 1-2 short sentences, then gently mention you can help find government schemes. Set scheme_ids to [].
2. Scheme questions: answer ONLY from the SCHEME DATA below. Never invent amounts, dates, links, phone numbers or eligibility rules. If the data does not contain the answer, say you do not have that detail and point to the scheme's official_link or helpline.
3. Anything else (politics opinions, coding, medical advice, etc.): politely say you can only chat and help with Odisha government schemes.

ELIGIBILITY HELP
- If the user asks which schemes they qualify for but has not given details, ask ONE short question for: age, occupation (farmer / agricultural labourer / artisan / self-employed / other), yearly family income, whether they have a ration card, and whether they are a woman. Set scheme_ids to [].
- If they gave details, compare them with eligibility_rules and eligibility_note and recommend only the matching schemes. Be honest when you are unsure and say final eligibility is decided by the department.

CARDS
- scheme_ids is the list of scheme ids to show as visual cards under your reply (max ${MAX_CARDS}). Use ids exactly as they appear in SCHEME DATA.
- Include cards when the user asks about a specific scheme, asks for recommendations, or asks about benefits/documents/how to apply.
- Do NOT include cards for greetings, small talk, clarifying questions, or when the user asks a tiny follow-up about a scheme whose card was just shown.
- Cards already show the full benefits list, documents and apply link, so DO NOT repeat all of that in text. Write a short summary (key amount, who it is for, one tip).

STYLE: short (under about 80 words), simple words, no markdown, no asterisks, no tables. Be kind and respectful.

OUTPUT: Return JSON only: {"reply": string, "scheme_ids": string[]}

SCHEME DATA (JSON):
${JSON.stringify(compactSchemes(lang))}`;
}

// ---------------------------------------------------------------------------
// Gemini REST call
// ---------------------------------------------------------------------------
function cleanHistory(history) {
  if (!Array.isArray(history)) return [];
  const out = [];
  for (const m of history.slice(-MAX_HISTORY)) {
    if (!m || typeof m.text !== 'string' || !m.text.trim()) continue;
    const role = m.role === 'user' ? 'user' : 'model';
    // Gemini wants alternating-ish turns starting with user
    if (out.length === 0 && role !== 'user') continue;
    out.push({ role, parts: [{ text: m.text.slice(0, MAX_MESSAGE_CHARS) }] });
  }
  return out;
}

// Tries GEMINI_MODEL first, then backups. Temporary errors (503 overloaded, 429 quota, 5xx)
// get one quick retry, then the next model is tried. Permanent errors (404 bad model,
// 400/403 bad key) skip straight to the next model.
const FALLBACK_MODELS = (process.env.GEMINI_FALLBACK_MODELS || 'gemini-3.5-flash-lite,gemini-2.5-flash')
  .split(',').map((s) => s.trim()).filter(Boolean);
// NOTE: Google retires models often (2.5-flash-lite is already closed to new keys). Run
// `node check-gemini.js` to see which names your key can use, and set GEMINI_FALLBACK_MODELS.
const MODEL_CHAIN = [...new Set([GEMINI_MODEL, ...FALLBACK_MODELS])];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// "GEMINI_HTTP_503: {...json...}" -> "503 This model is currently experiencing high demand"
function briefError(msg) {
  const code = (msg.match(/GEMINI_HTTP_(\d+)/) || [])[1];
  const text = (msg.match(/"message":\s*"([^"]+)"/) || [])[1] || msg;
  return `${code || 'error'} ${text}`.slice(0, 110);
}
const isTemporary = (err) => /GEMINI_HTTP_(429|500|502|503|504)|aborted|fetch failed/i.test(err.message);

async function callGemini(args) {
  if (!process.env.GEMINI_API_KEY) throw new Error('NO_API_KEY');
  const failures = [];
  for (const model of MODEL_CHAIN) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const out = await callGeminiOnce({ ...args, model });
        if (model !== GEMINI_MODEL) console.warn(`[chat] answered by backup model ${model}`);
        return out;
      } catch (err) {
        console.warn(`[chat] ${model} attempt ${attempt + 1} failed: ${err.message.slice(0, 120)}`);
        if (!isTemporary(err) || attempt === 1) failures.push(`${model}: ${briefError(err.message)}`);
        if (!isTemporary(err)) break; // permanent error: don't retry this model
        if (attempt === 0) await sleep(800);
      }
    }
  }
  throw new Error(failures.join(' | '));
}

async function callGeminiOnce({ message, history, lang, model }) {
  const apiKey = process.env.GEMINI_API_KEY;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildSystemPrompt(lang) }] },
          contents: [...cleanHistory(history), { role: 'user', parts: [{ text: message }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1024,
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'OBJECT',
              properties: {
                reply: { type: 'STRING' },
                scheme_ids: { type: 'ARRAY', items: { type: 'STRING', enum: SCHEME_IDS } }
              },
              required: ['reply', 'scheme_ids']
            },
            // Chat answers don't need long "thinking"; this keeps replies fast and cheap.
            thinkingConfig: { thinkingBudget: 0 }
          }
        })
      }
    );

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`GEMINI_HTTP_${res.status}: ${body.slice(0, 300)}`);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
    if (!text) throw new Error('GEMINI_EMPTY');

    let parsed;
    try {
      parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
    } catch {
      parsed = { reply: text.trim(), scheme_ids: [] };
    }
    return parsed;
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Offline fallback (no API key / quota / network): keyword matching so the
// chatbot still answers and still shows cards.
// ---------------------------------------------------------------------------
const ALIASES = {
  kalia: ['kalia', 'କାଳିଆ'],
  bsky: ['bsky', 'nabin', 'naveen card', 'health', 'hospital', 'treatment', 'ସ୍ୱାସ୍ଥ୍ୟ', 'ବିଜୁ', 'ନବୀନ', 'ଚିକିତ୍ସା', 'ହସ୍ପିଟାଲ'],
  'pm-kisan': ['kisan', 'pm-kisan', 'pmkisan', 'କିଷାନ'],
  balaram: ['balaram', 'landless', 'sharecropper', 'jlg', 'ବଳରାମ', 'ଭୂମିହୀନ', 'ଭାଗଚାଷୀ'],
  subhadra: ['subhadra', 'women', 'woman', 'mahila', 'ସୁଭଦ୍ରା', 'ମହିଳା'],
  'mission-shakti': ['mission shakti', 'shakti', 'shg', 'self help', 'ମିଶନ', 'ଶକ୍ତି', 'ସ୍ୱୟଂ ସହାୟକ'],
  pmfby: ['fasal', 'bima', 'insurance', 'crop loss', 'ବୀମା', 'ଫସଲ ବୀମା'],
  'pmay-g': ['awas', 'awaas', 'house', 'housing', 'ଆବାସ', 'ଘର'],
  mbpy: ['pension', 'madhu babu', 'madhubabu', 'old age', 'widow', 'ପେନସନ', 'ମଧୁବାବୁ', 'ବିଧବା', 'ବୃଦ୍ଧ']
};
const POPULAR = ['kalia', 'bsky', 'pm-kisan'];

const T = {
  or: {
    greet: 'ନମସ୍କାର! 🙏 ମୁଁ କୃଷକ ସହାୟକ। ଓଡ଼ିଶାର ସରକାରୀ ଯୋଜନା ବିଷୟରେ ଜାଣିବାରେ ମୁଁ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିପାରିବି।',
    how: 'ମୁଁ ଭଲ ଅଛି, ଧନ୍ୟବାଦ! ଆପଣ କେମିତି ଅଛନ୍ତି? ଯୋଜନା ବିଷୟରେ କିଛି ପଚାରିବାକୁ ଚାହାନ୍ତି କି?',
    who: 'ମୁଁ କୃଷକ ସହାୟକ, ଏକ AI ସହାୟକ। ଆପଣଙ୍କ ବୟସ, ବୃତ୍ତି ଓ ଆୟ ଅନୁସାରେ କେଉଁ ସରକାରୀ ଯୋଜନା ଲାଗୁ ହେବ, ମୁଁ ତାହା ଜଣାଇପାରିବି।',
    thanks: 'ଆପଣଙ୍କୁ ମଧ୍ୟ ଧନ୍ୟବାଦ! ଆଉ କିଛି ଜାଣିବାକୁ ଥିଲେ ପଚାରନ୍ତୁ।',
    bye: 'ଧନ୍ୟବାଦ! ପୁଣି ଭେଟିବା। 🙏',
    found: 'ଆପଣଙ୍କ ପ୍ରଶ୍ନ ସହ ଏହି ଯୋଜନା ମେଳ ଖାଉଛି। ବିବରଣୀ ତଳେ ଦେଖନ୍ତୁ:',
    popular: 'ଏହି ଲୋକପ୍ରିୟ ଯୋଜନାଗୁଡ଼ିକ ଦେଖନ୍ତୁ। ଆପଣଙ୍କ ପାଇଁ ସଠିକ୍ ଯୋଜନା ଜାଣିବାକୁ ବୟସ, ବୃତ୍ତି, ଆୟ ଓ ରାସନ କାର୍ଡ ବିଷୟରେ କହନ୍ତୁ।',
    unknown: 'ମୁଁ କେବଳ ଓଡ଼ିଶାର ସରକାରୀ ଯୋଜନା ବିଷୟରେ ସାହାଯ୍ୟ କରିପାରିବି। ଯେପରିକି କାଳିଆ, ସୁଭଦ୍ରା, ପେନସନ କିମ୍ବା ଫସଲ ବୀମା ବିଷୟରେ ପଚାରନ୍ତୁ।'
  },
  en: {
    greet: "Namaskar! 🙏 I'm Krushak Sahayak. I can help you find Odisha government schemes.",
    how: "I'm doing well, thank you! How are you? Would you like to ask about any scheme?",
    who: "I'm Krushak Sahayak, an AI assistant. I can tell you which government schemes may apply to you based on your age, occupation and income.",
    thanks: "You're welcome! Ask me anything else about schemes.",
    bye: 'Thank you! See you again. 🙏',
    found: 'These schemes match your question. See the details below:',
    popular: 'Here are some popular schemes. Tell me your age, occupation, income and ration card status to find the best match.',
    unknown: 'I can only help with Odisha government schemes, for example KALIA, Subhadra, pension or crop insurance. Please ask about one of these.'
  }
};

function fallbackReply(message, lang) {
  const t = T[lang === 'en' ? 'en' : 'or'];
  const q = message.toLowerCase();

  const matched = SCHEME_IDS.filter((id) => (ALIASES[id] || []).some((k) => q.includes(k.toLowerCase())));
  if (matched.length) return { reply: t.found, scheme_ids: matched.slice(0, MAX_CARDS) };

  if (/thank|ଧନ୍ୟବାଦ/.test(q)) return { reply: t.thanks, scheme_ids: [] };
  if (/\b(bye|goodbye)\b|ବିଦାୟ/.test(q)) return { reply: t.bye, scheme_ids: [] };
  if (/how are you|kemiti|କେମିତି/.test(q)) return { reply: t.how, scheme_ids: [] };
  if (/who are you|what (do|can) you|what are you|ତୁମେ କିଏ|ଆପଣ କିଏ|କ'ଣ କର/.test(q)) return { reply: t.who, scheme_ids: [] };
  if (/\b(hi+|hello|hey|namaste|namaskar)\b|ନମସ୍କାର|ହାଏ|ହେଲୋ/.test(q)) return { reply: t.greet, scheme_ids: [] };
  if (/scheme|yojana|benefit|eligible|ଯୋଜନା|ସୁବିଧା|ଯୋଗ୍ୟ/.test(q)) return { reply: t.popular, scheme_ids: POPULAR };

  return { reply: t.unknown, scheme_ids: [] };
}

// ---------------------------------------------------------------------------
// Rate limit (protects your Gemini quota): 20 requests / minute / IP
// ---------------------------------------------------------------------------
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

// ---------------------------------------------------------------------------
// Public entry point used by server.js
// ---------------------------------------------------------------------------
export async function handleChat(body, ip = 'local') {
  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE_CHARS) : '';
  const lang = body?.lang === 'en' ? 'en' : 'or'; // default Odia

  if (!message) return { status: 400, data: { error: 'message is required' } };
  if (rateLimited(ip)) {
    return {
      status: 429,
      data: { error: lang === 'en' ? 'Too many messages. Please wait a minute.' : 'ଅନେକ ମେସେଜ୍ ପଠାଯାଇଛି। ଦୟାକରି ଏକ ମିନିଟ୍ ଅପେକ୍ଷା କରନ୍ତୁ।' }
    };
  }

  try {
    const out = await callGemini({ message, history: body.history, lang });
    const ids = [...new Set((Array.isArray(out.scheme_ids) ? out.scheme_ids : []).filter((id) => SCHEME_IDS.includes(id)))].slice(0, MAX_CARDS);
    const reply = typeof out.reply === 'string' && out.reply.trim() ? out.reply.trim() : fallbackReply(message, lang).reply;
    return { status: 200, data: { reply, scheme_ids: ids, schemes: schemesById(ids), source: 'gemini' } };
  } catch (err) {
    if (err.message !== 'NO_API_KEY') console.error('[chat] Gemini error, using fallback:', err.message);
    else console.warn('[chat] GEMINI_API_KEY not set - using offline keyword fallback.');
    const fb = fallbackReply(message, lang);
    // `reason` is shown in the chat footer / console so you can see WHY Gemini failed (never includes the key).
    const reason = err.message === 'NO_API_KEY' ? 'GEMINI_API_KEY not set (restart server after editing .env)' : String(err.message).slice(0, 450);
    return { status: 200, data: { ...fb, schemes: schemesById(fb.scheme_ids), source: 'fallback', reason } };
  }
}

// Full scheme objects for the ids, so plain-HTML clients (chat-widget.js) can draw cards
// without bundling mockSchemes.js. The React ChatBot ignores this and uses scheme_ids.
function schemesById(ids) {
  return ids.map((id) => MOCK_SCHEMES.find((s) => s.id === id)).filter(Boolean);
}

export default handleChat;
