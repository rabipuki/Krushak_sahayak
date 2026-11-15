/**
 * chat-widget.js - Floating Krushak Sahayak chatbot for ANY page (no React needed).
 *
 * Add ONE line before </body> in index.html:
 *     <script src="/chat-widget.js"></script>
 *
 * Talks to POST /api/chat (server.js -> chatHandler.js -> Gemini).
 * Odia by default, English toggle, scheme cards inside replies.
 */
(function () {
  if (window.__ksChatLoaded) return;
  window.__ksChatLoaded = true;

  var UI = {
    or: {
      fab: 'AI ସହାୟକ',
      title: 'କୃଷକ ସହାୟକ AI',
      subtitle: 'ସରକାରୀ ଯୋଜନା ବିଷୟରେ ପଚାରନ୍ତୁ',
      placeholder: 'ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ...',
      send: 'ପଠାନ୍ତୁ',
      newChat: 'ନୂଆ ଚାଟ୍',
      greeting: 'ନମସ୍କାର! 🙏 ମୁଁ କୃଷକ ସହାୟକ। ଓଡ଼ିଶାର ସରକାରୀ ଯୋଜନା ବିଷୟରେ ଆପଣ ମୋତେ ପଚାରିପାରିବେ। ଆପଣଙ୍କ ପାଇଁ କେଉଁ ଯୋଜନା ଉପଯୁକ୍ତ, ମୁଁ ଜାଣିବାରେ ସାହାଯ୍ୟ କରିବି।',
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
      fab: 'AI Assistant',
      title: 'Krushak Sahayak AI',
      subtitle: 'Ask about government schemes',
      placeholder: 'Type your question...',
      send: 'Send',
      newChat: 'New chat',
      greeting: "Namaskar! 🙏 I'm Krushak Sahayak. Ask me about Odisha government schemes, and I'll help you find the ones that suit you.",
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

  var lang = 'or';
  try {
    var saved = localStorage.getItem('ks_chat_lang');
    if (saved === 'en' || saved === 'or') lang = saved;
  } catch (e) {}

  var isOpen = false;
  var loading = false;
  var msgs = [{ kind: 'greeting', role: 'bot' }];

  function t() { return UI[lang]; }

  // ---------- tiny DOM helper (uses textContent, so nothing is injected as HTML) ----------
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  // ---------- styles ----------
  var css = '\n' +
    '.ks-fab{position:fixed;right:20px;bottom:20px;z-index:2147483000;display:flex;align-items:center;gap:8px;padding:14px 20px;border:0;border-radius:999px;background:#f59e0b;color:#14341f;font:800 15px/1 inherit;font-family:inherit;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.35);transition:transform .15s}\n' +
    '.ks-fab:hover{transform:scale(1.05)}\n' +
    '.ks-fab .ks-fab-ic{font-size:22px}\n' +
    '.ks-panel{position:fixed;right:20px;bottom:90px;z-index:2147483000;width:420px;max-width:calc(100vw - 24px);height:680px;max-height:calc(100vh - 110px);display:none;flex-direction:column;background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.45);border:2px solid rgba(22,101,52,.25);font-family:inherit;color:#292524}\n' +
    '.ks-panel.ks-open{display:flex}\n' +
    '.ks-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 14px;background:#14532d;color:#fff;border-bottom:4px solid #f59e0b}\n' +
    '.ks-head-l{display:flex;align-items:center;gap:10px;min-width:0}\n' +
    '.ks-logo{width:38px;height:38px;border-radius:50%;background:#fbbf24;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}\n' +
    '.ks-title{font-weight:800;font-size:15px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n' +
    '.ks-sub{font-size:11px;color:#fcd34d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n' +
    '.ks-head-r{display:flex;align-items:center;gap:6px;flex-shrink:0}\n' +
    '.ks-lang{display:flex;background:#052e16;border-radius:8px;padding:3px}\n' +
    '.ks-lang button{border:0;background:transparent;color:#d6d3d1;font:700 12px/1 inherit;font-family:inherit;padding:5px 8px;border-radius:6px;cursor:pointer}\n' +
    '.ks-lang button.ks-on{background:#f59e0b;color:#052e16}\n' +
    '.ks-ibtn{border:0;background:#166534;color:#fde68a;font:700 13px/1 inherit;font-family:inherit;padding:7px 9px;border-radius:8px;cursor:pointer}\n' +
    '.ks-ibtn:hover{background:#15803d}\n' +
    '.ks-list{flex:1;overflow-y:auto;padding:14px;background:#fff7ed;display:flex;flex-direction:column;gap:14px}\n' +
    '.ks-row{display:flex}\n' +
    '.ks-row.ks-user{justify-content:flex-end}\n' +
    '.ks-col{max-width:92%;display:flex;flex-direction:column;gap:8px}\n' +
    '.ks-bubble{padding:10px 14px;border-radius:18px;font-size:14px;line-height:1.55;white-space:pre-wrap;word-break:break-word;box-shadow:0 1px 2px rgba(0,0,0,.08)}\n' +
    '.ks-b-bot{background:#fff;border:1px solid #e7e5e4;border-bottom-left-radius:5px}\n' +
    '.ks-b-user{background:#166534;color:#fff;border-bottom-right-radius:5px}\n' +
    '.ks-b-err{background:#fef2f2;color:#7f1d1d;border:1px solid #fecaca;border-bottom-left-radius:5px}\n' +
    '.ks-note{font-size:10px;color:#a8a29e;padding:0 4px}\n' +
    '.ks-typing{display:flex;gap:6px;background:#fff;border:1px solid #e7e5e4;border-radius:18px;border-bottom-left-radius:5px;padding:12px 16px;width:fit-content}\n' +
    '.ks-typing i{width:8px;height:8px;border-radius:50%;background:#15803d;animation:ksb 1s infinite ease-in-out}\n' +
    '.ks-typing i:nth-child(2){animation-delay:.15s}.ks-typing i:nth-child(3){animation-delay:.3s}\n' +
    '@keyframes ksb{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}\n' +
    '.ks-chips{display:flex;flex-wrap:wrap;gap:8px}\n' +
    '.ks-chip{border:1px solid #fbbf24;background:#fff;color:#14341f;font:600 12px/1.2 inherit;font-family:inherit;padding:7px 12px;border-radius:999px;cursor:pointer}\n' +
    '.ks-chip:hover{background:#fef3c7}\n' +
    '.ks-card{position:relative;background:#fff;border:2px solid rgba(22,101,52,.18);border-radius:16px;padding:14px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08)}\n' +
    '.ks-card:before{content:"";position:absolute;left:0;right:0;top:0;height:6px;background:linear-gradient(90deg,#15803d,#f59e0b,#166534)}\n' +
    '.ks-card-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:6px 0 8px;flex-wrap:wrap}\n' +
    '.ks-badge{font-size:11px;font-weight:700;padding:2px 10px;border-radius:999px;background:#dcfce7;color:#14532d;border:1px solid #86efac}\n' +
    '.ks-listen{border:1px solid #fcd34d;background:#fef3c7;color:#78350f;font:700 11px/1 inherit;font-family:inherit;padding:4px 10px;border-radius:999px;cursor:pointer}\n' +
    '.ks-listen.ks-on{background:#dc2626;color:#fff;border-color:#b91c1c}\n' +
    '.ks-card h4{margin:0;font-size:15px;font-weight:800;color:#052e16;line-height:1.35}\n' +
    '.ks-card .ks-en{font-size:11px;color:#78716c;margin:2px 0 8px}\n' +
    '.ks-desc{font-size:12px;line-height:1.55;background:#fff7ed;border:1px solid #ffedd5;border-radius:10px;padding:8px 10px;margin-bottom:10px}\n' +
    '.ks-h{font-size:11px;font-weight:800;color:#052e16;margin:0 0 4px}\n' +
    '.ks-card ul{list-style:none;margin:0 0 10px;padding:0;display:flex;flex-direction:column;gap:5px}\n' +
    '.ks-card li{display:flex;gap:6px;font-size:12px;line-height:1.45}\n' +
    '.ks-card li:before{content:"✓";flex-shrink:0;width:15px;height:15px;border-radius:50%;background:#dcfce7;color:#166534;font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-top:1px}\n' +
    '.ks-docs{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px}\n' +
    '.ks-docs span{font-size:10px;background:#f5f5f4;border:1px solid #e7e5e4;border-radius:5px;padding:2px 6px}\n' +
    '.ks-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;border-top:1px solid #f5f5f4;padding-top:8px}\n' +
    '.ks-foot span{font-size:11px;font-weight:600;color:#57534e}\n' +
    '.ks-foot a{background:#166534;color:#fff;text-decoration:none;font-size:12px;font-weight:700;padding:7px 12px;border-radius:9px;border:1px solid #052e16}\n' +
    '.ks-foot a:hover{background:#14532d}\n' +
    '.ks-form{display:flex;align-items:flex-end;gap:8px;padding:10px;border-top:1px solid #e7e5e4;background:#fff}\n' +
    '.ks-form textarea{flex:1;resize:none;border:2px solid #d6d3d1;border-radius:16px;padding:9px 14px;font:14px/1.4 inherit;font-family:inherit;max-height:110px;outline:none;color:#292524;background:#fff}\n' +
    '.ks-form textarea:focus{border-color:#15803d}\n' +
    '.ks-form button{border:0;background:#f59e0b;color:#14341f;font:800 14px/1 inherit;font-family:inherit;padding:11px 18px;border-radius:16px;cursor:pointer}\n' +
    '.ks-form button:disabled{opacity:.4;cursor:not-allowed}\n' +
    '@media (max-width:520px){.ks-panel{right:8px;left:8px;bottom:80px;width:auto;max-width:none;height:calc(100vh - 100px)}.ks-fab{right:12px;bottom:12px}}\n';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- build static UI ----------
  var fab = el('button', 'ks-fab');
  fab.type = 'button';
  var fabIc = el('span', 'ks-fab-ic', '💬');
  var fabTx = el('span', '', '');
  fab.append(fabIc, fabTx);

  var panel = el('div', 'ks-panel');
  var head = el('div', 'ks-head');
  var headL = el('div', 'ks-head-l');
  var logo = el('div', 'ks-logo', '🌾');
  var titles = el('div', '');
  var title = el('div', 'ks-title');
  var sub = el('div', 'ks-sub');
  titles.append(title, sub);
  headL.append(logo, titles);

  var headR = el('div', 'ks-head-r');
  var langBox = el('div', 'ks-lang');
  var btnOr = el('button', '', 'ଓଡ଼ିଆ'); btnOr.type = 'button';
  var btnEn = el('button', '', 'English'); btnEn.type = 'button';
  langBox.append(btnOr, btnEn);
  var btnNew = el('button', 'ks-ibtn', '↺'); btnNew.type = 'button';
  var btnClose = el('button', 'ks-ibtn', '✕'); btnClose.type = 'button';
  headR.append(langBox, btnNew, btnClose);
  head.append(headL, headR);

  var list = el('div', 'ks-list');
  var form = el('form', 'ks-form');
  var input = el('textarea', '');
  input.rows = 1;
  input.maxLength = 1000;
  var sendBtn = el('button', '', '');
  sendBtn.type = 'submit';
  form.append(input, sendBtn);

  panel.append(head, list, form);
  document.body.append(panel, fab);

  // ---------- speech ----------
  var activeSpeakBtn = null;
  function stopSpeech() {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    if (activeSpeakBtn) { activeSpeakBtn.classList.remove('ks-on'); activeSpeakBtn.textContent = '🔊 ' + t().listen; activeSpeakBtn = null; }
  }
  function speak(btn, text) {
    if (!('speechSynthesis' in window)) return;
    if (activeSpeakBtn === btn) { stopSpeech(); return; }
    stopSpeech();
    var u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    var voices = window.speechSynthesis.getVoices();
    var v = lang === 'or'
      ? (voices.find(function (x) { return /^or|ori/i.test(x.lang); }) || voices.find(function (x) { return /hi-IN|en-IN/i.test(x.lang); }))
      : voices.find(function (x) { return /en-IN|en-GB|en-US/i.test(x.lang); });
    if (v) u.voice = v;
    u.onend = u.onerror = function () { if (activeSpeakBtn === btn) stopSpeech(); };
    activeSpeakBtn = btn;
    btn.classList.add('ks-on');
    btn.textContent = '⏹ ' + t().stop;
    window.speechSynthesis.speak(u);
  }

  // ---------- scheme card ----------
  function card(s) {
    var L = lang === 'or' ? 'or' : 'en';
    var name = lang === 'or' ? s.name_or : s.name_en;
    var subText = lang === 'or' ? s.name_en : s.fullName_en;
    var desc = lang === 'or' ? s.description_or : s.description_en;
    var benefits = (lang === 'or' ? s.benefits_or : s.benefits_en) || [];
    var docs = (lang === 'or' ? s.documents_or : s.documents_en) || [];

    var c = el('article', 'ks-card');
    var top = el('div', 'ks-card-top');
    top.append(el('span', 'ks-badge', s.badge || 'Govt. of Odisha'));
    var lb = el('button', 'ks-listen', '🔊 ' + t().listen);
    lb.type = 'button';
    lb.onclick = function () { speak(lb, (L === 'or' ? s.audioText_or : s.audioText_en) || (name + '. ' + desc)); };
    top.append(lb);
    c.append(top, el('h4', '', name), el('div', 'ks-en', subText || ''), el('div', 'ks-desc', desc || ''));

    c.append(el('div', 'ks-h', '✓ ' + t().benefits));
    var ul = el('ul', '');
    benefits.slice(0, 3).forEach(function (b) { ul.append(el('li', '', b)); });
    c.append(ul);

    if (docs.length) {
      c.append(el('div', 'ks-h', '📄 ' + t().documents));
      var dd = el('div', 'ks-docs');
      docs.forEach(function (d) { dd.append(el('span', '', d)); });
      c.append(dd);
    }

    var foot = el('div', 'ks-foot');
    foot.append(el('span', '', t().helpline + ': ' + (s.helpline || '1551')));
    var a = el('a', '', t().apply + ' ↗');
    a.href = s.official_link || 'https://odisha.gov.in';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    foot.append(a);
    c.append(foot);
    return c;
  }

  // ---------- render ----------
  function applyStaticText() {
    var x = t();
    fabTx.textContent = x.fab;
    title.textContent = x.title;
    sub.textContent = x.subtitle;
    input.placeholder = x.placeholder;
    sendBtn.textContent = x.send;
    btnNew.title = x.newChat;
    btnOr.className = lang === 'or' ? 'ks-on' : '';
    btnEn.className = lang === 'en' ? 'ks-on' : '';
    updateSend();
  }

  function render() {
    stopSpeech();
    list.textContent = '';
    msgs.forEach(function (m) {
      var row = el('div', 'ks-row ks-' + (m.role === 'user' ? 'user' : 'bot'));
      var col = el('div', 'ks-col');
      var cls = m.isError ? 'ks-b-err' : (m.role === 'user' ? 'ks-b-user' : 'ks-b-bot');
      col.append(el('div', 'ks-bubble ' + cls, m.kind === 'greeting' ? t().greeting : m.text));
      if (m.source === 'fallback') col.append(el('div', 'ks-note', '⚠ ' + t().offline + (m.reason ? ' — ' + m.reason : '')));
      (m.schemes || []).forEach(function (s) { col.append(card(s)); });
      row.append(col);
      list.append(row);
    });
    if (loading) {
      var ty = el('div', 'ks-typing');
      ty.append(el('i'), el('i'), el('i'));
      list.append(ty);
    }
    if (msgs.length === 1 && !loading) {
      var chips = el('div', 'ks-chips');
      t().suggestions.forEach(function (s) {
        var b = el('button', 'ks-chip', s);
        b.type = 'button';
        b.onclick = function () { send(s); };
        chips.append(b);
      });
      list.append(chips);
    }
    list.scrollTop = list.scrollHeight;
  }

  function updateSend() { sendBtn.disabled = loading || !input.value.trim(); }

  // ---------- send ----------
  async function send(text) {
    var message = (text !== undefined ? text : input.value).trim();
    if (!message || loading) return;

    var history = msgs
      .filter(function (m) { return m.kind !== 'greeting' && !m.isError && m.text; })
      .map(function (m) { return { role: m.role === 'user' ? 'user' : 'model', text: m.text }; })
      .slice(-10);

    msgs.push({ role: 'user', text: message });
    input.value = '';
    input.style.height = 'auto';
    loading = true;
    updateSend();
    render();

    try {
      var res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message, history: history, lang: lang })
      });
      var data = await res.json().catch(function () { return {}; });
      if (!res.ok || !data.reply) throw new Error(data.error || 'HTTP ' + res.status + ' (is server.js updated with the /api/chat route?)');
      if (data.reason) console.warn('[chat-widget] Gemini failed:', data.reason);
      msgs.push({ role: 'bot', text: data.reply, schemes: data.schemes || [], source: data.source, reason: data.reason });
    } catch (err) {
      console.error('[chat-widget]', err);
      msgs.push({ role: 'bot', text: t().error, isError: true });
    }
    loading = false;
    updateSend();
    render();
    input.focus();
  }

  // ---------- events ----------
  function setOpen(v) {
    isOpen = v;
    panel.classList.toggle('ks-open', v);
    fab.style.display = v && window.innerWidth <= 520 ? 'none' : 'flex';
    if (v) { render(); setTimeout(function () { input.focus(); }, 50); } else { stopSpeech(); }
  }
  function setLang(l) {
    lang = l;
    try { localStorage.setItem('ks_chat_lang', l); } catch (e) {}
    applyStaticText();
    render();
  }

  fab.onclick = function () { setOpen(!isOpen); };
  btnClose.onclick = function () { setOpen(false); };
  btnOr.onclick = function () { setLang('or'); };
  btnEn.onclick = function () { setLang('en'); };
  btnNew.onclick = function () { msgs = [{ kind: 'greeting', role: 'bot' }]; loading = false; updateSend(); render(); };
  form.onsubmit = function (e) { e.preventDefault(); send(); };
  input.addEventListener('input', function () {
    updateSend();
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 110) + 'px';
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });

  applyStaticText();
  render();
})();
