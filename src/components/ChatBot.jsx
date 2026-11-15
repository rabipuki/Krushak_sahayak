import React, { useState, useRef, useEffect } from 'react';
import { MOCK_SCHEMES } from '../data/mockSchemes.js';
import { sendChatMessage } from '../services/chatService.js';

/**
 * ChatBot - mini ChatGPT-style assistant for Odisha government schemes.
 *  - Casual chat + scheme questions, in Odia (default) or English
 *  - Replies can include scheme cards (rendered from MOCK_SCHEMES by id)
 *
 * Props:
 *   lang         'or' | 'en'  (controlled by App so the whole app shares one language)
 *   onLangChange (lang) => void
 */

const UI = {
  or: {
    title: 'କୃଷକ ସହାୟକ AI',
    subtitle: 'ସରକାରୀ ଯୋଜନା ବିଷୟରେ ପଚାରନ୍ତୁ',
    placeholder: 'ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ...',
    send: 'ପଠାନ୍ତୁ',
    newChat: 'ନୂଆ ଚାଟ୍',
    greeting:
      'ନମସ୍କାର! 🙏 ମୁଁ କୃଷକ ସହାୟକ। ଓଡ଼ିଶାର ସରକାରୀ ଯୋଜନା ବିଷୟରେ ଆପଣ ମୋତେ ପଚାରିପାରିବେ। ଆପଣଙ୍କ ପାଇଁ କେଉଁ ଯୋଜନା ଉପଯୁକ୍ତ, ମୁଁ ଜାଣିବାରେ ସାହାଯ୍ୟ କରିବି।',
    suggestions: ['ନମସ୍କାର', 'କାଳିଆ ଯୋଜନା କ’ଣ?', 'ମହିଳାଙ୍କ ପାଇଁ କେଉଁ ଯୋଜନା ଅଛି?', 'ମୁଁ ୫୫ ବର୍ଷର ଚାଷୀ, ମୋ ପାଇଁ କେଉଁ ଯୋଜନା?', 'ପେନସନ ଯୋଜନା'],
    error: 'କ୍ଷମା କରନ୍ତୁ, ଏବେ ଉତ୍ତର ଦେଇପାରିଲି ନାହିଁ। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।',
    offline: 'ଅଫଲାଇନ୍ ମୋଡ୍ (AI ସଂଯୋଗ ନାହିଁ)',
    benefits: 'ମୁଖ୍ୟ ଲାଭ',
    documents: 'କାଗଜପତ୍ର',
    helpline: 'ହେଲ୍ପଲାଇନ୍',
    apply: 'ଅଧିକ ଜାଣନ୍ତୁ ଓ ଆବେଦନ',
    listen: 'ଶୁଣନ୍ତୁ',
    stop: 'ବନ୍ଦ'
  },
  en: {
    title: 'Krushak Sahayak AI',
    subtitle: 'Ask about government schemes',
    placeholder: 'Type your question...',
    send: 'Send',
    newChat: 'New chat',
    greeting:
      "Namaskar! 🙏 I'm Krushak Sahayak. Ask me about Odisha government schemes, and I'll help you find the ones that suit you.",
    suggestions: ['Hello', 'What is KALIA scheme?', 'Schemes for women?', "I'm a 55 year old farmer, which schemes fit me?", 'Pension scheme'],
    error: "Sorry, I couldn't answer right now. Please try again.",
    offline: 'Offline mode (AI not connected)',
    benefits: 'Key benefits',
    documents: 'Documents',
    helpline: 'Helpline',
    apply: 'Learn more & apply',
    listen: 'Listen',
    stop: 'Stop'
  }
};

