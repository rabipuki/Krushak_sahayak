import React from 'react';

/**
 * HeroBanner Component
 * Welcomes farmers in Odisha with a bilingual, earthy agricultural theme.
 * Designed with high contrast, large typography, and simple visual cues for low-literacy users.
 */
export const HeroBanner = () => {
  return (
    <header className="w-full bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white shadow-md border-b-4 border-amber-500">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center text-center">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/40 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            ଓଡ଼ିଶା ସରକାରୀ ଯୋଜନା ସହାୟକ • Govt. of Odisha Schemes
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-950/60 text-green-200 border border-green-700/50">
            📞 କିଷାନ ହେଲ୍ପଲାଇନ୍: 1551 (Toll-Free)
          </span>
        </div>

        {/* Main Logo & Title */}
        <div className="flex items-center justify-center gap-3 my-2">
          {/* Decorative agricultural sheaf icon */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-green-950 shadow-inner flex-shrink-0">
            <svg 
              className="w-8 h-8 sm:w-10 sm:h-10" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18c-2.5 0-5 2-5 5v5c0 2 1.5 3.5 3 4m2-14c2.5 0 5 2 5 5v5c0 2-1.5 3.5-3 4m-4 4h4" />
            </svg>
          </div>

          <div className="text-left">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>ଓଡ଼ିଆ ସହାୟକ</span>
              <span className="text-amber-400 font-medium text-lg sm:text-2xl">| Odia Sahayak</span>
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
              କୃଷକଙ୍କ ପାଇଁ ଭଏସ୍-ଆଧାରିତ ସରକାରୀ ଯୋଜନା ସନ୍ଧାନକାରୀ
            </p>
          </div>
        </div>

        {/* Bilingual Tagline */}
        <p className="mt-3 text-base sm:text-lg text-emerald-50 max-w-2xl leading-relaxed">
          ନିଜ ମାତୃଭାଷା <strong className="text-amber-300 font-bold underline decoration-amber-400">ଓଡ଼ିଆରେ କହି</strong> କାଳିଆ (KALIA), ବିଏସକେୱାଇ (BSKY) ଓ ଅନ୍ୟାନ୍ୟ ସରକାରୀ ସହାୟତା ପାଆନ୍ତୁ।
        </p>

        {/* 3 Simple Visual Steps for Low-Literacy Accessibility */}
        <div className="mt-5 w-full max-w-xl bg-green-950/70 border border-green-700/60 rounded-2xl p-3 sm:p-4 grid grid-cols-3 gap-2 text-center text-xs sm:text-sm shadow-sm">
          <div className="flex flex-col items-center">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-green-950 font-bold flex items-center justify-center text-xs sm:text-sm mb-1">
              ୧
            </span>
            <span className="font-semibold text-white">ମାଇକ୍ ଦବାନ୍ତୁ</span>
            <span className="text-[10px] sm:text-xs text-amber-200/70">Press Mic</span>
          </div>

          <div className="flex flex-col items-center border-x border-green-700/60 px-1">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-green-950 font-bold flex items-center justify-center text-xs sm:text-sm mb-1">
              ୨
            </span>
            <span className="font-semibold text-white">ଓଡ଼ିଆରେ କୁହନ୍ତୁ</span>
            <span className="text-[10px] sm:text-xs text-amber-200/70">Speak in Odia</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-green-950 font-bold flex items-center justify-center text-xs sm:text-sm mb-1">
              ୩
            </span>
            <span className="font-semibold text-white">ଯୋଜନା ଦେଖନ୍ତୁ</span>
            <span className="text-[10px] sm:text-xs text-amber-200/70">View Schemes</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroBanner;
