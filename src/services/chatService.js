/**
 * chatService.js - Frontend client for the Krushak Sahayak chatbot.
 * Talks to POST /api/chat (server.js -> chatHandler.js -> Gemini).
 * The Gemini API key lives on the server only; nothing secret is used here.
 */

const MAX_HISTORY = 10;

/**
 * @param {{ message: string, history?: Array<{role:'user'|'bot', text:string}>, lang?: 'or'|'en' }} args
 * @returns {Promise<{ reply: string, scheme_ids: string[], source: 'gemini'|'fallback' }>}
 */
export async function sendChatMessage({ message, history = [], lang = 'or' }) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      lang,
      history: history.slice(-MAX_HISTORY).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text
      }))
    })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Chat request failed (${res.status})`);
  return data;
}

export default sendChatMessage;
