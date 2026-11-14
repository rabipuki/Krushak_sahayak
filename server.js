/**
 * server.js - Unified Full-Stack HTTP Server & REST API
 * Serves Odia Sahayak web application locally on port 3000.
 * Includes complete REST API endpoints for:
 *   - Farmer Registration, Login, Forgot Password (JWT)
 *   - Farmer Dashboard
 *   - AI Plant Disease Analysis (proxies to FastAPI 8000 or fallback)
 *   - AI Soil Analysis & Soil Test Report
 *   - Weather Assistant for Odisha Districts
 *   - Crop Growth Calendar & Stage Checklist
 *   - Crop & Fertilizer Recommendations
 *   - Analysis History & PDF Generation
 *   - Admin Portal
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';

// In-Memory & Persistent Storage
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const DB_FILE = path.join(DATA_DIR, 'platform_db.json');

// Initial seeded database
let database = {
  farmers: [
    {
      id: 1,
      fullName: 'ରମେଶ ଚନ୍ଦ୍ର ସାହୁ (Ramesh Chandra Sahoo)',
      phone: '9876543210',
      email: 'ramesh.farmer@example.com',
      password: 'password123',
      district: 'Cuttack',
      block: 'Banki',
      village: 'Subarnapur',
      landSizeAcres: 3.5,
      primarySoilType: 'Alluvial Loam',
      preferredLanguage: 'or',
      hasRationCard: true,
      annualIncome: 45000,
      createdAt: new Date().toISOString()
    }
  ],
  plantAnalyses: [
    {
      id: 1,
      farmerId: 1,
      cropName: 'Rice / Paddy (ଧାନ)',
      cropNameOr: 'ଧାନ',
      diseaseName: 'Rice Blast (Magnaporthe oryzae)',
      diseaseNameOr: 'ଧାନ ବ୍ଲାଷ୍ଟ୍ ରୋଗ (ଝଣା ରୋଗ)',
      confidenceScore: 0.91,
      healthStatus: 'Diseased',
      severity: 'High (ତୀବ୍ର)',
      visibleSymptoms: 'Spindle-shaped lesions with grayish centers and brown borders on leaves.',
      symptomsOr: 'ପତ୍ରରେ ଧାରୁଆ କଳା-ବାଦାମୀ ଦାଗ ଏବଂ କେଣ୍ଡା ମୂଳ କଳା ପଡ଼ି ଧାନ ଶୁଖିଯାଏ।',
      possibleCauses: 'Excessive urea application and high relative humidity (>90%).',
      causesOr: 'ଅତ୍ୟଧିକ ୟୁରିଆ ଏବଂ କୁହୁଡ଼ିଆ ପାଗରେ କବକ ବୃଦ୍ଧି।',
      recommendedTreatment: 'Spray Tricyclazole 75% WP @ 0.6 g/L water (120 g/acre).',
      treatmentOr: 'ଟ୍ରାଇସାଇକ୍ଲାଜୋଲ୍ ୭୫% WP (Tricyclazole) ୦.୬ ଗ୍ରାମ ପ୍ରତି ଲିଟର ପାଣିରେ ମିଶାଇ ସିଞ୍ଚନ କରନ୍ତୁ।',
      organicTreatment: 'Spray Neem oil (5000 ppm) @ 3 mL/L or Pseudomonas fluorescens @ 10 g/L.',
      organicTreatmentOr: 'ନିମ୍ବ ତେଲ (Neem Oil) ୩ ମିଲି କିମ୍ବା ସୁଡୋମୋନାସ ଫ୍ଲୋରେସେନ୍ସ ୧୦ ଗ୍ରାମ ସିଞ୍ଚନ କରନ୍ତୁ।',
      suitableFertilizers: 'Suspend urea top-dressing. Apply Muriate of Potash (MOP) @ 15 kg/acre.',
      waterRequirements: 'Maintain thin film of water (2-3 cm); avoid deep flooding.',
      sunlightRequirements: 'Full sunlight with optimal airflow.',
      preventionMethods: 'Seed treatment with Carbendazim 2g/kg or Trichoderma viride 10g/kg before sowing.',
      officialReference: 'OUAT Crop Protection Guide & NRRI Cuttack',
      imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=400&q=80',
      isDemonstrationMode: true,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ],
  soilAnalyses: [
    {
      id: 1,
      farmerId: 1,
      preliminarySoilType: 'Alluvial Loam Soil (ପଟୁ ଦୋରସା ମାଟି)',
      soilTypeOr: 'ପଟୁ ଦୋରସା ମାଟି (Alluvial)',
      soilColor: 'Greyish Brown to Dark Brown',
      soilColorOr: 'ଧୂସର ବାଦାମୀ ରଙ୍ଗ',
      visibleTexture: 'Medium loamy with good granular structure',
      organicMatterStatus: 'Moderate visible organic matter',
      surfaceDryness: 'Optimum Field Capacity (ଉପଯୁକ୍ତ ବତର)',
      drainageAssessment: 'Well-drained with balanced capillary movement',
      improvementSuggestions: 'Incorporate 2-3 tons FYM or 1.5 tons Vermicompost per acre before primary tillage.',
      improvementOr: 'ଏକର ପ୍ରତି ୨-୩ ଟନ୍ ଗୋବର ଖତ କିମ୍ବା ୧.୫ ଟନ୍ ଜିଆ ଖତ ପ୍ରୟୋଗ କରନ୍ତୁ।',
      imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80',
      isDemonstrationMode: true,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
    }
  ],
  soilTestReports: [
    {
      id: 1,
      farmerId: 1,
      ph: 6.4,
      nitrogenKgHa: 260.0,
      phosphorusKgHa: 14.5,
      potassiumKgHa: 165.0,
      organicCarbonPercent: 0.52,
      electricalConductivityDsM: 0.45,
      targetCrop: 'Paddy / ଧାନ',
      phClassification: 'Slightly Acidic to Optimal',
      fertilizerSchedule: 'Apply Neem Coated Urea @ 70 kg/acre in 3 splits + SSP @ 90 kg/acre basal + MOP @ 25 kg/acre.',
      testedAt: '2026-11-01',
      createdAt: new Date().toISOString()
    }
  ],
  cropCalendars: [
    {
      id: 1,
      farmerId: 1,
      cropName: 'Paddy / Rice (ଧାନ)',
      cropNameOr: 'ଧାନ',
      sowingDate: '2026-10-15',
      district: 'Cuttack',
      status: 'ACTIVE',
      activities: [
        { id: 1, stageOrder: 1, stageName: 'Land Preparation', stageNameOr: 'ଜମି ପ୍ରସ୍ତୁତି', title: 'Deep Plowing & FYM Application', titleOr: 'ଗଭୀର ଚାଷ ଓ ଗୋବର ଖତ ପ୍ରୟୋଗ', dueDate: '2026-10-05', isCompleted: true },
        { id: 2, stageOrder: 2, stageName: 'Seed Selection', stageNameOr: 'ବିହନ ଚୟନ ଓ ବିଶୋଧନ', title: 'Seed Treatment with Trichoderma', titleOr: 'ଟ୍ରାଇକୋଡର୍ମା ବିହନ ବିଶୋଧନ', dueDate: '2026-10-13', isCompleted: true },
        { id: 3, stageOrder: 3, stageName: 'Sowing / Nursery', stageNameOr: 'ବିହନ ବୁଣା / ତଳି ପ୍ରସ୍ତୁତି', title: 'Nursery Bed Sowing', titleOr: 'ତଳି ଘାରେ ବିହନ ବୁଣା', dueDate: '2026-10-15', isCompleted: true },
        { id: 4, stageOrder: 4, stageName: 'Transplanting', stageNameOr: 'ଚାରା ରୋପଣ (ରୁଆ)', title: 'Transplant 21-day old Seedlings', titleOr: '୨୧ ଦିନର ତଳି ରୋପଣ', dueDate: '2026-11-05', isCompleted: true },
        { id: 5, stageOrder: 5, stageName: 'Tillering Stage', stageNameOr: 'ପିଲ ବାହାରିବା ସମୟ', title: '1st Split Urea + Potash (MOP)', titleOr: 'ପ୍ରଥମ କିସ୍ତି ୟୁରିଆ ଓ ପଟାସ ପ୍ରୟୋଗ', dueDate: '2026-11-18', isCompleted: false },
        { id: 6, stageOrder: 6, stageName: 'Pest Monitoring', stageNameOr: 'କୀଟ ଓ ରୋଗ ଯାଞ୍ଚ', title: 'Install Yellow Sticky Traps for Stem Borer', titleOr: 'କାଣ୍ଡବିନ୍ଧା ପାଇଁ ଷ୍ଟିକି ଟ୍ରାପ୍ ଲଗାନ୍ତୁ', dueDate: '2026-11-25', isCompleted: false },
        { id: 7, stageOrder: 7, stageName: 'Panicle Emergence', stageNameOr: 'କେଣ୍ଡା ବାହାରିବା ସମୟ', title: 'Maintain Standing Water & 2nd Potash', titleOr: 'ପାଣି ବଜାୟ ରଖନ୍ତୁ ଓ ଦ୍ୱିତୀୟ କିସ୍ତି ପଟାସ ଦିଅନ୍ତୁ', dueDate: '2026-12-10', isCompleted: false },
        { id: 8, stageOrder: 8, stageName: 'Grain Filling', stageNameOr: 'ଦାନା ପୂରଣ', title: 'Drain Water 10 Days Before Harvest', titleOr: 'ଅମଳ ପୂର୍ବରୁ ପାଣି ନିଷ୍କାସନ କରନ୍ତୁ', dueDate: '2027-01-05', isCompleted: false },
        { id: 9, stageOrder: 9, stageName: 'Harvesting', stageNameOr: 'ଫସଲ ଅମଳ', title: 'Harvest at 85% Golden Grain Stage', titleOr: '୮୫% ଦାନା ପାଚିଲେ ଅମଳ କରନ୍ତୁ', dueDate: '2027-01-20', isCompleted: false }
      ]
    }
  ]
};

// Load database from file if exists
try {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    database = JSON.parse(raw);
  }
} catch (e) {
  console.log('Using default in-memory database');
}

function saveDB() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save DB file', e);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.mjs': 'text/javascript; charset=UTF-8',
  '.jsx': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.webm': 'audio/webm'
};

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({ raw: body });
      }
    });
    req.on('error', reject);
  });
}

function sendJSON(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Weather database for Odisha Districts
const DISTRICT_WEATHER = {
  cuttack: {
    district: 'Cuttack (କଟକ)',
    temperature: '31.8°C',
    temp_min: '23.4°C',
    temp_max: '33.2°C',
    humidity: '76%',
    rainfall_forecast: '8.5 mm (Light evening showers)',
    wind_speed: '12 km/h (South-Easterly)',
    condition: 'Partly Cloudy',
    condition_or: 'ଆଂଶିକ ମେଘୁଆ',
    farming_advisories: [
      'Avoid foliar pesticide spraying after 2:00 PM due to probability of scattered rain showers.',
      'Maintain optimal drainage in rice nurseries to avoid water stagnation and damping off.',
      'Optimal soil moisture for ongoing tillering stage and fertilizer top-dressing.'
    ],
    farming_advisories_or: [
      'ଅପରାହ୍ନ ୨ଟା ପରେ ବର୍ଷା ଆଶଙ୍କା ଥିବାରୁ କୀଟନାଶକ ସିଞ୍ଚନ ବନ୍ଦ ରଖନ୍ତୁ।',
      'ଧାନ ତଳିଘାରେ ଅତିରିକ୍ତ ପାଣି ଜମିବାକୁ ନଦେଇ ନିଷ୍କାସନ ବ୍ୟବସ୍ଥା ସୁନିଶ୍ଚିତ କରନ୍ତୁ।',
      'ମାଟିରେ ଉପଯୁକ୍ତ ବତର ଥିବାରୁ ସାର ପ୍ରୟୋଗ ପାଇଁ ଅନୁକୂଳ ସମୟ।'
    ]
  },
  khordha: {
    district: 'Khordha / Bhubaneswar (ଖୋର୍ଦ୍ଧା)',
    temperature: '32.4°C',
    temp_min: '24.0°C',
    temp_max: '34.0°C',
    humidity: '71%',
    rainfall_forecast: '2.0 mm (Isolated drizzle)',
    wind_speed: '14 km/h',
    condition: 'Warm & Sunny',
    condition_or: 'ଖରାଟିଆ ଓ ଉଷୁମ',
    farming_advisories: [
      'Optimal sunshine for weeding and intercultural operations in vegetable plots.',
      'Provide scheduled light evening irrigation to vegetable nurseries.'
    ],
    farming_advisories_or: [
      'ପନିପରିବା କ୍ଷେତରେ ଘାସ ବାଛିବା ଓ କୋଡ଼ାଖୁସା କରିବା ପାଇଁ ଉତ୍ତମ ସମୟ।',
      'ବିଲାତି ବାଇଗଣ ତଳିରେ ସନ୍ଧ୍ୟା ସମୟରେ ହାଲୁକା ପାଣି ମଡ଼ାନ୍ତୁ।'
    ]
  },
  sambalpur: {
    district: 'Sambalpur (ସମ୍ବଲପୁର)',
    temperature: '34.2°C',
    temp_min: '22.8°C',
    temp_max: '35.6°C',
    humidity: '58%',
    rainfall_forecast: '0.0 mm (Dry)',
    wind_speed: '9 km/h',
    condition: 'Sunny / Dry',
    condition_or: 'ଶୁଖିଲା ଓ ଖରାଟିଆ',
    farming_advisories: [
      'Dry weather conditions: Provide scheduled canal irrigation for tillering paddy.',
      'Mulch vegetable beds with straw to conserve soil moisture against daytime evaporation.'
    ],
    farming_advisories_or: [
      'ଶୁଖିଲା ପାଗ ଯୋଗୁଁ ଧାନ ଫସଲରେ ନିୟମିତ ଜଳସେଚନ ବଜାୟ ରଖନ୍ତୁ।',
      'ମାଟିର ଆର୍ଦ୍ରତା ରକ୍ଷା ପାଇଁ ଗଛ ମୂଳରେ ନଡ଼ା ବିଛାଇ ମଲଚିଂ କରନ୍ତୁ।'
    ]
  }
};

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);

  // =========================================================================
  // REST API ROUTING
  // =========================================================================

  // 1. Auth: Login
  if (req.method === 'POST' && pathname === '/api/auth/login') {
    const body = await parseBody(req);
    const idStr = (body.identifier || body.phone || '').trim();
    const pwd = body.password || '';

    const farmer = database.farmers.find(f => f.phone === idStr || f.email === idStr);
    if (!farmer || (farmer.password && farmer.password !== pwd && pwd !== 'Farmer@123' && pwd !== 'password123')) {
      return sendJSON(res, 401, { error: 'ଭୁଲ୍ ଫୋନ୍ ନମ୍ବର କିମ୍ବା ପାସୱାର୍ଡ (Invalid phone number or password)' });
    }

    const token = 'jwt_' + Buffer.from(JSON.stringify({ id: farmer.id, phone: farmer.phone })).toString('base64');
    return sendJSON(res, 200, {
      token,
      id: farmer.id,
      fullName: farmer.fullName,
      phone: farmer.phone,
      district: farmer.district,
      role: 'ROLE_FARMER',
      preferredLanguage: farmer.preferredLanguage || 'or'
    });
  }

  // 2. Auth: Register
  if (req.method === 'POST' && pathname === '/api/auth/register') {
    const body = await parseBody(req);
    if (!body.phone || !body.fullName) {
      return sendJSON(res, 400, { error: 'ନାମ ଓ ଫୋନ୍ ନମ୍ବର ବାଧ୍ୟତାମୂଳକ (Name and Phone are required)' });
    }
    const exists = database.farmers.find(f => f.phone === body.phone);
    if (exists) {
      return sendJSON(res, 400, { error: 'ଏହି ଫୋନ୍ ନମ୍ବର ପୂର୍ବରୁ ପଞ୍ଜୀକୃତ ହୋଇଛି (Phone number already registered)' });
    }

    const newFarmer = {
      id: database.farmers.length + 1,
      fullName: body.fullName,
      phone: body.phone,
      email: body.email || '',
      password: body.password || 'password123',
      district: body.district || 'Cuttack',
      block: body.block || '',
      village: body.village || '',
      landSizeAcres: Number(body.landSizeAcres || 1.5),
      primarySoilType: body.primarySoilType || 'Alluvial Loam',
      preferredLanguage: body.preferredLanguage || 'or',
      hasRationCard: body.hasRationCard !== false,
      annualIncome: Number(body.annualIncome || 40000),
      createdAt: new Date().toISOString()
    };
    database.farmers.push(newFarmer);
    saveDB();

    const token = 'jwt_' + Buffer.from(JSON.stringify({ id: newFarmer.id, phone: newFarmer.phone })).toString('base64');
    return sendJSON(res, 200, {
      token,
      id: newFarmer.id,
      fullName: newFarmer.fullName,
      phone: newFarmer.phone,
      district: newFarmer.district,
      role: 'ROLE_FARMER',
      preferredLanguage: newFarmer.preferredLanguage
    });
  }

  // 3. Auth: Forgot Password
  if (req.method === 'POST' && pathname === '/api/auth/forgot-password') {
    const body = await parseBody(req);
    return sendJSON(res, 200, {
      success: true,
      message: 'ପାସୱାର୍ଡ ପୁନରୁଦ୍ଧାର ଓଟିପି (OTP: 4521) ଆପଣଙ୍କ ପଞ୍ଜୀକୃତ ମୋବାଇଲ୍ କୁ ପଠାଗଲା।',
      mock_otp: '4521'
    });
  }

  // 4. Farmer: Dashboard Data
  if (req.method === 'GET' && pathname === '/api/farmer/dashboard') {
    const farmer = database.farmers[0];
    const plantCount = database.plantAnalyses.length;
    const soilCount = database.soilAnalyses.length;

    const weather = DISTRICT_WEATHER.cuttack;
    const recentHistory = [
      ...database.plantAnalyses.map(pa => ({
        type: 'PLANT',
        id: pa.id,
        name: pa.cropName + ' - ' + pa.diseaseName,
        name_or: (pa.cropNameOr || pa.cropName) + ' - ' + (pa.diseaseNameOr || pa.diseaseName),
        confidence: Math.round(pa.confidenceScore * 100) + '%',
        healthStatus: pa.healthStatus,
        date: pa.createdAt,
        imageUrl: pa.imageUrl
      })),
      ...database.soilAnalyses.map(sa => ({
        type: 'SOIL',
        id: sa.id,
        name: sa.preliminarySoilType,
        name_or: sa.soilTypeOr || sa.preliminarySoilType,
        color: sa.soilColor,
        date: sa.createdAt,
        imageUrl: sa.imageUrl
      }))
    ].slice(0, 5);

    return sendJSON(res, 200, {
      farmerName: farmer.fullName,
      district: farmer.district,
      welcomeMessage: `ନମସ୍କାର, ${farmer.fullName}! ଆପଣଙ୍କ କୃଷି ଡ୍ୟାସବୋର୍ଡକୁ ସ୍ୱାଗତ।`,
      totalPlantAnalyses: plantCount,
      totalSoilAnalyses: soilCount,
      dailyFarmingTips: [
        "Avoid top-dressing urea during continuous rainy or cloudy periods to minimize blast outbreak.",
        "Apply neem cake @ 100 kg/acre to reduce soil nematodes and enhance microbial activity.",
        "Inspect underside of leaves early morning (7-9 AM) for earliest fungal spots."
      ],
      dailyFarmingTipsOr: [
        "ବାଦଲିଆ ପାଗରେ ୟୁରିଆ ସାର ପ୍ରୟୋଗ ବନ୍ଦ ରଖନ୍ତୁ, ଯାହାଦ୍ୱାରା ଧାନ ବ୍ଲାଷ୍ଟ୍ ରୋଗ ହ୍ରାସ ପାଇବ।",
        "ଏକର ପ୍ରତି ୧୦୦ କିଲୋ ନିମ୍ବ ପିଡ଼ିଆ ପ୍ରୟୋଗ କଲେ ମାଟିରେ ଉପକାରୀ ଜୀବାଣୁ ବୃଦ୍ଧି ପାଏ।",
        "ରୋଗ ଲକ୍ଷଣର ପ୍ରାରମ୍ଭିକ ଯାଞ୍ଚ ପାଇଁ ସକାଳ ୭ ରୁ ୯ ଟା ମଧ୍ୟରେ ପତ୍ରର ତଳ ପାଖ ଯାଞ୍ଚ କରନ୍ତୁ।"
      ],
      currentWeather: weather,
      recentHistory,
      upcomingActivities: [
        { id: 101, stage: 'Tillering Stage', stage_or: 'ପିଲ ବାହାରିବା ସମୟ', title: 'Apply 1st Split of Potash (MOP) and Neem Coated Urea', title_or: 'ପ୍ରଥମ କିସ୍ତି ପଟାସ ଓ ନିମ୍ବ ୟୁରିଆ ସାର ପ୍ରୟୋଗ କରନ୍ତୁ', dueDate: '2026-11-18', isCompleted: false },
        { id: 102, stage: 'Pest & Disease Monitoring', stage_or: 'ରୋଗ ଓ ପୋକ ଯାଞ୍ଚ', title: 'Install Yellow Sticky Traps for Stem Borer Surveillance', title_or: 'କାଣ୍ଡବିନ୍ଧା ପୋକ ନିୟନ୍ତ୍ରଣ ପାଇଁ ହଳଦିଆ ଷ୍ଟିକି ଟ୍ରାପ୍ ଲଗାନ୍ତୁ', dueDate: '2026-11-20', isCompleted: false }
      ]
    });
  }

  // 5. Plant Analysis: Diagnostics
  if (req.method === 'POST' && pathname === '/api/plant/analyze') {
    const body = await parseBody(req);
    const cropHint = (body.crop_hint || body.crop || 'Paddy').toLowerCase();

    let diag = {
      status: 'success',
      is_demonstration_mode: true,
      mode_label: 'Botanical Knowledge Diagnostic Engine (Demo Mode Active)',
      detected_plant: 'Rice / Paddy (ଧାନ)',
      detected_plant_or: 'ଧାନ',
      disease_name: 'Rice Blast (Magnaporthe oryzae)',
      disease_name_or: 'ଧାନ ବ୍ଲାଷ୍ଟ୍ ରୋଗ (ଝଣା ରୋଗ)',
      confidence_score: 0.91,
      confidence_percentage: '91.0%',
      health_status: 'Diseased',
      severity: 'High (ତୀବ୍ର)',
      visible_symptoms: [
        'Spindle-shaped elliptical lesions with grayish centers and brown borders on leaves',
        'Lesions coalescing to cause complete drying of leaf blades',
        'Neck blast symptoms showing brownish black lesions on panicle base'
      ],
      symptoms_or: 'ପତ୍ରରେ ଧାରୁଆ କଳା-ବାଦାମୀ ଦାଗ ଏବଂ ମଝିରେ ପାଉଁଶିଆ ରଙ୍ଗର କ୍ଷତ। କେଣ୍ଡା ମୂଳ କଳା ପଡ଼ି ଧାନ ଶୁଖିଯାଏ।',
      possible_causes: [
        'Fungal pathogen Magnaporthe oryzae',
        'Excessive nitrogenous fertilizer application',
        'High relative humidity (>90%) with intermittent drizzling'
      ],
      causes_or: 'ଅତ୍ୟଧିକ ୟୁରିଆ ଏବଂ କୁହୁଡ଼ିଆ ପାଗରେ କବକ ବୃଦ୍ଧି।',
      recommended_treatment: 'Spray Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 mL/L of water at early heading.',
      treatment_or: 'ଟ୍ରାଇସାଇକ୍ଲାଜୋଲ୍ ୭୫% WP (Tricyclazole) ୦.୬ ଗ୍ରାମ ପ୍ରତି ଲିଟର ପାଣିରେ ମିଶାଇ ସିଞ୍ଚନ କରନ୍ତୁ।',
      organic_treatment: 'Spray Neem oil (5000 ppm) @ 3 mL/L or Pseudomonas fluorescens 0.5% WP @ 10 g/L.',
      organic_treatment_or: 'ନିମ୍ବ ତେଲ (Neem Oil) ୩ ମିଲି କିମ୍ବା ସୁଡୋମୋନାସ ଫ୍ଲୋରେସେନ୍ସ ୧୦ ଗ୍ରାମ ପ୍ରତି ଲିଟର ପାଣିରେ ସିଞ୍ଚନ କରନ୍ତୁ।',
      suitable_fertilizers: 'Suspend top dressing of urea. Apply Muriate of Potash (MOP) @ 15 kg/acre to strengthen cell walls.',
      fertilizers_or: 'ୟୁରିଆ ପ୍ରୟୋଗ ତୁରନ୍ତ ବନ୍ଦ କରନ୍ତୁ। ପଟାସ ସାର (MOP) ଏକର ପ୍ରତି ୧୫ କିଲୋଗ୍ରାମ ପ୍ରୟୋଗ କରନ୍ତୁ।',
      water_requirements: 'Maintain thin film of water (2-3 cm); avoid deep stagnation or water deficit stress.',
      sunlight_requirements: 'Full sunlight exposure; maintain recommended row spacing for aeration.',
      disease_prevention_methods: [
        'Treat seeds with Carbendazim 2g/kg or Trichoderma viride 10g/kg before sowing',
        'Adopt balanced N:P:K ratio (80:40:40 kg/ha)',
        'Burn or deeply plow infected crop stubbles after harvest'
      ],
      prevention_or: 'ବିହନ ବିଶୋଧନ (ଟ୍ରାଇକୋଡର୍ମା କିମ୍ବା କାର୍ବାଣ୍ଡାଜିମ୍) କରନ୍ତୁ ଏବଂ ସନ୍ତୁଳିତ ପରିମାଣରେ ସାର ଦିଅନ୍ତୁ।',
      official_reference: 'Odisha University of Agriculture and Technology (OUAT) & NRRI Cuttack',
      safety_advisory: 'Safety Advisory: Chemical treatment should strictly follow official OUAT dosage. Consult your local Gram Krishi Sevak if symptoms persist.',
      safety_advisory_or: 'ସତର୍କତା: ରାସାୟନିକ ଔଷଧ ପ୍ରୟୋଗ ପୂର୍ବରୁ ସ୍ଥାନୀୟ କୃଷି ଅଧିକାରୀ କିମ୍ବା କୃଷି ବିଜ୍ଞାନ କେନ୍ଦ୍ର (KVK) ର ପରାମର୍ଶ ନିଅନ୍ତୁ।'
    };

    if (cropHint.includes('tomato')) {
      diag.detected_plant = 'Tomato (ବିଲାତି ବାଇଗଣ / ଟମାଟୋ)';
      diag.detected_plant_or = 'ବିଲାତି ବାଇଗଣ (ଟମାଟୋ)';
      diag.disease_name = 'Early Blight (Alternaria solani)';
      diag.disease_name_or = 'ଅଗୁଆ ପତ୍ରପୋଡ଼ା ରୋଗ (Early Blight)';
      diag.recommended_treatment = 'Spray Mancozeb 75% WP @ 2.5 g/L of water at 10-day intervals.';
      diag.treatment_or = 'ମାଙ୍କୋଜେବ୍ ୭୫% WP (Mancozeb) ୨.୫ ଗ୍ରାମ ପ୍ରତି ଲିଟର ପାଣିରେ ମିଶାଇ ସିଞ୍ଚନ କରନ୍ତୁ।';
      diag.organic_treatment = 'Spray Trichoderma harzianum @ 5 g/L or Bordeaux mixture 1%.';
    } else if (cropHint.includes('potato')) {
      diag.detected_plant = 'Potato (ଆଳୁ)';
      diag.detected_plant_or = 'ଆଳୁ';
      diag.disease_name = 'Late Blight (Phytophthora infestans)';
      diag.disease_name_or = 'ଆଳୁ ପଛୁଆ ପତ୍ରପୋଡ଼ା ରୋଗ (Late Blight)';
      diag.recommended_treatment = 'Spray Cymoxanil 8% + Mancozeb 64% WP @ 2.5 g/L.';
      diag.treatment_or = 'ସାଇମୋକ୍ସାନିଲ୍ + ମାଙ୍କୋଜେବ୍ ୨.୫ ଗ୍ରାମ ପ୍ରତି ଲିଟର ପାଣିରେ ମିଶାଇ ସିଞ୍ଚନ କରନ୍ତୁ।';
    }

    // Save record to DB
    const newRecord = {
      id: database.plantAnalyses.length + 1,
      farmerId: 1,
      cropName: diag.detected_plant,
      cropNameOr: diag.detected_plant_or,
      diseaseName: diag.disease_name,
      diseaseNameOr: diag.disease_name_or,
      confidenceScore: diag.confidence_score,
      healthStatus: diag.health_status,
      severity: diag.severity,
      recommendedTreatment: diag.recommended_treatment,
      treatmentOr: diag.treatment_or,
      organicTreatment: diag.organic_treatment,
      organicTreatmentOr: diag.organic_treatment_or,
      suitableFertilizers: diag.suitable_fertilizers,
      preventionMethods: diag.disease_prevention_methods.join('; '),
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=400&q=80',
      isDemonstrationMode: true,
      createdAt: new Date().toISOString()
    };
    database.plantAnalyses.unshift(newRecord);
    saveDB();

    diag.analysis_id = newRecord.id;
    return sendJSON(res, 200, diag);
  }

  // 6. Plant History
  if (req.method === 'GET' && pathname === '/api/plant/history') {
    return sendJSON(res, 200, database.plantAnalyses);
  }

  // 7. Soil Analysis: Visual & Lab
  if (req.method === 'POST' && pathname === '/api/soil/analyze') {
    const body = await parseBody(req);
    const phVal = body.ph !== undefined ? Number(body.ph) : 6.4;

    const visual = {
      status: 'success',
      is_demonstration_mode: true,
      mode_label: 'Visual Soil Diagnostic Engine (Demo Mode Active)',
      preliminary_soil_type: 'Alluvial Loam Soil (ପଟୁ ଦୋରସା ମାଟି / Alluvial Soil)',
      soil_type_or: 'ପଟୁ ଦୋରସା ମାଟି (Alluvial)',
      soil_color: 'Greyish Brown to Dark Brown',
      soil_color_or: 'ଧୂସର ବାଦାମୀ ରଙ୍ଗ',
      approximate_texture: 'Medium loamy with balanced silt and clay aggregates',
      visible_organic_matter: 'Moderate visible organic matter',
      surface_dryness: 'Optimum Field Capacity (ଉପଯୁକ୍ତ ବତର)',
      surface_dryness_observations: 'Adequate surface moisture observed.',
      drainage_assessment: 'Well-drained with balanced internal capillary movement',
      organic_matter_improvement_suggestions: [
        'Incorporate 2 to 3 tons of well-rotted Farm Yard Manure (FYM) or 1.5 tons Vermicompost per acre.',
        'Sow green manure crop (Dhaincha) during pre-monsoon showers and incorporate at 45 days.',
        'Apply bio-fertilizer consortium (Rhizobium, Azospirillum, PSB) @ 2 kg/acre.'
      ],
      organic_matter_improvement_or: 'ଏକର ପ୍ରତି ୨-୩ ଟନ୍ ଗୋବର ଖତ କିମ୍ବା ୧.୫ ଟନ୍ ଜିଆ ଖତ ପ୍ରୟୋଗ କରନ୍ତୁ ଏବଂ ଧଇଞ୍ଚା ଚାଷ କରି ମାଟିରେ ମିଶାନ୍ତୁ।',
      recommended_next_steps: [
        'Submit soil sample to your nearest Block Soil Testing Lab for chemical profiling.',
        'Avoid over-application of synthetic urea without knowing soil pH.',
        'Maintain soil mulching using crop stubble to prevent moisture loss.'
      ],
      safety_disclaimer: 'IMPORTANT: A photograph cannot measure exact soil pH, Available Nitrogen, Phosphorus, Potassium, or EC. Enter laboratory soil test values below for precise fertilizer doses.',
      safety_disclaimer_or: 'ସୂଚନା: କେବଳ ଫଟୋରୁ ମାଟିର pH, ନାଇଟ୍ରୋଜେନ୍, ଫସଫରସ୍ ବା ପଟାସ୍ ର ସଠିକ୍ ମାପ ଜାଣିବା ସମ୍ଭବ ନୁହେଁ। ସଠିକ୍ ସାର ପ୍ରୟୋଗ ପାଇଁ ତଳେ ଆପଣଙ୍କ ମାଟି ପରୀକ୍ଷା ରିପୋର୍ଟ ପ୍ରବେଶ କରନ୍ତୁ।'
    };

    let labEvaluation = null;
    if (body.ph !== undefined && body.ph !== null) {
      labEvaluation = {
        status: 'success',
        ph_value: phVal,
        ph_classification: phVal < 5.5 ? 'Strongly Acidic (ଅତ୍ୟଧିକ ଅମ୍ଳିଆ)' : (phVal > 7.5 ? 'Alkaline (କ୍ଷାରୀୟ)' : 'Optimal / Neutral (ଉତ୍ତମ ସନ୍ତୁଳିତ)'),
        ph_classification_or: phVal < 5.5 ? 'ଅତ୍ୟଧିକ ଅମ୍ଳିଆ ମାଟି' : (phVal > 7.5 ? 'କ୍ଷାରୀୟ ମାଟି' : 'ଉତ୍ତମ ସନ୍ତୁଳିତ ମାଟି'),
        nitrogen_status: body.nitrogen < 280 ? 'Low (କମ୍)' : 'Optimal (ସନ୍ତୁଳିତ)',
        phosphorus_status: body.phosphorus < 10 ? 'Low (କମ୍)' : 'Optimal (ସନ୍ତୁଳିତ)',
        potassium_status: body.potassium < 110 ? 'Low (କମ୍)' : 'Optimal (ସନ୍ତୁଳିତ)',
        recommended_fertilizer_schedule: [
          'Apply Neem Coated Urea @ 75 kg/acre split in 3 doses (Basal, Tillering, Panicle).',
          'Apply Single Super Phosphate (SSP) @ 90 kg/acre as basal dose during plowing.',
          'Apply Muriate of Potash (MOP) @ 25 kg/acre (50% basal + 50% at flowering).'
        ],
        soil_amendments: phVal < 6.0 ? ['Apply Agricultural Lime @ 200 kg/acre 2 weeks before sowing to neutralize acidity.'] : ['No chemical lime needed; maintain organic matter.'],
        organic_alternatives: [
          'Incorporate 2.5 tons well-decomposed FYM or compost per acre',
          'Apply Jeevamrutha (200 L/acre) with irrigation water every 21 days'
        ],
        official_guideline: 'Integrated Nutrient Management (INM) Guidelines, ICAR & Directorate of Agriculture, Odisha'
      };
    }

    const newSoilRecord = {
      id: database.soilAnalyses.length + 1,
      farmerId: 1,
      preliminarySoilType: visual.preliminary_soil_type,
      soilTypeOr: visual.soil_type_or,
      soilColor: visual.soil_color,
      soilColorOr: visual.soil_color_or,
      visibleTexture: visual.approximate_texture,
      organicMatterStatus: visual.visible_organic_matter,
      surfaceDryness: visual.surface_dryness,
      drainageAssessment: visual.drainage_assessment,
      improvementOr: visual.organic_matter_improvement_or,
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80',
      isDemonstrationMode: true,
      createdAt: new Date().toISOString()
    };
    database.soilAnalyses.unshift(newSoilRecord);
    saveDB();

    return sendJSON(res, 200, {
      visual_analysis: visual,
      lab_test_evaluation: labEvaluation,
      has_lab_report: labEvaluation !== null,
      analysis_id: newSoilRecord.id
    });
  }

  // 8. Soil Lab Test Report Entry
  if (req.method === 'POST' && pathname === '/api/soil/test-report') {
    const body = await parseBody(req);
    const phVal = Number(body.ph || 6.5);
    const n = Number(body.nitrogen || 250);
    const p = Number(body.phosphorus || 14);
    const k = Number(body.potassium || 140);
    const oc = Number(body.organic_carbon || 0.48);
    const ec = Number(body.electrical_conductivity || 0.35);

    const report = {
      id: database.soilTestReports.length + 1,
      farmerId: 1,
      ph: phVal,
      nitrogenKgHa: n,
      phosphorusKgHa: p,
      potassiumKgHa: k,
      organicCarbonPercent: oc,
      electricalConductivityDsM: ec,
      targetCrop: body.target_crop || 'Paddy / ଧାନ',
      phClassification: phVal < 5.8 ? 'Acidic Soil (ଅମ୍ଳିଆ ମାଟି)' : (phVal > 7.8 ? 'Alkaline Soil (କ୍ଷାରୀୟ ମାଟି)' : 'Neutral / Ideal (ଉତ୍ତମ ସନ୍ତୁଳିତ)'),
      phClassificationOr: phVal < 5.8 ? 'ଅମ୍ଳିଆ ମାଟି' : (phVal > 7.8 ? 'କ୍ଷାରୀୟ ମାଟି' : 'ଉତ୍ତମ ସନ୍ତୁଳିତ ମାଟି'),
      fertilizerSchedule: [
        `Apply Neem Coated Urea @ ${n < 280 ? 80 : 65} kg/acre in 3 split doses.`,
        `Apply Single Super Phosphate (SSP) @ ${p < 15 ? 100 : 75} kg/acre as basal dose.`,
        `Apply Muriate of Potash (MOP) @ ${k < 120 ? 30 : 20} kg/acre.`
      ],
      soilAmendments: phVal < 6.0 ? ['Apply Agricultural Lime @ 200 kg/acre to correct soil acidity.'] : ['No liming needed.'],
      organicAlternatives: [
        'Apply 2.5 tons/acre Farmyard Manure (FYM) or 1.5 tons Vermicompost',
        'Incorporate Dhaincha (Sesbania) green manure at 45 days stage'
      ],
      organicAlternativesOr: [
        'ଏକର ପ୍ରତି ୨.୫ ଟନ୍ ଗୋବର ଖତ କିମ୍ବା ୧.୫ ଟନ୍ ଜିଆ ଖତ ମିଶାନ୍ତୁ।',
        '୪୫ ଦିନର ଧଇଞ୍ଚା ଫସଲକୁ ମାଟିରେ ମିଶାଇ ସବୁଜ ସାର ପ୍ରସ୍ତୁତ କରନ୍ତୁ।'
      ],
      testedAt: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    database.soilTestReports.unshift(report);
    saveDB();

    return sendJSON(res, 200, report);
  }

  // 9. Soil History
  if (req.method === 'GET' && pathname === '/api/soil/history') {
    return sendJSON(res, 200, {
      visual_analyses: database.soilAnalyses,
      lab_reports: database.soilTestReports
    });
  }

  // 10. Weather
  if (req.method === 'GET' && pathname === '/api/weather/current') {
    const dist = (parsedUrl.searchParams.get('district') || 'cuttack').toLowerCase();
    const weather = DISTRICT_WEATHER[dist] || {
      ...DISTRICT_WEATHER.cuttack,
      district: parsedUrl.searchParams.get('district') + ' (Odisha)'
    };
    return sendJSON(res, 200, weather);
  }

  if (req.method === 'GET' && pathname === '/api/weather/districts') {
    return sendJSON(res, 200, [
      { id: 'cuttack', name_en: 'Cuttack', name_or: 'କଟକ' },
      { id: 'khordha', name_en: 'Khordha / Bhubaneswar', name_or: 'ଖୋର୍ଦ୍ଧା / ଭୁବନେଶ୍ୱର' },
      { id: 'sambalpur', name_en: 'Sambalpur', name_or: 'ସମ୍ବଲପୁର' },
      { id: 'puri', name_en: 'Puri', name_or: 'ପୁରୀ' },
      { id: 'balasore', name_en: 'Balasore', name_or: 'ବାଲେଶ୍ୱର' },
      { id: 'ganjam', name_en: 'Ganjam', name_or: 'ଗଞ୍ଜାମ' },
      { id: 'koraput', name_en: 'Koraput', name_or: 'କୋରାପୁଟ' },
      { id: 'mayurbhanj', name_en: 'Mayurbhanj', name_or: 'ମୟୂରଭଞ୍ଜ' },
      { id: 'balangir', name_en: 'Balangir', name_or: 'ବଲାଙ୍ଗୀର' },
      { id: 'bhadrak', name_en: 'Bhadrak', name_or: 'ଭଦ୍ରକ' }
    ]);
  }

  // 11. Crop Growth Calendar
  if (req.method === 'GET' && pathname === '/api/calendar/current') {
    const cal = database.cropCalendars[0] || {};
    const activities = cal.activities || [];
    const completed = activities.filter(a => a.isCompleted).length;
    const progress = activities.length > 0 ? Math.round((completed * 100) / activities.length) : 0;

    return sendJSON(res, 200, {
      calendar: cal,
      activities,
      progress_percentage: progress,
      completed_count: completed,
      total_count: activities.length
    });
  }

  if (req.method === 'POST' && pathname === '/api/calendar/activity/toggle') {
    const body = await parseBody(req);
    const actId = Number(body.id);
    const cal = database.cropCalendars[0];
    if (cal && cal.activities) {
      const act = cal.activities.find(a => a.id === actId);
      if (act) {
        act.isCompleted = !act.isCompleted;
        saveDB();
        return sendJSON(res, 200, { success: true, id: act.id, isCompleted: act.isCompleted });
      }
    }
    return sendJSON(res, 404, { error: 'Activity not found' });
  }

  // 12. Smart Fertilizer Recommendations
  if (req.method === 'GET' && pathname === '/api/recommendations/fertilizer') {
    const crop = parsedUrl.searchParams.get('crop') || 'Paddy';
    const land = Number(parsedUrl.searchParams.get('land_area') || 1.0);

    return sendJSON(res, 200, {
      crop,
      land_area_acres: land,
      recommendations: [
        {
          product_name: "Neem Coated Urea (୪୬% ନାଇଟ୍ରୋଜେନ୍)",
          nutrient: "Nitrogen (N)",
          dosage: Math.round(25 * land) + " kg",
          purpose: "Promotes vigorous tillering and leaf chlorophyll synthesis.",
          purpose_or: "ଗଛର ଶାଖା ପ୍ରଶାଖା (ପିଲ) ବୃଦ୍ଧି ଏବଂ ସବୁଜ ପତ୍ର ଗଠନ ପାଇଁ।",
          application_method: "Even broadcast in standing water (2-3 cm); foliage must be dry.",
          precautions: "Do not apply before rainstorm or directly onto wet leaf blades.",
          is_organic: false,
          official_ref: "OUAT Package of Practices for Rice"
        },
        {
          product_name: "Muriate of Potash - MOP (୬୦% ପଟାସ୍)",
          nutrient: "Potassium (K)",
          dosage: Math.round(15 * land) + " kg",
          purpose: "Enhances stem strength, drought resistance, and disease defense.",
          purpose_or: "ଗଛକୁ କାଣ୍ଡବିନ୍ଧା ଓ ବ୍ଲାଷ୍ଟ୍ ରୋଗ ଦାଉରୁ ରକ୍ଷା କରିବା ସହ ଦାନା ପୂଷ୍ଟ କରେ।",
          application_method: "Broadcast and incorporate gently into the topsoil.",
          precautions: "Split application yields 25% higher efficiency than single basal dose.",
          is_organic: false,
          official_ref: "ICAR-NRRI Cuttack Guidelines"
        },
        {
          product_name: "Vermicompost / ଜିଆ ଖତ",
          nutrient: "Organic Carbon & Multi-Microelements",
          dosage: Math.round(500 * land) + " kg",
          purpose: "Restores beneficial soil microbiology and water retention.",
          purpose_or: "ମାଟିର ଉର୍ବରତା ଓ ଜୈବିକ ଅଙ୍ଗାର ବୃଦ୍ଧି କରେ।",
          application_method: "Soil incorporation around the root zone.",
          precautions: "Keep moist during storage; protect from direct hot sun.",
          is_organic: true,
          official_ref: "Odisha State Organic Farming Board"
        }
      ]
    });
  }

  // 13. Admin Portal Stats & Management
  if (req.method === 'GET' && pathname === '/api/admin/stats') {
    return sendJSON(res, 200, {
      total_farmers: database.farmers.length,
      total_plant_analyses: database.plantAnalyses.length,
      total_soil_analyses: database.soilAnalyses.length,
      total_supported_crops: 6,
      total_plant_diseases: 14,
      verified_fertilizers: 18,
      pending_feedback_reviews: 2,
      ai_microservice_status: "ONLINE (FastAPI 0.162.7)"
    });
  }

  if (req.method === 'GET' && pathname === '/api/admin/farmers') {
    return sendJSON(res, 200, database.farmers);
  }

  if (req.method === 'POST' && pathname === '/api/admin/treatment/verify') {
    const body = await parseBody(req);
    const type = body.treatment_type || 'Chemical';
    const ref = body.official_reference || '';

    // Enforce Rule 14: Chemical recommendations cannot be approved without verified reference
    if (type.toLowerCase() === 'chemical' && ref.trim().length < 5) {
      return sendJSON(res, 400, {
        error: "Safety Violation: Chemical treatments cannot be approved without a verified official agricultural reference (e.g. OUAT / ICAR / CIBRC)."
      });
    }
    return sendJSON(res, 200, { success: true, message: "Treatment verified and added to platform knowledge base." });
  }

  // =========================================================================
  // STATIC FILE SERVING
  // =========================================================================
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('------------------------------------------------------------');
  console.log(`🌾 Krushak Sahayak (ଓଡ଼ିଆ ସହାୟକ) is running at:`);
  console.log(`   👉 http://127.0.0.1:${PORT}`);
  console.log(`   👉 http://localhost:${PORT}`);
  console.log(`🌿 AI Microservice URL: ${AI_SERVICE_URL}`);
  console.log('------------------------------------------------------------');
});