/* ---------- Compact scheme card shown inside a bot message ---------- */
function ChatSchemeCard({ scheme, lang }) {
  const t = UI[lang];
  const [speaking, setSpeaking] = useState(false);

  const name = lang === 'or' ? scheme.name_or : scheme.name_en;
  const sub = lang === 'or' ? scheme.name_en : scheme.fullName_en;
  const desc = lang === 'or' ? scheme.description_or : scheme.description_en;
  const benefits = (lang === 'or' ? scheme.benefits_or : scheme.benefits_en) || [];
  const docs = (lang === 'or' ? scheme.documents_or : scheme.documents_en) || [];

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const toggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const text = (lang === 'or' ? scheme.audioText_or : scheme.audioText_en) || `${name}. ${desc}`;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const voice =
      lang === 'or'
        ? voices.find((v) => /^or|ori/i.test(v.lang)) || voices.find((v) => /hi-IN|en-IN/i.test(v.lang))
        : voices.find((v) => /en-IN|en-GB|en-US/i.test(v.lang));
    if (voice) u.voice = voice;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  return (
    <article className="relative overflow-hidden bg-white rounded-2xl border-2 border-green-800/15 shadow-sm p-4 text-left">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-700 via-amber-500 to-green-800" />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 mt-1">
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${scheme.badgeColor || 'bg-green-100 text-green-900 border-green-300'}`}>
          {scheme.badge}
        </span>
        <button
          type="button"
          onClick={toggleSpeak}
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition ${
            speaking ? 'bg-red-600 text-white border-red-700 animate-pulse' : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
          }`}
        >
          <span>{speaking ? '⏹️' : '🔊'}</span>
          <span>{speaking ? t.stop : t.listen}</span>
        </button>
      </div>

      <h4 className="text-base font-black text-green-950 leading-snug">{name}</h4>
      <p className="text-[11px] text-stone-500 mb-2">{sub}</p>

      <p className="text-xs text-stone-700 bg-orange-50/70 border border-orange-100 rounded-xl p-2.5 mb-2.5 leading-relaxed">{desc}</p>

      <p className="text-[11px] font-bold text-green-950 mb-1">✓ {t.benefits}</p>
      <ul className="space-y-1 mb-2.5">
        {benefits.slice(0, 3).map((b, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-stone-800">
            <span className="mt-0.5 w-3.5 h-3.5 shrink-0 rounded-full bg-green-100 text-green-800 text-[9px] font-bold flex items-center justify-center">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {docs.length > 0 && (
        <div className="mb-2.5">
          <p className="text-[11px] font-bold text-stone-600 mb-1">📄 {t.documents}</p>
          <div className="flex flex-wrap gap-1">
            {docs.map((d, i) => (
              <span key={i} className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200">
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
        <span className="text-[11px] font-semibold text-stone-600">
          {t.helpline}: {scheme.helpline}
        </span>
        <a
          href={scheme.official_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-800 hover:bg-green-900 text-white border border-green-950 active:scale-95 transition"
        >
          {t.apply} ↗
        </a>
      </div>
    </article>
  );
}

/* ---------- Main chat component ---------- */
export function ChatBot({ lang = 'or', onLangChange }) {
  const t = UI[lang] || UI.or;
  // 'greeting' is rendered from the current language, so toggling language updates it.
  const [messages, setMessages] = useState([{ id: 'greeting', role: 'bot', kind: 'greeting' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const idRef = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  const nextId = () => `m${++idRef.current}`;

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || loading) return;

    const userMsg = { id: nextId(), role: 'user', text: message };
    // history = real conversation so far (skip the greeting and error bubbles)
    const history = messages.filter((m) => m.kind !== 'greeting' && !m.isError && m.text).map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await sendChatMessage({ message, history, lang });
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'bot', text: data.reply, schemeIds: data.scheme_ids || [], source: data.source }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [...prev, { id: nextId(), role: 'bot', text: err.message && !/^Chat request failed|Failed to fetch/.test(err.message) ? err.message : t.error, isError: true }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const reset = () => {
    window.speechSynthesis?.cancel();
    setMessages([{ id: 'greeting', role: 'bot', kind: 'greeting' }]);
  };

  const onlyGreeting = messages.length === 1;

  return (
    <section className="bg-white rounded-3xl shadow-md border-2 border-green-800/20 overflow-hidden flex flex-col h-[75vh] min-h-[480px]" aria-label="AI chatbot">
      {/* Header */}
      <div className="bg-green-900 text-white px-4 py-3 flex items-center justify-between gap-3 border-b-4 border-amber-500">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-amber-400 text-green-950 flex items-center justify-center text-xl shrink-0">🌾</div>
          <div className="min-w-0">
            <h2 className="text-base font-black leading-tight truncate">{t.title}</h2>
            <p className="text-[11px] text-amber-300 truncate">{t.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-green-950 rounded-lg p-1 text-xs font-bold">
            <button onClick={() => onLangChange?.('or')} className={`px-2 py-0.5 rounded ${lang === 'or' ? 'bg-amber-500 text-green-950' : 'text-stone-300'}`}>ଓଡ଼ିଆ</button>
            <button onClick={() => onLangChange?.('en')} className={`px-2 py-0.5 rounded ${lang === 'en' ? 'bg-amber-500 text-green-950' : 'text-stone-300'}`}>English</button>
          </div>
          <button onClick={reset} className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-green-800 hover:bg-green-700 text-amber-200" title={t.newChat}>
            ↺ <span className="hidden sm:inline">{t.newChat}</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-4 bg-orange-50/50">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          const text = m.kind === 'greeting' ? t.greeting : m.text;
          const cards = (m.schemeIds || []).map((id) => MOCK_SCHEMES.find((s) => s.id === id)).filter(Boolean);

          return (
            <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[92%] sm:max-w-[80%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words shadow-sm ${
                    isUser
                      ? 'bg-green-800 text-white rounded-br-md'
                      : m.isError
                      ? 'bg-red-50 text-red-900 border border-red-200 rounded-bl-md'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-bl-md'
                  }`}
                >
                  {text}
                </div>
                {m.source === 'fallback' && <p className="text-[10px] text-stone-400 px-1">⚠ {t.offline}</p>}
                {cards.length > 0 && (
                  <div className="space-y-3">
                    {cards.map((s) => (
                      <ChatSchemeCard key={s.id} scheme={s} lang={lang} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex gap-1.5" aria-label="typing">
              <span className="w-2 h-2 rounded-full bg-green-700 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-green-700 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-green-700 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {onlyGreeting && !loading && (
          <div className="flex flex-wrap gap-2 pt-1">
            {t.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-amber-400 text-green-950 hover:bg-amber-100 active:scale-95 transition"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="p-3 border-t border-stone-200 bg-white flex items-end gap-2"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          maxLength={1000}
          placeholder={t.placeholder}
          className="flex-1 resize-none rounded-2xl border-2 border-stone-300 focus:border-green-700 focus:outline-none px-4 py-2.5 text-sm max-h-32"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-green-950 font-black text-sm active:scale-95 transition"
        >
          {t.send}
        </button>
      </form>
    </section>
  );
}

export default ChatBot;
