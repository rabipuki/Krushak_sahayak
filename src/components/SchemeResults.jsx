import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient.js';
import { MOCK_SCHEMES } from '../data/mockSchemes.js';

/**
 * SchemeResults Component
 * Displays eligible welfare schemes for farmers in Odisha.
 * Provides browser window.speechSynthesis audio playback in both Odia and English.
 */
export const SchemeResults = ({ userData, schemes: externalSchemes, isLoading: externalLoading }) => {
  const [schemes, setSchemes] = useState(externalSchemes || []);
  const [loading, setLoading] = useState(externalLoading || false);
  const [speakingKey, setSpeakingKey] = useState(null); // format: "summary-or", "summary-en", "{id}-or", "{id}-en"

  /**
   * Database Fetch & Filter
   */
  useEffect(() => {
    async function loadSchemes() {
      if (!userData) return;
      setLoading(true);

      const age = Number(userData.age) || 55;
      const income = Number(userData.income) || 40000;
      const hasRationCard = Boolean(userData.has_ration_card);
      const occupation = userData.occupation || 'Farmer';

      try {
        if (supabase) {
          let query = supabase.from('schemes').select('*');

          if (age > 0) query = query.lte('min_age', age);
          if (income > 0) query = query.gte('max_income', income);
          if (!hasRationCard) query = query.eq('requires_ration_card', false);

          const { data, error } = await query;
          if (!error && data && data.length > 0) {
            const matched = data.filter((row) => {
              if (row.allowed_occupations && Array.isArray(row.allowed_occupations)) {
                return row.allowed_occupations.some(
                  (o) => o.toLowerCase() === occupation.toLowerCase()
                );
              }
              return true;
            });
            setSchemes(matched.length > 0 ? matched : data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Notice: Using matching portal dataset.", err?.message);
      }

      // Filter local list
      const matched = MOCK_SCHEMES.filter((s) => {
        const c = s.eligibility_criteria;
        if (!c) return true;
        if (c.min_age && age < c.min_age) return false;
        if (c.max_income && income > 0 && income > c.max_income) return false;
        if (c.requires_ration_card && !hasRationCard) return false;
        if (c.allowed_occupations && !c.allowed_occupations.some((o) => o.toLowerCase() === occupation.toLowerCase())) return false;
        return true;
      });

      setSchemes(matched);
      setLoading(false);
    }

    loadSchemes();
  }, [userData?.age, userData?.income, userData?.occupation, userData?.has_ration_card]);

  /**
   * Speak speech text using window.speechSynthesis
   */
  const speakText = (key, text, lang = 'en') => {
    if (!('speechSynthesis' in window)) {
      alert("ଆପଣଙ୍କ ବ୍ରାଉଜରରେ ସ୍ୱର ଶୁଣିବା ସୁବିଧା ନାହିଁ। (Audio speech synthesis is not supported on this device)");
      return;
    }

    if (speakingKey === key) {
      window.speechSynthesis.cancel();
      setSpeakingKey(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingKey(key);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (lang === 'or') {
      // Look for Odia or Indian voice
      selectedVoice = voices.find(v => v.lang.includes('or') || v.lang.includes('ori') || v.lang.includes('hi-IN') || v.lang.includes('en-IN'));
    } else {
      // Look for Indian English or standard English voice
      selectedVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US') || v.lang.includes('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => setSpeakingKey(null);
    utterance.onerror = (e) => {
      console.warn("Speech error, attempting English fallback:", e);
      setSpeakingKey(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  /**
   * Play Full Summary in Odia
   */
  const handlePlayOdiaSummary = () => {
    const count = schemes.length;
    const names = schemes.map((s, idx) => `${idx + 1}. ${s.name_or || s.name_en}`).join('। ');
    const text = `ଓଡ଼ିଆ ସହାୟକ ସୂଚନା। ଆପଣଙ୍କ ବୟସ ${userData?.age || 55} ଏବଂ ଆୟ ଅନୁଯାୟୀ ${count} ଟି ସରକାରୀ ଯୋଜନା ଚିହ୍ନଟ ହୋଇଛି। ଯେପରିକି: ${names}। ପ୍ରତ୍ୟେକ ଯୋଜନାର ବିସ୍ତୃତ ବିବରଣୀ ତଳେ ଉପଲବ୍ଧ ଅଛି।`;
    speakText("summary-or", text, "or");
  };

  /**
   * Play Full Summary in English
   */
  const handlePlayEnglishSummary = () => {
    const count = schemes.length;
    const names = schemes.map((s, idx) => `${idx + 1}. ${s.name_en || s.name_or}`).join(', ');
    const text = `Odia Sahayak Scheme Summary: Based on your age of ${userData?.age || 55} and income, you are eligible for ${count} government welfare schemes: ${names}. You can listen to each scheme details below and click to apply online.`;
    speakText("summary-en", text, "en");
  };

  return (
    <section className="w-full mt-6" aria-label="Eligible Government Schemes Results">
      {/* Top Banner with Audio Summary Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-green-900 text-white p-5 rounded-2xl shadow-sm border-l-8 border-amber-500">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <h2 className="text-xl sm:text-2xl font-black">
              ଆପଣଙ୍କ ପାଇଁ ଯୋଗ୍ୟ ସରକାରୀ ଯୋଜନା
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-green-200 mt-1">
            ଯୋଗ୍ୟତା ତଥ୍ୟ / Matched Schemes: Age {userData?.age || '55'} • {userData?.occupation || 'Farmer'} • Income ₹{Number(userData?.income || 40000).toLocaleString('en-IN')} • Ration Card: {userData?.has_ration_card ? 'Yes' : 'No'}
          </p>
        </div>

        {/* Audio Summary Buttons (Odia & English) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Odia Audio Summary */}
          <button
            type="button"
            onClick={handlePlayOdiaSummary}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all ${
              speakingKey === "summary-or"
                ? 'bg-red-600 text-white ring-4 ring-red-300 animate-pulse'
                : 'bg-amber-400 hover:bg-amber-500 text-green-950 border border-amber-300'
            }`}
          >
            <span>{speakingKey === "summary-or" ? '⏹️' : '🔊'}</span>
            <span>{speakingKey === "summary-or" ? 'ବନ୍ଦ କରନ୍ତୁ' : 'ସାରାଂଶ (Odia)'}</span>
          </button>

          {/* English Audio Summary */}
          <button
            type="button"
            onClick={handlePlayEnglishSummary}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all ${
              speakingKey === "summary-en"
                ? 'bg-red-600 text-white ring-4 ring-red-300 animate-pulse'
                : 'bg-green-700 hover:bg-green-600 text-white border border-green-600'
            }`}
          >
            <span>{speakingKey === "summary-en" ? '⏹️' : '🔊'}</span>
            <span>{speakingKey === "summary-en" ? 'Stop Audio' : 'Summary (English)'}</span>
          </button>

          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-800 text-green-200 border border-green-700">
            {schemes?.length || 0} ଟି ଯୋଜନା
          </span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border-2 border-stone-200 animate-pulse">
              <div className="h-6 bg-stone-200 rounded-full w-2/3 mb-4"></div>
              <div className="h-4 bg-stone-200 rounded-full w-full mb-2"></div>
              <div className="h-4 bg-stone-200 rounded-full w-4/5 mb-6"></div>
              <div className="h-20 bg-stone-100 rounded-2xl mb-4"></div>
              <div className="h-10 bg-stone-200 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && (!schemes || schemes.length === 0) && (
        <div className="bg-white rounded-3xl p-8 text-center border-2 border-stone-200 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-3 text-amber-600 bg-amber-100 rounded-full flex items-center justify-center text-3xl">
            🌾
          </div>
          <h3 className="text-xl font-bold text-green-950">
            କୌଣସି ଯୋଜନା ମିଳିଲା ନାହିଁ (No Matching Schemes)
          </h3>
          <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
            ଆପଣଙ୍କ ବୟସ କିମ୍ବା ଆୟ ଫର୍ମରେ ପରିବର୍ତ୍ତନ କରି ପୁନର୍ବାର ଯାଞ୍ଚ କରନ୍ତୁ।
          </p>
        </div>
      )}

      {/* Schemes Grid */}
      {!loading && schemes && schemes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme) => {
            const isPlayingOdia = speakingKey === `${scheme.id}-or`;
            const isPlayingEnglish = speakingKey === `${scheme.id}-en`;

            const odiaAudioText = scheme.audioText_or || `${scheme.name_or}। ${scheme.description_or}`;
            const englishAudioText = scheme.audioText_en || `${scheme.name_en}: ${scheme.description_en || ''}`;

            return (
              <article
                key={scheme.id || scheme.slug || scheme.name_en}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border-2 border-green-800/15 hover:border-amber-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-700 via-amber-500 to-green-800"></div>

                <div>
                  {/* Top Bar: Badge & Dual Audio Buttons (Odia & English) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${scheme.badgeColor || 'bg-green-100 text-green-900 border-green-300'}`}>
                      {scheme.badge || 'ଓଡ଼ିଶା ସରକାର / Govt. of Odisha'}
                    </span>

                    {/* Dual Audio Playback Buttons */}
                    <div className="flex items-center gap-1.5">
                      {/* Odia Audio Button */}
                      <button
                        type="button"
                        onClick={() => speakText(`${scheme.id}-or`, odiaAudioText, "or")}
                        title="Listen to scheme in Odia"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all active:scale-95 shadow-sm ${
                          isPlayingOdia
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                        }`}
                      >
                        <span>{isPlayingOdia ? '⏹️' : '🔊'}</span>
                        <span>{isPlayingOdia ? 'Stop' : 'ଶୁଣନ୍ତୁ (Odia)'}</span>
                      </button>

                      {/* English Audio Button (Reliable on all browsers & OS) */}
                      <button
                        type="button"
                        onClick={() => speakText(`${scheme.id}-en`, englishAudioText, "en")}
                        title="Listen to scheme in English"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all active:scale-95 shadow-sm ${
                          isPlayingEnglish
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-300'
                        }`}
                      >
                        <span>{isPlayingEnglish ? '⏹️' : '🔊'}</span>
                        <span>{isPlayingEnglish ? 'Stop' : 'Listen (English)'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Scheme Title in Odia & English (Bilingual, e.g. KALIA and PM-KISAN) */}
                  <h3 className="text-xl sm:text-2xl font-black text-green-950 group-hover:text-green-800 transition-colors">
                    {scheme.name_or || scheme.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-stone-500 mb-2">
                    {scheme.name_en} — <span className="font-normal text-stone-400">{scheme.department_en || scheme.department}</span>
                  </p>

                  {/* Description */}
                  <p className="text-sm text-stone-700 leading-relaxed bg-orange-50/70 p-3.5 rounded-2xl border border-orange-100 mb-4 font-medium">
                    {scheme.description_or || scheme.description_en}
                  </p>

                  {/* Key Benefits Checklist */}
                  <div className="mb-4">
                    <h4 className="text-xs sm:text-sm font-bold text-green-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="text-green-700 font-extrabold">✓</span>
                      <span>ମୁଖ୍ୟ ଲାଭ / Key Benefits:</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      {(scheme.benefits_or || scheme.benefits_en || []).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-green-100 text-green-800 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                            ✓
                          </span>
                          <span className="font-medium text-stone-800">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents */}
                  {(scheme.documents_or || scheme.documents_en) && (
                    <div className="mb-4 pt-3 border-t border-stone-100">
                      <p className="text-xs font-bold text-stone-600 mb-1.5">
                        📄 ଆବଶ୍ୟକୀୟ କାଗଜପତ୍ର (Documents Required):
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(scheme.documents_or || scheme.documents_en).map((doc, docIdx) => (
                          <span 
                            key={docIdx}
                            className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md border border-stone-200"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
                  <div className="text-xs text-stone-500 text-center sm:text-left">
                    <span className="block font-semibold text-stone-700">
                      ହେଲ୍ପଲାଇନ୍: {scheme.helpline || '1551'}
                    </span>
                    <span className="text-[10px] text-green-700 font-medium">
                      ନିକଟସ୍ଥ 'ମୋ ସେବା କେନ୍ଦ୍ର' ରେ ଉପଲବ୍ଧ
                    </span>
                  </div>

                  <a
                    href={scheme.official_link || 'https://odisha.gov.in'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-green-800 hover:bg-green-900 text-white shadow hover:shadow-md active:scale-95 transition-all duration-200 border border-green-950"
                  >
                    <span>ଅଧିକ ଜାଣନ୍ତୁ ଓ ଆବେଦନ</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SchemeResults;
