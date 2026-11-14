# 🌾 ଓଡ଼ିଆ ସହାୟକ (Odia Sahayak) - Farmer Welfare Assistant

An accessible, responsive, voice-enabled React.js web application designed specifically for rural farmers in Odisha to discover eligible government schemes using native Odia voice input.

---

## 🌟 Key Features

1. **Native Odia Voice Input**:
   - Massive, high-contrast, visually prominent microphone button ("ମାଇକ୍ ଦବାଇ ଓଡ଼ିଆରେ କୁହନ୍ତୁ") with ambient and active pulse rings.
   - Built using the browser's native **MediaRecorder API** to record live farmer speech.
   - Includes asynchronous **Gemini AI API stub** (`processOdiaAudio`) that processes audio and resolves the extracted profile:
     ```json
     { "age": 55, "occupation": "Farmer", "income": 40000, "has_ration_card": true }
     ```

2. **Instant Form Auto-Fill & State Synchronization**:
   - Demographics form with fields for:
     - **Age / ବୟସ** (Number input)
     - **Occupation / ବୃତ୍ତି** (Select: Farmer / Agricultural Labourer / Small Artisan / Self Employed / Other)
     - **Annual Income / ବାର୍ଷିକ ଆୟ** (Number input with ₹ formatting)
     - **Ration Card Status / ରାସନ କାର୍ଡ** (Tactile card checkbox toggle)
   - Whenever voice input is transcribed, the form fields update **automatically and instantly** on screen with a highlight animation.

3. **Supabase Integration & Scheme Results**:
   - Modular `src/supabaseClient.js` configuration file using `@supabase/supabase-js`.
   - `fetchEligibleSchemes(userData)` function demonstrating exact Supabase queries:
     ```javascript
     const { data, error } = await supabase.from('schemes').select('*');
     ```
   - Displays eligible scheme cards including **KALIA (କାଳିଆ ଯୋଜନା)**, **BSKY (ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ ଯୋଜନା)**, **PM-KISAN**, and **BALARAM**.
   - Built-in **Text-to-Speech audio readout** ("ଶୁଣନ୍ତୁ / Listen") using Web Speech Synthesis for low-literacy users.

4. **Agricultural Earthy Design System**:
   - Palette: **Forest green** (`bg-green-800`), **Harvest gold** (`bg-amber-500`), and **Warm off-white** (`bg-orange-50`).
   - Large, legible sans-serif typography with high contrast for outdoor sunlight readability.
   - Bilingual interface with English and Odia script on all labels, badges, and buttons.
   - Single-column layout on mobile, clean max-width container on desktop.
   - Tactile button feedback with `hover:bg-amber-600`, `transition-all`, and `active:scale-95`.
   - Persistent disclaimer footer: `"⚠️ Guidance only. Verify on official government portals."`

---

## 📁 Project Architecture

```
farmer7/
├── index.html                 # Standalone runnable React + Tailwind app (zero install required)
├── index.vite.html            # Vite HTML template
├── package.json               # NPM scripts and dependencies (@supabase/supabase-js, react, tailwindcss)
├── vite.config.js             # Vite development server configuration
├── tailwind.config.js         # Tailwind configuration with agricultural earthy palette
├── postcss.config.js          # PostCSS configuration
├── server.js                  # Lightweight zero-dependency Node static web server
├── public/
│   └── favicon.svg            # Agricultural sheaf icon
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Main orchestration component tying state together
    ├── index.css              # Tailwind base + custom Odia typography and pulsing animations
    ├── supabaseClient.js      # Supabase configuration stub with SQL schema documentation
    ├── components/
    │   ├── HeroBanner.jsx     # Earthy agricultural banner with bilingual titles
    │   ├── VoiceRecorder.jsx  # Prominent pulsing mic + MediaRecorder API + Gemini audio stub
    │   ├── EligibilityForm.jsx# Bilingual form with instant auto-fill & manual check button
    │   ├── SchemeResults.jsx  # Grid of eligible schemes with audio playback & Supabase query
    │   └── DisclaimerFooter.jsx# Persistent official guidance disclaimer
    ├── data/
    │   └── mockSchemes.js     # Comprehensive Odisha schemes dataset (KALIA, BSKY, PM-KISAN, BALARAM)
    └── services/
        ├── geminiAudioService.js # Audio transcription and parsing service (mock + production structure)
        └── schemeService.js      # Supabase querying and client-side eligibility rule engine
```

---

## 🚀 How to Run

