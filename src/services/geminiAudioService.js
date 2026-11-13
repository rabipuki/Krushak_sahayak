/**
 * geminiAudioService.js - Odia Speech Understanding Service
 * Sends native audio directly to Gemini 2.5 Flash REST API to extract
 * farmer demographics (age, occupation, income, has_ration_card).
 */

/**
 * Converts a Blob to a raw base64 string
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      const base64 = dataUrl.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Native Odia voice processing function using Gemini 2.5 Flash REST API.
 * 
 * @param {Blob} audioBlob - The recorded audio blob from MediaRecorder
 * @returns {Promise<{
 *   age: number,
 *   occupation: string,
 *   income: number,
 *   has_ration_card: boolean,
 *   transcript_odia?: string
 * }>}
 */
export async function processOdiaAudio(audioBlob) {
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || '';

  // If no API key is configured yet in .env, gracefully fallback to mock with a clear console notice
  if (!apiKey) {
    console.warn("⚠️ VITE_GEMINI_API_KEY is not defined. Using mock fallback after 2 seconds.");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      age: 55,
      occupation: "Farmer",
      income: 40000,
      has_ration_card: true,
      transcript_odia: "ମୋ ବୟସ ୫୫ ବର୍ଷ, ମୁଁ ଜଣେ ଚାଷୀ, ବାର୍ଷିକ ଆୟ ୪୦,୦୦୦ ଟଙ୍କା ଏବଂ ମୋର ରାସନ କାର୍ଡ ଅଛି।"
    };
  }

  // 1. Convert audio blob to base64
  const base64Audio = await blobToBase64(audioBlob);

  const promptText = `You are an expert Odia speech understanding AI for rural farmers in Odisha.
Listen to the provided Odia audio and extract the farmer's demographic details into a strict JSON object.
Return JSON ONLY, matching this schema:
{
  "age": number (integer age in years, or null if not stated),
  "occupation": string ("Farmer" | "Agricultural Labourer" | "Small Artisan" | "Self Employed" | "Other"),
  "income": number (annual household income in Indian Rupees, or null if not stated),
  "has_ration_card": boolean (true if mentioned having a ration/food card or BSKY card, false otherwise),
  "transcript_odia": string (verbatim transcription of the spoken Odia input)
}`;

  // 2. Call Gemini 2.5 Flash REST API
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText },
              {
                inlineData: {
                  mimeType: audioBlob.type || 'audio/webm',
                  data: base64Audio
                }
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Gemini 2.5 Flash API error:", response.status, errorBody);
    throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("No response text returned from Gemini 2.5 Flash API.");
  }

  const cleanedJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
  const parsedData = JSON.parse(cleanedJson);

  return {
    age: parsedData.age ? Number(parsedData.age) : 55,
    occupation: parsedData.occupation || 'Farmer',
    income: parsedData.income !== undefined && parsedData.income !== null ? Number(parsedData.income) : 40000,
    has_ration_card: Boolean(parsedData.has_ration_card),
    transcript_odia: parsedData.transcript_odia || "ଓଡ଼ିଆ ଭଏସ୍ ସଫଳତାର ସହ ବିଶ୍ଳେଷଣ ହେଲା।"
  };
}

export default processOdiaAudio;
