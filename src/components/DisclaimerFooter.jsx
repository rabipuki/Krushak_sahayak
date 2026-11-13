import React from 'react';

/**
 * DisclaimerFooter Component
 * Persistent disclaimer and official links for rural citizens and farmers in Odisha.
 */
export const DisclaimerFooter = () => {
  return (
    <footer className="w-full mt-12 bg-stone-900 text-stone-300 border-t-4 border-amber-500">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center text-center">
        {/* Prominent Disclaimer Alert */}
        <div className="w-full bg-amber-500/10 border-2 border-amber-500/50 rounded-2xl p-4 sm:p-5 mb-6 text-amber-200">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xl">⚠️</span>
            <h3 className="text-base sm:text-lg font-bold text-amber-300">
              ସରକାରୀ ସୂଚନା ଓ ସତର୍କତା / Official Advisory
            </h3>
          </div>
          <p className="text-sm sm:text-base font-semibold text-amber-100 mt-1">
            ⚠️ Guidance only. Verify on official government portals.
          </p>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            ଏହି ଆପ୍ କେବଳ ସୂଚନା ଓ ସହାୟତା ପାଇଁ ପ୍ରସ୍ତୁତ। ଯୋଜନାର ଚୂଡ଼ାନ୍ତ ନିୟମାବଳୀ ଓ ପଞ୍ଜୀକରଣ ପାଇଁ ସରକାରୀ ପୋର୍ଟାଲ କିମ୍ବା ନିକଟସ୍ଥ "ମୋ ସେବା କେନ୍ଦ୍ର" କୁ ଯାଆନ୍ତୁ।
          </p>
        </div>

        {/* Quick Links to Official Odisha Portals */}
        <div className="w-full flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-stone-400 mb-6">
          <a 
            href="https://kalia.odisha.gov.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-amber-400 transition-colors underline decoration-stone-600 underline-offset-4"
          >
            କାଳିଆ ପୋର୍ଟାଲ (kalia.odisha.gov.in)
          </a>
          <span>•</span>
          <a 
            href="https://bsky.odisha.gov.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-amber-400 transition-colors underline decoration-stone-600 underline-offset-4"
          >
            ବିଏସକେୱାଇ ପୋର୍ଟାଲ (bsky.odisha.gov.in)
          </a>
          <span>•</span>
          <a 
            href="https://agrisnetodisha.ori.nic.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-amber-400 transition-colors underline decoration-stone-600 underline-offset-4"
          >
            କୃଷି ବିଭାଗ (Agrisnet Odisha)
          </a>
          <span>•</span>
          <a 
            href="https://odisha.gov.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-amber-400 transition-colors underline decoration-stone-600 underline-offset-4"
          >
            ଓଡ଼ିଶା ସରକାର (odisha.gov.in)
          </a>
        </div>

        {/* Helplines Pill Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-6">
          <span className="bg-stone-800 text-stone-300 px-3 py-1.5 rounded-full border border-stone-700">
            🌾 କିଷାନ କଲ୍ ସେଣ୍ଟର: <strong>1551</strong>
          </span>
          <span className="bg-stone-800 text-stone-300 px-3 py-1.5 rounded-full border border-stone-700">
            🏥 BSKY ସ୍ୱାସ୍ଥ୍ୟ ସହାୟତା: <strong>104</strong>
          </span>
          <span className="bg-stone-800 text-stone-300 px-3 py-1.5 rounded-full border border-stone-700">
            🏛️ ଟୋଲ୍ ଫ୍ରି କାଳିଆ ହେଲ୍ପଲାଇନ୍: <strong>1800-572-1122</strong>
          </span>
        </div>

        {/* Copyright & Mission Note */}
        <p className="text-xs text-stone-500">
          ଓଡ଼ିଆ ସହାୟକ (Odia Sahayak) — Odisha Farmer Welfare & Government Scheme Portal
        </p>
      </div>
    </footer>
  );
};

export default DisclaimerFooter;