### Method 1: Instant Browser Preview (Zero Installation)
Simply double-click or open `index.html` in **Google Chrome**, **Microsoft Edge**, **Mozilla Firefox**, or **Safari**.
It runs React 18, Tailwind CSS, Lucide icons, speech synthesis, and audio recording immediately with no build steps required!

### Method 2: Run with Built-in Node Server
Open a terminal in the project directory and run:
```bash
node server.js
```
Then visit: **http://localhost:3000** in your web browser.

### Method 3: Standard Vite React Development Workflow
When using a standard Node/NPM environment:
```bash
# 1. Install dependencies
npm install

# 2. Run Vite local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🗄️ Supabase Backend Setup

To connect to your live Supabase project:
1. Create a free project at [supabase.com](https://supabase.com).
2. Create a `.env` file at the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Run the following SQL script in your Supabase **SQL Editor**:
   ```sql
   CREATE TABLE IF NOT EXISTS public.schemes (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     slug VARCHAR(50) UNIQUE NOT NULL,
     name_en VARCHAR(255) NOT NULL,
     name_or VARCHAR(255) NOT NULL,
     description_en TEXT NOT NULL,
     description_or TEXT NOT NULL,
     benefits_en TEXT[] NOT NULL,
     benefits_or TEXT[] NOT NULL,
     min_age INT DEFAULT 18,
     max_age INT DEFAULT 100,
     max_income INT DEFAULT NULL,
     allowed_occupations TEXT[] NOT NULL,
     requires_ration_card BOOLEAN DEFAULT FALSE,
     official_link TEXT,
     helpline VARCHAR(50)
   );

   ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Public schemes are viewable by everyone" 
     ON public.schemes FOR SELECT USING (true);

   -- 2. Create Soil Tests Table (for SoilAnalyzer Component)
   CREATE TABLE IF NOT EXISTS public.soil_tests (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     soil_quality TEXT NOT NULL,
     solution TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   ALTER TABLE public.soil_tests ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Allow anonymous soil test insert" 
     ON public.soil_tests FOR INSERT WITH CHECK (true);
   CREATE POLICY "Allow public soil test view" 
     ON public.soil_tests FOR SELECT USING (true);
   ```

---

## 🤖 Google Gemini AI Audio Integration

The `processOdiaAudio(audioBlob)` function in `src/services/geminiAudioService.js` is pre-architected to accept the audio blob captured from the browser's `MediaRecorder` and send it to **Gemini 1.5/2.0 Flash Multimodal Audio API** using:
- Model: `gemini-1.5-flash` or `gemini-2.0-flash`
- Input: `inlineData` (base64 audio) + System instruction to transcribe colloquial Odia dialect
- Output: Strict JSON matching `{ age, occupation, income, has_ration_card }`
- Fallback: Current stub resolves the specified mock data after 2 seconds.

---

## 🏛️ Official Odisha Government Schemes Covered

1. **KALIA Scheme (କାଳିଆ ଯୋଜନା)**:
   - Annual cultivation grant of ₹10,000 for small and marginal farmers
   - Financial assistance of ₹12,500 for landless agricultural labourers
   - 0% interest crop loans up to ₹50,000
2. **BSKY / Nabin Card (ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ ଯୋଜନା)**:
   - Cashless hospital treatment up to ₹5 Lakh/year for family, ₹10 Lakh/year for women
   - Covers 800+ empanelled premier hospitals across India
3. **PM-KISAN (ପ୍ରଧାନମନ୍ତ୍ରୀ କିଷାନ ସମ୍ମାନ ନିଧି)**:
   - Direct bank transfer of ₹6,000/year in 3 instalments of ₹2,000
4. **BALARAM (ବଳରାମ ଯୋଜନା)**:
   - Institutional credit up to ₹1.6 Lakh per JLG group for landless farmers & sharecroppers (ଭାଗଚାଷୀ)

---

## ⚠️ Disclaimer
**Guidance only. Verify on official government portals.**
ଏହି ଆପ୍ କେବଳ ସୂଚନା ଓ ସହାୟତା ପାଇଁ ପ୍ରସ୍ତୁତ। ଯୋଜନାର ଚୂଡ଼ାନ୍ତ ନିୟମାବଳୀ ଓ ପଞ୍ଜୀକରଣ ପାଇଁ ସରକାରୀ ପୋର୍ଟାଲ (kalia.odisha.gov.in, bsky.odisha.gov.in) କିମ୍ବା ନିକଟସ୍ଥ 'ମୋ ସେବା କେନ୍ଦ୍ର' କୁ ଯାଆନ୍ତୁ।
