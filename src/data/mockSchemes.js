/**
 * mockSchemes.js - Odisha Government Schemes Data
 * Contains comprehensive details for key welfare and agriculture schemes in Odisha.
 */

export const MOCK_SCHEMES = [
  {
    id: "kalia",
    name_en: "KALIA Scheme",
    name_or: "କାଳିଆ ଯୋଜନା (KALIA)",
    fullName_en: "Krushak Assistance for Livelihood and Income Augmentation",
    fullName_or: "କୃଷକ ଆସିଷ୍ଟାନ୍ସ ଫର ଲାଇଭଲିହୁଡ୍ ଆଣ୍ଡ ଇନକମ୍ ଅଗମେଣ୍ଟେସନ୍",
    department_en: "Agriculture & Farmers' Empowerment, Govt. of Odisha",
    department_or: "କୃଷି ଓ କୃଷକ ସଶକ୍ତିକରଣ ବିଭାଗ, ଓଡ଼ିଶା ସରକାର",
    badge: "ଓଡ଼ିଶା ସରକାର / Govt. of Odisha",
    badgeColor: "bg-green-100 text-green-900 border-green-300",
    icon: "Wheat",
    targetAudience_en: "Small & Marginal Farmers, Landless Agricultural Labourers",
    targetAudience_or: "କ୍ଷୁଦ୍ର ଓ ନାମମାତ୍ର ଚାଷୀ ଏବଂ ଭୂମିହୀନ କୃଷି ଶ୍ରମିକ",
    description_en: "Comprehensive financial support package providing direct financial aid for cultivation, livelihood, and life insurance coverage to accelerate agricultural prosperity.",
    description_or: "ଚାଷ କାର୍ଯ୍ୟ ଏବଂ ଜୀବିକା ପାଇଁ ଆର୍ଥିକ ସହାୟତା, ବିନା ସୁଧରେ କୃଷି ଋଣ ଏବଂ ସାମାଜିକ ସୁରକ୍ଷା ପ୍ରଦାନ କରୁଥିବା ଓଡ଼ିଶା ସରକାରଙ୍କ ଏକ ଐତିହାସିକ ଯୋଜନା।",
    benefits_en: [
      "₹10,000 per family annually for small and marginal farmers",
      "₹12,500 financial grant for landless agricultural households for livestock and allied activities",
      "Crop loans up to ₹50,000 at 0% interest rate",
      "Life insurance cover of ₹2 Lakh and personal accident cover of ₹2 Lakh"
    ],
    benefits_or: [
      "କ୍ଷୁଦ୍ର ଓ ନାମମାତ୍ର ଚାଷୀ ପରିବାରଙ୍କୁ ବାର୍ଷିକ ₹୧୦,୦୦୦ ଆର୍ଥିକ ସହାୟତା",
      "ଭୂମିହୀନ କୃଷି ଶ୍ରମିକ ପରିବାରଙ୍କୁ ଛେଳି, କୁକୁଡ଼ା ଓ ଡାଏରୀ ପାଇଁ ₹୧୨,୫୦୦ ଅନୁଦାନ",
      "୦% ସୁଧ ହାରରେ ₹୫୦,୦୦୦ ପର୍ଯ୍ୟନ୍ତ କୃଷି ଋଣ ସୁବିଧା",
      "₹୨ ଲକ୍ଷ ଜୀବନ ବୀମା ଏବଂ ₹୨ ଲକ୍ଷ ଦୁର୍ଘଟଣା ବୀମା ସହାୟତା"
    ],
    eligibility_criteria: {
      min_age: 18,
      max_age: 80,
      max_income: 200000,
      allowed_occupations: ["Farmer", "Agricultural Labourer"],
      requires_ration_card: false
    },
    documents_en: ["Aadhaar Card", "Bank Passbook (Aadhaar linked)", "Ration Card (if available)", "Land Record / RoR"],
    documents_or: ["ଆଧାର କାର୍ଡ", "ବ୍ୟାଙ୍କ ପାସବୁକ୍ (ଆଧାର ସଂଲଗ୍ନ)", "ରାସନ କାର୍ଡ", "ଜମି ପଟ୍ଟା / RoR"],
    official_link: "https://kalia.odisha.gov.in",
    helpline: "1800-572-1122 / 1551",
    audioText_or: "କାଳିଆ ଯୋଜନା (KALIA): ଓଡ଼ିଶାର ଚାଷୀ ଏବଂ କୃଷି ଶ୍ରମିକଙ୍କ ପାଇଁ ବାର୍ଷିକ ଦଶ ହଜାର ଟଙ୍କା ସହାୟତା ଏବଂ ବିନା ସୁଧରେ କୃଷି ଋଣ ମିଳିଥାଏ। ଆପଣ ଏହି ଯୋଜନା ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ଯୋଗ୍ୟ ଅଟନ୍ତି।",
    audioText_en: "KALIA Scheme: Krushak Assistance for Livelihood and Income Augmentation provides 10,000 rupees annual assistance and zero percent interest crop loans for small and marginal farmers in Odisha. You are eligible for this scheme."
  },
  {
    id: "bsky",
    name_en: "BSKY / Nabin Card",
    name_or: "ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ ଯୋଜନା (BSKY)",
    fullName_en: "Biju Swasthya Kalyan Yojana & BSKY Nabin Card",
    fullName_or: "ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ ଯୋଜନା ଓ ନବୀନ କାର୍ଡ",
    department_en: "Health & Family Welfare Dept, Govt. of Odisha",
    department_or: "ସ୍ୱାସ୍ଥ୍ୟ ଓ ପରିବାର କଲ୍ୟାଣ ବିଭାଗ, ଓଡ଼ିଶା ସରକାର",
    badge: "ଓଡ଼ିଶା ସରକାର / Govt. of Odisha",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    icon: "HeartPulse",
    targetAudience_en: "All rural families with Ration Cards & Rural non-income tax payers",
    targetAudience_or: "ରାସନ କାର୍ଡ ଥିବା ସମସ୍ତ ଗ୍ରାମୀଣ ପରିବାର ଓ ନବୀନ କାର୍ଡ ହିତାଧିକାରୀ",
    description_en: "Universal cashless healthcare protection scheme for rural families covering secondary and tertiary treatments across 800+ top premier hospitals in India.",
    description_or: "ଗ୍ରାମାଞ୍ଚଳର ପରିବାରଙ୍କୁ ବଡ଼ ବଡ଼ ହସ୍ପିଟାଲରେ ମାଗଣା ଚିକିତ୍ସା ସୁବିଧା ଯୋଗାଉଥିବା ସ୍ୱାସ୍ଥ୍ୟ ବୀମା ଯୋଜନା। କୌଣସି ଟଙ୍କା ଖର୍ଚ୍ଚ ନକରି କ୍ୟାସଲେସ୍ ଚିକିତ୍ସା ମିଳେ।",
    benefits_en: [
      "Cashless medical treatment up to ₹5 Lakh per annum for the entire family",
      "Enhanced cashless treatment up to ₹10 Lakh per annum for women members",
      "Over 800+ empanelled private and premier hospitals in Odisha and outside",
      "Covers 4,000+ medical packages including surgeries, cancer care, and cardiology"
    ],
    benefits_or: [
      "ସମଗ୍ର ପରିବାର ପାଇଁ ବାର୍ଷିକ ₹୫ ଲକ୍ଷ ପର୍ଯ୍ୟନ୍ତ ମାଗଣା କ୍ୟାସଲେସ୍ ଚିକିତ୍ସା",
      "ପରିବାରର ମହିଳା ସଦସ୍ୟଙ୍କ ପାଇଁ ବାର୍ଷିକ ₹୧୦ ଲକ୍ଷ ପର୍ଯ୍ୟନ୍ତ ସ୍ୱାସ୍ଥ୍ୟ କଭରେଜ୍",
      "ଓଡ଼ିଶା ଓ ରାଜ୍ୟ ବାହାରର ୮୦୦ରୁ ଅଧିକ ବଡ଼ ବେସରକାରୀ ହସ୍ପିଟାଲରେ ଚିକିତ୍ସା ସୁବିଧା",
      "ଔଷଧ, ଅସ୍ତ୍ରୋପଚାର, ଡାଇଗ୍ନୋଷ୍ଟିକ୍ ଓ ଆଇସିୟୁ ଖର୍ଚ୍ଚ ସମ୍ପୂର୍ଣ୍ଣ ମାଗଣା"
    ],
    eligibility_criteria: {
      min_age: 18,
      max_age: 100,
      max_income: 300000,
      allowed_occupations: ["Farmer", "Agricultural Labourer", "Small Artisan", "Self Employed", "Other"],
      requires_ration_card: true
    },
    documents_en: ["BSKY Smart Card or NFSA/SFSS Ration Card", "Aadhaar Card of all family members"],
    documents_or: ["ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ ସ୍ମାର୍ଟ କାର୍ଡ କିମ୍ବା ରାସନ କାର୍ଡ", "ପରିବାରର ସମସ୍ତ ସଦସ୍ୟଙ୍କ ଆଧାର କାର୍ଡ"],
    official_link: "https://bsky.odisha.gov.in",
    helpline: "104 (24x7 Toll Free Helpline)",
    audioText_or: "ବିଜୁ ସ୍ୱାସ୍ଥ୍ୟ କଲ୍ୟାଣ ଯୋଜନା (BSKY): ଆପଣଙ୍କ ପାଖରେ ରାସନ କାର୍ଡ ଥିବାରୁ ଆପଣ ପରିବାର ପାଇଁ ପାଞ୍ଚ ଲକ୍ଷ ଏବଂ ମହିଳାଙ୍କ ପାଇଁ ଦଶ ଲକ୍ଷ ଟଙ୍କା ପର୍ଯ୍ୟନ୍ତ ମାଗଣା ହସ୍ପିଟାଲ ଚିକିତ୍ସା ପାଇବାକୁ ଯୋଗ୍ୟ।",
    audioText_en: "BSKY Biju Swasthya Kalyan Yojana: With your ration card, your family is entitled to five lakh rupees and women members up to ten lakh rupees per year of completely cashless medical treatment across eight hundred premier hospitals."
  },
  {
    id: "pm-kisan",
    name_en: "PM-KISAN Samman Nidhi",
    name_or: "ପ୍ରଧାନମନ୍ତ୍ରୀ କିଷାନ ସମ୍ମାନ ନିଧି (PM-KISAN)",
    fullName_en: "Pradhan Mantri Kisan Samman Nidhi",
    fullName_or: "ପ୍ରଧାନମନ୍ତ୍ରୀ କିଷାନ ସମ୍ମାନ ନିଧି ଯୋଜନା",
    department_en: "Ministry of Agriculture & Farmers Welfare, Govt. of India",
    department_or: "କୃଷି ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର",
    badge: "ଭାରତ ସରକାର / Govt. of India",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    icon: "ShieldCheck",
    targetAudience_en: "Landholding farmer families with cultivable land",
    targetAudience_or: "ଚାଷ ଜମି ଥିବା ସମସ୍ତ ଚାଷୀ ପରିବାର",
    description_en: "Central income support initiative providing direct bank transfers of ₹6,000 per year in 3 equal four-monthly instalments.",
    description_or: "ଚାଷୀମାନଙ୍କୁ ବିହନ, ସାର ଏବଂ କୃଷି ସାମଗ୍ରୀ କିଣିବା ପାଇଁ ବର୍ଷକୁ ତିନୋଟି କିସ୍ତିରେ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାକୁ ସହାୟତା ରାଶି ପ୍ରଦାନ କରାଯାଏ।",
    benefits_en: [
      "₹6,000 per year directly transferred to bank account via DBT",
      "Paid in 3 equal instalments of ₹2,000 every four months",
      "Direct benefit transfer without any intermediaries"
    ],
    benefits_or: [
      "ବାର୍ଷିକ ₹୬,୦୦୦ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାକୁ (DBT ଜରିଆରେ)",
      "ପ୍ରତି ଚାରି ମାସରେ ₹୨,୦୦୦ ଲେଖାଏଁ ୩ଟି କିସ୍ତିରେ ମିଳିଥାଏ",
      "କାଳିଆ ଯୋଜନା ସହିତ ଅତିରିକ୍ତ ଭାବେ ଏହାକୁ ମଧ୍ୟ ପାଇପାରିବେ"
    ],
    eligibility_criteria: {
      min_age: 18,
      max_age: 95,
      max_income: 250000,
      allowed_occupations: ["Farmer"],
      requires_ration_card: false
    },
    documents_en: ["Land Records (RoR / Khatauni)", "Aadhaar Card", "Bank Account Details with NPCI seeding"],
    documents_or: ["ଜମି ପଟ୍ଟା / ଖତିଆନ୍", "ଆଧାର କାର୍ଡ", "ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ପାସବୁକ୍"],
    official_link: "https://pmkisan.gov.in",
    helpline: "155261 / 011-24300606",
    audioText_or: "ପ୍ରଧାନମନ୍ତ୍ରୀ କିଷାନ ସମ୍ମାନ ନିଧି (PM-KISAN): ଚାଷ ଜମି ଥିବା ସମସ୍ତ କୃଷକ ପରିବାରଙ୍କୁ ବାର୍ଷିକ ୬,୦୦୦ ଟଙ୍କା ତିନୋଟି କିସ୍ତିରେ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାରେ ମିଳିଥାଏ।",
    audioText_en: "PM-KISAN Samman Nidhi: Pradhan Mantri Kisan Samman Nidhi provides direct financial assistance of 6,000 rupees per year in three equal instalments of 2,000 rupees directly to the bank accounts of all landholding farmer families."
  },
  {
    id: "balaram",
    name_en: "BALARAM Scheme",
    name_or: "ବଳରାମ ଯୋଜନା (BALARAM)",
    fullName_en: "Bhoomihina Agriculturist Loan and Resources Augmentation Model",
    fullName_or: "ଭୂମିହୀନ କୃଷକ ଋଣ ଓ ସମ୍ବଳ ଯୋଜନା",
    department_en: "Cooperation & Agriculture Dept, Govt. of Odisha",
    department_or: "ସମବାୟ ଓ କୃଷି ବିଭାଗ, ଓଡ଼ିଶା ସରକାର",
    badge: "ଓଡ଼ିଶା ସରକାର / Govt. of Odisha",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    icon: "Wheat",
    targetAudience_en: "Landless Farmers, Sharecroppers & Oral Lessees",
    targetAudience_or: "ଭୂମିହୀନ ଚାଷୀ, ଭାଗଚାଷୀ ଓ କ୍ଷେତ୍ର ଶ୍ରମିକ",
    description_en: "Institutional credit support aimed specifically at landless farmers and sharecroppers through Joint Liability Groups (JLGs) to access formal farm loans without mortgaging land.",
    description_or: "ଜମି ନଥିବା ଭାଗଚାଷୀ ଓ କୃଷି ଶ୍ରମିକମାନଙ୍କୁ ମିଳିତ ଗ୍ରୁପ୍ (JLG) ଜରିଆରେ ବିନା ବନ୍ଧକରେ ବ୍ୟାଙ୍କରୁ କୃଷି ଋଣ ଯୋଗାଇଦେବାର ଅଭିନବ ଯୋଜନା।",
    benefits_en: [
      "Collateral-free farm credit up to ₹1.6 Lakh per JLG group",
      "Concessional interest rate with timely repayment incentives",
      "Assistance for purchase of seeds, fertilizers, and farm equipment"
    ],
    benefits_or: [
      "ବିନା ବନ୍ଧକରେ ଗ୍ରୁପ୍ ପିଛା ₹୧.୬ ଲକ୍ଷ ପର୍ଯ୍ୟନ୍ତ କୃଷି ଋଣ ସୁବିଧା",
      "ସଠିକ୍ ସମୟରେ ପରିଶୋଧ କଲେ ସୁଧରେ ବିଶେଷ ରିହାତି",
      "ବିହନ, ସାର ଓ କୃଷି ଯନ୍ତ୍ରପାତି ପାଇଁ ସହଜ ଆର୍ଥିକ ସହାୟତା"
    ],
    eligibility_criteria: {
      min_age: 18,
      max_age: 70,
      max_income: 150000,
      allowed_occupations: ["Agricultural Labourer", "Farmer"],
      requires_ration_card: false
    },
    documents_en: ["Aadhaar Card", "Voter ID", "Bank Account Passbook"],
    documents_or: ["ଆଧାର କାର୍ଡ", "ଭୋଟର ପରିଚୟ ପତ୍ର", "ବ୍ୟାଙ୍କ ପାସବୁକ୍"],
    official_link: "https://odisha.gov.in",
    helpline: "1551",
    audioText_or: "ବଳରାମ ଯୋଜନା (BALARAM): ଭୂମିହୀନ ଚାଷୀ ଏବଂ ଶ୍ରମିକମାନେ ବିନା ବନ୍ଧକରେ ବ୍ୟାଙ୍କରୁ ସୁଲଭ କୃଷି ଋଣ ପାଇବା ପାଇଁ ଏହି ଯୋଜନା ଲାଭଦାୟକ।",
    audioText_en: "BALARAM Scheme: Bhoomihina Agriculturist Loan and Resources Augmentation Model provides collateral-free bank credit up to 1.6 lakh rupees for landless farmers and sharecroppers."
  }
];
