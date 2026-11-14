import React, { useState, useEffect } from 'react';
import HeroBanner from './components/HeroBanner.jsx';
import VoiceRecorder from './components/VoiceRecorder.jsx';
import SoilAnalyzer from './components/SoilAnalyzer.jsx';
import EligibilityForm from './components/EligibilityForm.jsx';
import SchemeResults from './components/SchemeResults.jsx';
import DisclaimerFooter from './components/DisclaimerFooter.jsx';
import { fetchEligibleSchemes } from './services/schemeService.js';

/**
 * Odia Sahayak - Main Application Component
 * 
 * An accessible, voice-driven web app designed for rural farmers in Odisha.
 * Color Palette:
 * - Forest Green: bg-green-800 (#166534)
 * - Harvest Gold: bg-amber-500 (#f59e0b)
 * - Off-White: bg-orange-50 (#fffaf0)
 */
export function App() {
  // 1. Farmer Demographic Form State
  const [formData, setFormData] = useState({
    age: 55,
    occupation: 'Farmer',
    income: 40000,
    has_ration_card: true
  });

  // 2. Schemes & UI Status State
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightVoiceUpdate, setHighlightVoiceUpdate] = useState(false);

  // 3. Query Schemes on Component Mount
  useEffect(() => {
    loadSchemes(formData);
  }, []);

  /**
   * Fetch eligible schemes using the Supabase service stub
   */
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

  /**
   * Callback invoked by VoiceRecorder when Gemini AI returns parsed JSON:
   * { "age": 55, "occupation": "Farmer", "income": 40000, "has_ration_card": true }
   * 
   * Instantly and automatically updates React state and highlights the form fields!
   */
  const handleVoiceParsed = (extractedData) => {
    console.log("📥 [App] Voice data received:", extractedData);

    // Update form fields immediately
    const updatedForm = {
      age: extractedData.age ?? formData.age,
      occupation: extractedData.occupation ?? formData.occupation,
      income: extractedData.income ?? formData.income,
      has_ration_card: extractedData.has_ration_card ?? formData.has_ration_card
    };

    setFormData(updatedForm);

    // Trigger visual highlight indicator
    setHighlightVoiceUpdate(true);
    setTimeout(() => {
      setHighlightVoiceUpdate(false);
    }, 4000);

    // Automatically re-query schemes with the freshly recognized data
    loadSchemes(updatedForm);
  };

  /**
   * Manual form submit handler for "Check Eligibility / ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ"
   */
  const handleManualSubmit = (e) => {
    if (e) e.preventDefault();
    loadSchemes(formData);
  };

  return (
    <div className="min-h-screen bg-orange-50/70 text-stone-900 font-sans flex flex-col antialiased selection:bg-amber-300 selection:text-green-950">
      {/* 1. HeroBanner Component */}
      <HeroBanner />

      {/* Main Single-Column / Max-Width Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8">
        
        {/* Quick Voice Prompt Strip */}
        <div className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-green-950 font-bold px-4 py-3 rounded-2xl shadow-sm flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎙️</span>
            <span>ଓଡ଼ିଆରେ କହିବା ପାଇଁ ତଳ ବଟନ୍ ଦବାନ୍ତୁ (Press big mic button below to speak)</span>
          </div>
          <span className="hidden sm:inline-block bg-white/40 px-2 py-0.5 rounded-full text-xs font-black">
            AI ସମର୍ଥିତ
          </span>
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
    </div>
  );
}

export default App;
