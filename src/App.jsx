import React, { useState, useEffect } from 'react';
import HeroBanner from './components/HeroBanner.jsx';
import VoiceRecorder from './components/VoiceRecorder.jsx';
import SoilAnalyzer from './components/SoilAnalyzer.jsx';
import EligibilityForm from './components/EligibilityForm.jsx';
import SchemeResults from './components/SchemeResults.jsx';
import DisclaimerFooter from './components/DisclaimerFooter.jsx';
import { fetchEligibleSchemes } from './services/schemeService.js';
import { translations } from './data/i18n.js';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState('or');

  // Authenticated farmer state
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    fullName: 'ରମେଶ ଚନ୍ଦ୍ର ସାହୁ (Ramesh Chandra Sahoo)',
    phone: '9876543210',
    district: 'Cuttack',
    role: 'ROLE_FARMER',
    isLoggedIn: true
  });
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Scheme Form Demographic
  const [formData, setFormData] = useState({
    age: 55,
    occupation: 'Farmer',
    income: 40000,
    has_ration_card: true
  });

  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightVoiceUpdate, setHighlightVoiceUpdate] = useState(false);

  useEffect(() => {
    loadSchemes(formData);
  }, []);

  const loadSchemes = async (dataToQuery) => {
    setIsLoading(true);
    try {
      const results = await fetchEligibleSchemes(dataToQuery);
      setSchemes(results);
    } catch (err) {
      console.error("Failed to load schemes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceParsed = (extractedData) => {
    const updatedForm = {
      age: extractedData.age ?? formData.age,
      occupation: extractedData.occupation ?? formData.occupation,
      income: extractedData.income ?? formData.income,
      has_ration_card: extractedData.has_ration_card ?? formData.has_ration_card
    };
    setFormData(updatedForm);
    setHighlightVoiceUpdate(true);
    setTimeout(() => setHighlightVoiceUpdate(false), 4000);
    loadSchemes(updatedForm);
  };

  const handleNavClick = (pageKey) => {
    // Protected check: Option 4 "ମାଟି ବିଷୟରେ ସୂଚନା" requires login
    if (pageKey === 'soil' && (!currentUser || !currentUser.isLoggedIn)) {
      setShowAuthModal(true);
      return;
    }
    setCurrentPage(pageKey);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[lang] || translations.or;

  return (
    <div className="min-h-screen bg-orange-50/70 text-stone-900 font-sans flex flex-col antialiased selection:bg-amber-300 selection:text-green-950">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full bg-green-900 text-white shadow-lg border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-green-800 hover:bg-green-700 text-amber-300"
              aria-label="Toggle Navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div onClick={() => setCurrentPage('home')} className="flex items-center gap-2 cursor-pointer">
              <span className="text-2xl">🌾</span>
              <div>
                <h1 className="text-xl font-black">{t.appName}</h1>
                <p className="text-[10px] text-amber-300">{t.appSubtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-green-950 rounded-lg p-1 text-xs font-bold">
              <button onClick={() => setLang('or')} className={`px-2 py-0.5 rounded ${lang === 'or' ? 'bg-amber-500 text-green-950' : 'text-stone-300'}`}>ଓଡ଼ିଆ</button>
              <button onClick={() => setLang('en')} className={`px-2 py-0.5 rounded ${lang === 'en' ? 'bg-amber-500 text-green-950' : 'text-stone-300'}`}>English</button>
            </div>
            {currentUser?.isLoggedIn ? (
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full font-bold">
                ✓ {currentUser.fullName?.split(' ')[0]}
              </span>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="text-xs bg-amber-500 text-green-950 px-3 py-1 rounded-full font-bold">
                {t.login}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        
        {/* Sidebar Navigation */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-72 bg-gradient-to-b from-green-950 via-green-900 to-green-950 text-stone-200 transform transition-transform duration-300 md:translate-x-0 md:static md:w-64 lg:w-72 shadow-xl border-r border-green-800 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4 border-b border-green-800 flex items-center justify-between">
            <span className="text-sm font-black text-amber-400">କୃଷି ମେନୁ (Navigation)</span>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-stone-400">✕</button>
          </div>

          <nav className="p-3 space-y-1.5 text-sm font-bold">
            <button onClick={() => handleNavClick('home')} className={`w-full text-left px-3.5 py-2.5 rounded-xl ${currentPage === 'home' ? 'bg-amber-500 text-green-950' : 'hover:bg-green-800/60'}`}>
              ୧. {t.nav_home}
            </button>
            <button onClick={() => handleNavClick('plant')} className={`w-full text-left px-3.5 py-2.5 rounded-xl ${currentPage === 'plant' ? 'bg-amber-500 text-green-950' : 'hover:bg-green-800/60'}`}>
              ୨. {t.nav_plant}
            </button>
            <button onClick={() => handleNavClick('crop_rec')} className={`w-full text-left px-3.5 py-2.5 rounded-xl ${currentPage === 'crop_rec' ? 'bg-amber-500 text-green-950' : 'hover:bg-green-800/60'}`}>
              ୩. {t.nav_crop_rec}
            </button>

            {/* MANDATORY OPTION NUMBER 4: ମାଟି ବିଷୟରେ ସୂଚନା */}
            <button onClick={() => handleNavClick('soil')} className={`w-full text-left px-3.5 py-2.5 rounded-xl border ${currentPage === 'soil' ? 'bg-amber-500 text-green-950 border-amber-400 font-black' : 'bg-green-900/40 text-amber-200 border-amber-500/30 hover:bg-green-800/60'}`}>
              <div className="flex items-center justify-between">
                <span>୪. ମାଟି ବିଷୟରେ ସୂଚନା</span>
                <span className="text-[10px] bg-amber-400 text-green-950 px-1.5 rounded-full font-black">ନୂତନ</span>
              </div>
            </button>

            <button onClick={() => handleNavClick('weather')} className={`w-full text-left px-3.5 py-2.5 rounded-xl ${currentPage === 'weather' ? 'bg-amber-500 text-green-950' : 'hover:bg-green-800/60'}`}>
              ୫. {t.nav_weather}
            </button>
            <button onClick={() => handleNavClick('calendar')} className={`w-full text-left px-3.5 py-2.5 rounded-xl ${currentPage === 'calendar' ? 'bg-amber-500 text-green-950' : 'hover:bg-green-800/60'}`}>
              ୬. {t.nav_calendar}
            </button>
            <button onClick={() => handleNavClick('history')} className={`w-full text-left px-3.5 py-2.5 rounded-xl ${currentPage === 'history' ? 'bg-amber-500 text-green-950' : 'hover:bg-green-800/60'}`}>
              ୭. {t.nav_history}
            </button>
            <button onClick={() => handleNavClick('profile')} className={`w-full text-left px-3.5 py-2.5 rounded-xl ${currentPage === 'profile' ? 'bg-amber-500 text-green-950' : 'hover:bg-green-800/60'}`}>
              ୮. {t.nav_profile}
            </button>
            <button onClick={() => handleNavClick('admin')} className={`w-full text-left px-3.5 py-2.5 rounded-xl ${currentPage === 'admin' ? 'bg-amber-500 text-green-950' : 'hover:bg-green-800/60'}`}>
              ୯. {t.nav_admin}
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Quick Voice Bar */}
          <div className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-green-950 font-bold px-4 py-3 rounded-2xl shadow-sm flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <span>ଓଡ଼ିଆରେ କହିବା ପାଇଁ ତଳ ବଟନ୍ ଦବାନ୍ତୁ (Press big mic button below to speak)</span>
            </div>
            <span className="bg-white/40 px-2 py-0.5 rounded-full text-xs font-black">
              AI ସମର୍ଥିତ
            </span>
          </div>

          {/* Conditional Page Rendering */}
          {currentPage === 'home' && (
            <div className="space-y-6">
              <HeroBanner />
              <VoiceRecorder onVoiceParsed={handleVoiceParsed} isProcessingGlobal={isLoading} />
              <EligibilityForm formData={formData} setFormData={setFormData} onSubmit={(e) => { e?.preventDefault(); loadSchemes(formData); }} isLoading={isLoading} highlightVoiceUpdate={highlightVoiceUpdate} />
              <SchemeResults schemes={schemes} isLoading={isLoading} userData={formData} />
            </div>
          )}

          {currentPage === 'soil' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-green-800/20 space-y-6">
              <div className="border-b pb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-green-950">
                  ସାଇଡବାର୍ ଅପ୍ସନ୍ ନଂ ୪ • Sidebar Option #4
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-green-950 mt-2">
                  ମାଟି ବିଷୟରେ ସୂଚନା (Soil Information & Farmer Dashboard)
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  କୃଷକ ଡ୍ୟାସବୋର୍ଡ, ମାଟିର ଭିଜୁଆଲ୍ ବିଶ୍ଳେଷଣ ଏବଂ ଲ୍ୟାବ୍ ଟେଷ୍ଟ୍ ରିପୋର୍ଟ ସାର ପ୍ରୟୋଗ ସୂଚୀ।
                </p>
              </div>

              {/* Farmer Dashboard Snapshot */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
                  <span className="text-xs font-bold text-stone-500">କୃଷକଙ୍କ ନାମ</span>
                  <div className="text-base font-black text-green-950 truncate">{currentUser.fullName}</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
                  <span className="text-xs font-bold text-stone-500">ଗଛ ରୋଗ ପରୀକ୍ଷା</span>
                  <div className="text-2xl font-black text-emerald-700">1</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
                  <span className="text-xs font-bold text-stone-500">ମାଟି ପରୀକ୍ଷା</span>
                  <div className="text-2xl font-black text-amber-600">1</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
                  <span className="text-xs font-bold text-stone-500">ମାଟି pH</span>
                  <div className="text-2xl font-black text-blue-700">6.4 (ସନ୍ତୁଳିତ)</div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-950">
                <strong>ପୂର୍ଣ୍ଣାଙ୍ଗ ଅନୁଭୂତି:</strong> ସମ୍ପୂର୍ଣ୍ଣ ଇଣ୍ଟରାକ୍ଟିଭ୍ କୃଷକ ଡ୍ୟାସବୋର୍ଡ, ଫଟୋ ଅପଲୋଡ୍ ଏବଂ ଲ୍ୟାବ୍ ରିପୋର୍ଟ ମୂଲ୍ୟାଙ୍କନ <strong>http://localhost:3000/index.html</strong> ରେ ଉପଲବ୍ଧ।
              </div>
            </div>
          )}

          {currentPage !== 'home' && currentPage !== 'soil' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-green-800/20 text-center space-y-4">
              <h2 className="text-2xl font-black text-green-950">
                {currentPage.toUpperCase()} MODULE
              </h2>
              <p className="text-sm text-stone-600">
                Active in the standalone dashboard. Navigate via sidebar or voice commands.
              </p>
              <button onClick={() => setCurrentPage('home')} className="px-5 py-2.5 bg-green-800 text-white font-bold rounded-xl">
                ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ
              </button>
            </div>
          )}
        </main>
      </div>


        {/* 2. VoiceRecorder Component */}
        <VoiceRecorder 
          onVoiceParsed={handleVoiceParsed} 
          isProcessingGlobal={isLoading}
        />

        {/* Soil Health Analyzer Component */}
        <SoilAnalyzer />

        {/* 3. EligibilityForm Component */}
        <EligibilityForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleManualSubmit}
          isLoading={isLoading}
          highlightVoiceUpdate={highlightVoiceUpdate}
        />

        {/* 4. SchemeResults Component */}
        <SchemeResults 
          schemes={schemes} 
          isLoading={isLoading} 
          userData={formData}
        />

      </main>

      {/* 5. Persistent Disclaimer Footer */}

      <DisclaimerFooter />

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
            <h3 className="text-xl font-black text-green-950">କୃଷକ ଲଗଇନ୍</h3>
            <p className="text-xs text-stone-500">"ମାଟି ବିଷୟରେ ସୂଚନା" ଦେଖିବା ପାଇଁ ଲଗଇନ୍ କରନ୍ତୁ।</p>
            <button
              onClick={() => {
                setCurrentUser({ ...currentUser, isLoggedIn: true });
                setShowAuthModal(false);
                setCurrentPage('soil');
              }}
              className="w-full py-2.5 bg-amber-500 text-green-950 font-bold rounded-xl"
            >
              ⚡ ୧-କ୍ଲିକ୍ ଡେମୋ ଲଗଇନ୍
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
