/**
 * check-gemini.js - run with:  node check-gemini.js
 * Reads GEMINI_API_KEY / GEMINI_MODEL from .env, lists the models your key can use,
 * then sends one test message to your chosen model and prints the exact result.
 */
import fs from 'fs';

try {
  for (const line of fs.readFileSync(new URL('./.env', import.meta.url), 'utf-8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith('#')) process.env[m[1]] ??= m[2].replace(/^['"]|['"]$/g, '');
  }
} catch { console.log('No .env file found next to this script.'); }

const key = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
if (!key) { console.log('GEMINI_API_KEY is empty. Check .env'); process.exit(1); }

const headers = { 'x-goog-api-key': key, 'Content-Type': 'application/json' };

console.log('1) Models your key can use for chat:\n');
const r1 = await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200', { headers });
if (!r1.ok) {
  console.log(`   FAILED ${r1.status}: ${(await r1.text()).slice(0, 300)}\n   -> The API key itself is wrong, restricted, or the Gemini API is not enabled for it.`);
  process.exit(1);
}
const list = (await r1.json()).models || [];
list
  .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent') && /flash/i.test(m.name))
  .forEach((m) => console.log('   ' + m.name.replace('models/', '')));

console.log(`\n2) Testing GEMINI_MODEL="${model}" ...`);
const r2 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
  method: 'POST',
  headers,
  body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Say hello in Odia in one short line.' }] }] })
});
const body = await r2.text();
if (r2.ok) {
  console.log('   OK ->', JSON.parse(body).candidates?.[0]?.content?.parts?.[0]?.text?.trim());
} else {
  console.log(`   FAILED ${r2.status}: ${body.slice(0, 400)}`);
  console.log('   -> Copy one model name from the list above into GEMINI_MODEL in .env, then restart.');
}
