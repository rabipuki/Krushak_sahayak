import React from 'react';

/**
 * EligibilityForm Component
 * Bilingual demographic form for farmers in Odisha.
 * Inputs:
 * - Age / ବୟସ (number)
 * - Occupation / ବୃତ୍ତି (select)
 * - Annual Income / ବାର୍ଷିକ ଆୟ (number with ₹ display)
 * - Ration Card Status / ରାସନ କାର୍ଡ (checkbox toggle)
 * 
 * Auto-syncs instantly with VoiceRecorder output and supports manual submission.
 */
export const EligibilityForm = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  highlightVoiceUpdate
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const occupations = [
    { value: 'Farmer', label_or: 'କୃଷକ (ଚାଷୀ)', label_en: 'Farmer / Cultivator' },
    { value: 'Agricultural Labourer', label_or: 'କୃଷି ଶ୍ରମିକ (ମୂଲିଆ)', label_en: 'Agricultural Labourer' },
    { value: 'Small Artisan', label_or: 'କ୍ଷୁଦ୍ର କାରିଗର', label_en: 'Small Artisan / Craftsman' },
    { value: 'Self Employed', label_or: 'ଆତ୍ମ ନିୟୋଜିତ / ବ୍ୟବସାୟୀ', label_en: 'Self Employed / Small Business' },
    { value: 'Other', label_or: 'ଅନ୍ୟାନ୍ୟ', label_en: 'Other Rural Resident' }
  ];

  return (
    <form
      onSubmit={onSubmit}
      className={`w-full bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 transition-all duration-500 ${
        highlightVoiceUpdate
          ? 'border-amber-400 ring-4 ring-amber-300/40 bg-amber-50/20'
          : 'border-green-800/10'
      }`}
      aria-label="Farmer eligibility form"
    >
      {/* Form Header with Voice Sync Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-green-950 flex items-center gap-2">
            <span>କୃଷକ ତଥ୍ୟ ଫର୍ମ</span>
            <span className="text-stone-400 font-normal">|</span>
            <span className="text-sm sm:text-lg font-semibold text-stone-600">Farmer Profile</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            ଭଏସ୍ କିମ୍ବା ହାତରେ ତଥ୍ୟ ପୂରଣ କରି ଯୋଜନା ଖୋଜନ୍ତୁ (Verify or edit your details)
          </p>
        </div>

        {highlightVoiceUpdate && (
          <span className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-green-950 shadow-sm animate-bounce">
            ✨ ଭଏସ୍‌ରୁ ଅପଡେଟ୍ ହେଲା (Voice Auto-Filled)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* 1. Age Input */}
        <div className="flex flex-col">
          <label 
            htmlFor="age-input" 
            className="text-sm sm:text-base font-bold text-green-900 mb-1.5 flex items-center justify-between"
          >
            <span>ବୟସ / Age</span>
            <span className="text-xs font-normal text-stone-500">(୧୮ - ୧୦୦ ବର୍ଷ)</span>
          </label>
          <div className="relative">
            <input
              id="age-input"
              type="number"
              name="age"
              min="18"
              max="100"
              required
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 55"
              className="w-full text-lg font-semibold px-4 py-3.5 rounded-xl border-2 border-stone-300 focus:border-green-700 focus:ring-2 focus:ring-green-600/30 text-stone-900 placeholder-stone-400 transition-all outline-none bg-stone-50/50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-stone-500">
              ବର୍ଷ / Yrs
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            ବୟସ ଅନୁଯାୟୀ ବୃଦ୍ଧକାଳୀନ ଭତ୍ତା ଓ କୃଷି ଯୋଜନା ନିର୍ଦ୍ଧାରଣ ହୁଏ
          </p>
        </div>

        {/* 2. Occupation Select */}
        <div className="flex flex-col">
          <label 
            htmlFor="occupation-select" 
            className="text-sm sm:text-base font-bold text-green-900 mb-1.5 flex items-center justify-between"
          >
            <span>ବୃତ୍ତି / Occupation</span>
            <span className="text-xs font-normal text-stone-500">ପ୍ରମୁଖ କାର୍ଯ୍ୟ</span>
          </label>
          <div className="relative">
            <select
              id="occupation-select"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full text-base sm:text-lg font-semibold px-4 py-3.5 rounded-xl border-2 border-stone-300 focus:border-green-700 focus:ring-2 focus:ring-green-600/30 text-stone-900 bg-stone-50/50 transition-all outline-none appearance-none cursor-pointer"
            >
              {occupations.map((occ) => (
                <option key={occ.value} value={occ.value}>
                  {occ.label_or} - {occ.label_en}
                </option>
              ))}
            </select>
            {/* Custom chevron */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            ଚାଷୀ ଓ କୃଷି ଶ୍ରମିକଙ୍କ ପାଇଁ କାଳିଆ ଓ ବଳରାମ ଯୋଜନା ବିଶେଷ ପ୍ରଯୁଜ୍ୟ
          </p>
        </div>

        {/* 3. Annual Income Input */}
        <div className="flex flex-col">
          <label 
            htmlFor="income-input" 
            className="text-sm sm:text-base font-bold text-green-900 mb-1.5 flex items-center justify-between"
          >
            <span>ବାର୍ଷିକ ଆୟ / Annual Income</span>
            <span className="text-xs font-normal text-stone-500">(₹ ଟଙ୍କା)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-green-800">
              ₹
            </span>
            <input
              id="income-input"
              type="number"
              name="income"
              min="0"
              step="1000"
              required
              value={formData.income}
              onChange={handleChange}
              placeholder="e.g. 40000"
              className="w-full text-lg font-semibold pl-10 pr-4 py-3.5 rounded-xl border-2 border-stone-300 focus:border-green-700 focus:ring-2 focus:ring-green-600/30 text-stone-900 placeholder-stone-400 transition-all outline-none bg-stone-50/50"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1">
            <span>ସମଗ୍ର ପରିବାରର ମୋଟ ଆୟ</span>
            {Number(formData.income) > 0 && (
              <span className="font-semibold text-green-800">
                ₹{Number(formData.income).toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* 4. Ration Card Status (Large, tactile card-style toggle) */}
        <div className="flex flex-col justify-between">
          <label className="text-sm sm:text-base font-bold text-green-900 mb-1.5">
            ରାସନ କାର୍ଡ ଅଛି କି? / Ration Card Status
          </label>
          <label 
            htmlFor="ration-card-checkbox"
            className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none ${
              formData.has_ration_card
                ? 'bg-amber-500/10 border-amber-500 text-green-950 shadow-sm'
                : 'bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                id="ration-card-checkbox"
                type="checkbox"
                name="has_ration_card"
                checked={formData.has_ration_card}
                onChange={handleChange}
                className="w-6 h-6 text-green-800 rounded-md border-stone-400 focus:ring-green-600 cursor-pointer accent-green-800"
              />
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold">
                  {formData.has_ration_card ? 'ହଁ, ରାସନ କାର୍ଡ ଅଛି' : 'ନାହିଁ (No Ration Card)'}
                </span>
                <span className="text-xs text-stone-500">
                  {formData.has_ration_card ? 'NFSA / SFSS / BSKY Card Available' : 'Without Ration Card'}
                </span>
              </div>
            </div>

            <span className={`text-xl ${formData.has_ration_card ? 'text-green-700' : 'text-stone-300'}`}>
              💳
            </span>
          </label>
          <p className="text-[11px] text-stone-500 mt-1">
            ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ ଯୋଜନା (BSKY) ପାଇଁ ରାସନ କାର୍ଡ ଆବଶ୍ୟକ
          </p>
        </div>
      </div>

      {/* Manual Submit Button: "Check Eligibility / ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ" */}
      <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto min-w-[280px] bg-amber-500 hover:bg-amber-600 text-green-950 font-black text-lg sm:text-xl py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-amber-500/25 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 border-2 border-amber-600"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-green-950" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>ଖୋଜା ଚାଲିଛି... / Checking...</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6 text-green-950" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ / Check Eligibility</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EligibilityForm;
