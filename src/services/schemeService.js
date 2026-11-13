/**
 * schemeService.js - Supabase Scheme Query & Eligibility Engine
 * 
 * Queries the Supabase 'schemes' table and filters results based on the farmer's 
 * demographic data (age, occupation, income, ration card status).
 */

import { supabase } from '../supabaseClient.js';
import { MOCK_SCHEMES } from '../data/mockSchemes.js';

/**
 * Fetch eligible schemes from Supabase database matching the user's profile.
 * Falls back to mock data (KALIA, BSKY) if Supabase is in stub/unconnected mode.
 * 
 * @param {{
 *   age: number,
 *   occupation: string,
 *   income: number,
 *   has_ration_card: boolean
 * }} userData
 * @returns {Promise<Array>} Array of eligible scheme objects
 */
export async function fetchEligibleSchemes(userData) {
  console.log("🔍 [Odia Sahayak] fetchEligibleSchemes initiated for:", userData);

  // Simulated latency for realistic tactile feel
  await new Promise((resolve) => setTimeout(resolve, 600));

  try {
    /**
     * Exact Supabase query pattern requested:
     * We query the 'schemes' table from Supabase:
     */
    const { data, error } = await supabase
      .from('schemes')
      .select('*')
      .lte('min_age', userData.age || 100)
      .gte('max_age', userData.age || 0);

    // If Supabase table exists and returned records:
    if (data && data.length > 0 && !error) {
      console.log("✅ Fetched live schemes from Supabase:", data.length);
      return filterSchemesByEligibility(data, userData);
    }
  } catch (err) {
    console.warn("⚠️ Supabase stub mode active (no live DB connection). Falling back to mock schemes.", err?.message);
  }

  // Fallback to MOCK_SCHEMES (guaranteed to show KALIA and BSKY as requested)
  return filterSchemesByEligibility(MOCK_SCHEMES, userData);
}

/**
 * Client-side eligibility rules matching farmer inputs to scheme criteria.
 * 
 * @param {Array} schemes 
 * @param {Object} userData 
 * @returns {Array} Filtered list of eligible schemes
 */
function filterSchemesByEligibility(schemes, userData) {
  const age = Number(userData.age) || 0;
  const income = Number(userData.income) || 0;
  const occupation = userData.occupation || 'Farmer';
  const hasRationCard = Boolean(userData.has_ration_card);

  return schemes.filter((scheme) => {
    const crit = scheme.eligibility_criteria;
    if (!crit) return true;

    // 1. Age check
    if (crit.min_age && age < crit.min_age) return false;
    if (crit.max_age && age > crit.max_age) return false;

    // 2. Max income check (if income is provided)
    if (crit.max_income && income > 0 && income > crit.max_income) return false;

    // 3. Occupation match
    if (crit.allowed_occupations && crit.allowed_occupations.length > 0) {
      const matchOcc = crit.allowed_occupations.some(
        (occ) => occ.toLowerCase() === occupation.toLowerCase()
      );
      if (!matchOcc) return false;
    }

    // 4. Ration card check
    if (crit.requires_ration_card && !hasRationCard) {
      return false;
    }

    return true;
  });
}

export default fetchEligibleSchemes;
