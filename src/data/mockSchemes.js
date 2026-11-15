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
  },
  {
    id: "subhadra",
    name_en: "Subhadra Yojana",
    name_or: "ସୁଭଦ୍ରା ଯୋଜନା (SUBHADRA)",
    fullName_en: "Subhadra Yojana – Cash Support for Women",
    fullName_or: "ସୁଭଦ୍ରା ଯୋଜନା",
    department_en: "Women & Child Development and Mission Shakti Dept, Govt. of Odisha",
    department_or: "ମହିଳା ଓ ଶିଶୁ ବିକାଶ ଏବଂ ମିଶନ ଶକ୍ତି ବିଭାଗ, ଓଡ଼ିଶା ସରକାର",
    badge: "ଓଡ଼ିଶା ସରକାର / Govt. of Odisha",
    badgeColor: "bg-pink-100 text-pink-900 border-pink-300",
    icon: "Heart",
    targetAudience_en: "Women aged 21-60 who are permanent residents of Odisha",
    targetAudience_or: "ଓଡ଼ିଶାର ସ୍ଥାୟୀ ବାସିନ୍ଦା ୨୧ ରୁ ୬୦ ବର୍ଷ ବୟସର ମହିଳା",
    eligibility_note_en: "Women only. Women already receiving Rs 1,500 or more per month from another state or central scheme are excluded.",
    description_en: "Direct cash support for women: Rs 50,000 over five years, paid by DBT into the bank account, with a Subhadra debit card.",
    description_or: "ମହିଳାମାନଙ୍କୁ ପାଞ୍ଚ ବର୍ଷରେ ମୋଟ ₹୫୦,୦୦୦ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାକୁ (DBT) ଦିଆଯାଉଥିବା ଆର୍ଥିକ ସହାୟତା ଯୋଜନା।",
    benefits_en: [
      "₹10,000 per year for 5 years (₹50,000 in total)",
      "Paid in two instalments of ₹5,000 each year (Raksha Bandhan and International Women's Day)",
      "Money goes directly to the bank account through DBT",
      "Subhadra debit card for easy banking"
    ],
    benefits_or: [
      "ପାଞ୍ଚ ବର୍ଷ ପାଇଁ ବାର୍ଷିକ ₹୧୦,୦୦୦ (ମୋଟ ₹୫୦,୦୦୦)",
      "ପ୍ରତି ବର୍ଷ ₹୫,୦୦୦ ଲେଖାଏଁ ଦୁଇ କିସ୍ତିରେ (ରାଖୀ ପୂର୍ଣ୍ଣିମା ଓ ଅନ୍ତର୍ଜାତୀୟ ମହିଳା ଦିବସ)",
      "DBT ଜରିଆରେ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାକୁ ଟଙ୍କା",
      "ସୁଭଦ୍ରା ଡେବିଟ୍ କାର୍ଡ ସୁବିଧା"
    ],
    eligibility_criteria: {
      min_age: 21,
      max_age: 60,
      max_income: null,
      allowed_occupations: ["Farmer", "Agricultural Labourer", "Small Artisan", "Self Employed", "Other"],
      requires_ration_card: false
    },
    documents_en: ["Aadhaar Card (with Aadhaar-linked mobile for e-KYC)", "Bank Account Details", "Proof of Odisha residence"],
    documents_or: ["ଆଧାର କାର୍ଡ (ଆଧାର ସଂଲଗ୍ନ ମୋବାଇଲ୍ ନମ୍ବର)", "ବ୍ୟାଙ୍କ ଖାତା ବିବରଣୀ", "ଓଡ଼ିଶା ବାସିନ୍ଦା ପ୍ରମାଣପତ୍ର"],
    official_link: "https://subhadra.odisha.gov.in",
    helpline: "1551",
    audioText_or: "ସୁଭଦ୍ରା ଯୋଜନା: ୨୧ ରୁ ୬୦ ବର୍ଷର ଓଡ଼ିଶାର ମହିଳାମାନଙ୍କୁ ପାଞ୍ଚ ବର୍ଷରେ ମୋଟ ପଚାଶ ହଜାର ଟଙ୍କା ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାରେ ମିଳିଥାଏ।",
    audioText_en: "Subhadra Yojana: Women aged 21 to 60 in Odisha receive a total of 50,000 rupees over five years, paid directly into their bank account."
  },
  {
    id: "mission-shakti",
    name_en: "Mission Shakti (SHG Support)",
    name_or: "ମିଶନ ଶକ୍ତି (ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀ)",
    fullName_en: "Mission Shakti - Women Self Help Group Empowerment Programme",
    fullName_or: "ମିଶନ ଶକ୍ତି - ମହିଳା ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀ ସଶକ୍ତିକରଣ କାର୍ଯ୍ୟକ୍ରମ",
    department_en: "Mission Shakti Dept, Govt. of Odisha",
    department_or: "ମିଶନ ଶକ୍ତି ବିଭାଗ, ଓଡ଼ିଶା ସରକାର",
    badge: "ଓଡ଼ିଶା ସରକାର / Govt. of Odisha",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    icon: "Users",
    targetAudience_en: "Women Self Help Group (SHG) members in Odisha",
    targetAudience_or: "ଓଡ଼ିଶାର ମହିଳା ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀ (SHG) ସଦସ୍ୟା",
    eligibility_note_en: "Women only, through a registered Self Help Group (usually 10-20 members). Individual women should join or form an SHG first.",
    description_en: "Supports women's SHGs with interest-free bank credit, training and market linkages so rural women can start or grow livelihood activities.",
    description_or: "ମହିଳା ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀକୁ ସୁଧମୁକ୍ତ ବ୍ୟାଙ୍କ ଋଣ, ତାଲିମ ଓ ବଜାର ସଂଯୋଗ ଯୋଗାଇ ଜୀବିକା ବଢ଼ାଇବାର ଯୋଜନା।",
    benefits_en: [
      "Interest-free bank loans up to ₹5 Lakh for SHGs",
      "Training and skill-building for livelihood activities",
      "Marketing and market-linkage support for SHG products",
      "Group savings habit and regular bank linkage"
    ],
    benefits_or: [
      "ଗୋଷ୍ଠୀ ପାଇଁ ₹୫ ଲକ୍ଷ ପର୍ଯ୍ୟନ୍ତ ସୁଧମୁକ୍ତ ବ୍ୟାଙ୍କ ଋଣ",
      "ଜୀବିକା ପାଇଁ ତାଲିମ ଓ ଦକ୍ଷତା ବିକାଶ",
      "ଗୋଷ୍ଠୀର ଉତ୍ପାଦ ବିକ୍ରି ପାଇଁ ବଜାର ସଂଯୋଗ ସହାୟତା",
      "ଗୋଷ୍ଠୀ ସଞ୍ଚୟ ଓ ନିୟମିତ ବ୍ୟାଙ୍କ ସଂଯୋଗ"
    ],
    eligibility_criteria: {
      min_age: 18,
      max_age: 60,
      max_income: null,
      allowed_occupations: ["Farmer", "Agricultural Labourer", "Small Artisan", "Self Employed", "Other"],
      requires_ration_card: false
    },
    documents_en: ["Aadhaar Card of members", "SHG Bank Passbook", "SHG registration / resolution copy"],
    documents_or: ["ସଦସ୍ୟାଙ୍କ ଆଧାର କାର୍ଡ", "ଗୋଷ୍ଠୀର ବ୍ୟାଙ୍କ ପାସବୁକ୍", "ଗୋଷ୍ଠୀ ପଞ୍ଜୀକରଣ / ପ୍ରସ୍ତାବ ନକଲ"],
    official_link: "https://missionshakti.odisha.gov.in",
    helpline: "1551",
    audioText_or: "ମିଶନ ଶକ୍ତି: ମହିଳା ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀକୁ ପାଞ୍ଚ ଲକ୍ଷ ଟଙ୍କା ପର୍ଯ୍ୟନ୍ତ ସୁଧମୁକ୍ତ ବ୍ୟାଙ୍କ ଋଣ, ତାଲିମ ଓ ବଜାର ସହାୟତା ମିଳିଥାଏ।",
    audioText_en: "Mission Shakti: Women's self help groups get interest-free bank loans up to 5 lakh rupees, along with training and market support."
  },
  {
    id: "pmfby",
    name_en: "PM Fasal Bima Yojana (PMFBY)",
    name_or: "ପ୍ରଧାନମନ୍ତ୍ରୀ ଫସଲ ବୀମା ଯୋଜନା (PMFBY)",
    fullName_en: "Pradhan Mantri Fasal Bima Yojana",
    fullName_or: "ପ୍ରଧାନମନ୍ତ୍ରୀ ଫସଲ ବୀମା ଯୋଜନା",
    department_en: "Ministry of Agriculture & Farmers Welfare, Govt. of India",
    department_or: "କୃଷି ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର",
    badge: "ଭାରତ ସରକାର / Govt. of India",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    icon: "ShieldCheck",
    targetAudience_en: "Farmers growing notified crops, including sharecroppers and tenant farmers",
    targetAudience_or: "ବିଜ୍ଞାପିତ ଫସଲ ଚାଷ କରୁଥିବା ଚାଷୀ, ଭାଗଚାଷୀ ଓ ଲିଜ୍ ଚାଷୀ",
    description_en: "Low-premium crop insurance that pays compensation when crops are lost to floods, cyclones, drought, pests or disease.",
    description_or: "ବନ୍ୟା, ବାତ୍ୟା, ମରୁଡ଼ି, କୀଟ ଓ ରୋଗ ଯୋଗୁଁ ଫସଲ ନଷ୍ଟ ହେଲେ କମ୍ ପ୍ରିମିୟମ୍‌ରେ କ୍ଷତିପୂରଣ ମିଳୁଥିବା ଫସଲ ବୀମା ଯୋଜନା।",
    benefits_en: [
      "Farmer pays only 2% premium for kharif, 1.5% for rabi and 5% for commercial/horticultural crops",
      "Insurance cover for loss from floods, cyclones, drought, pests and diseases",
      "Local calamities (hailstorm, landslide, inundation) and post-harvest losses are also covered",
      "The remaining premium is paid by the government"
    ],
    benefits_or: [
      "ଖରିଫ ପାଇଁ ମାତ୍ର ୨%, ରବି ପାଇଁ ୧.୫% ଏବଂ ବାଣିଜ୍ୟିକ/ଉଦ୍ୟାନ ଫସଲ ପାଇଁ ୫% ପ୍ରିମିୟମ୍",
      "ବନ୍ୟା, ବାତ୍ୟା, ମରୁଡ଼ି, କୀଟ ଓ ରୋଗ ଯୋଗୁଁ ଫସଲ କ୍ଷତିରେ ବୀମା କ୍ଷତିପୂରଣ",
      "ଶିଳାବୃଷ୍ଟି, ଭୂସ୍ଖଳନ, ଜଳମଗ୍ନ ଭଳି ସ୍ଥାନୀୟ ବିପର୍ଯ୍ୟୟ ଓ ଅମଳ ପରବର୍ତ୍ତୀ କ୍ଷତି ମଧ୍ୟ କଭର",
      "ବାକି ପ୍ରିମିୟମ୍ ସରକାର ବହନ କରନ୍ତି"
    ],
    eligibility_criteria: {
      min_age: 18,
      max_age: 100,
      max_income: null,
      allowed_occupations: ["Farmer"],
      requires_ration_card: false
    },
    documents_en: ["Aadhaar Card", "Bank Passbook", "Land Record / RoR or lease/sharecropping proof", "Sowing declaration"],
    documents_or: ["ଆଧାର କାର୍ଡ", "ବ୍ୟାଙ୍କ ପାସବୁକ୍", "ଜମି ପଟ୍ଟା / RoR କିମ୍ବା ଲିଜ୍ ପ୍ରମାଣ", "ଚାଷ ଘୋଷଣାପତ୍ର"],
    official_link: "https://pmfby.gov.in",
    helpline: "14447",
    audioText_or: "ପ୍ରଧାନମନ୍ତ୍ରୀ ଫସଲ ବୀମା ଯୋଜନା: ଖରିଫ ଫସଲ ପାଇଁ ମାତ୍ର ଦୁଇ ପ୍ରତିଶତ ପ୍ରିମିୟମ୍‌ରେ ବନ୍ୟା, ବାତ୍ୟା, ମରୁଡ଼ି ଓ ରୋଗ ଯୋଗୁଁ ଫସଲ କ୍ଷତିର କ୍ଷତିପୂରଣ ମିଳିଥାଏ।",
    audioText_en: "PM Fasal Bima Yojana: Farmers pay only 2 percent premium for kharif crops and get compensation for crop loss due to floods, cyclones, drought and disease."
  },
  {
    id: "pmay-g",
    name_en: "PM Awas Yojana - Gramin (PMAY-G)",
    name_or: "ପ୍ରଧାନମନ୍ତ୍ରୀ ଆବାସ ଯୋଜନା - ଗ୍ରାମୀଣ (PMAY-G)",
    fullName_en: "Pradhan Mantri Awaas Yojana - Gramin",
    fullName_or: "ପ୍ରଧାନମନ୍ତ୍ରୀ ଆବାସ ଯୋଜନା - ଗ୍ରାମୀଣ",
    department_en: "Ministry of Rural Development (GoI) with Panchayati Raj & Drinking Water Dept, Odisha",
    department_or: "ଗ୍ରାମ୍ୟ ଉନ୍ନୟନ ମନ୍ତ୍ରଣାଳୟ (ଭାରତ ସରକାର) ଓ ପଞ୍ଚାୟତିରାଜ ବିଭାଗ, ଓଡ଼ିଶା",
    badge: "ଭାରତ ସରକାର / Govt. of India",
    badgeColor: "bg-orange-100 text-orange-900 border-orange-300",
    icon: "Home",
    targetAudience_en: "Rural families without a pucca house, selected from the Awaas+ / SECC permanent wait list",
    targetAudience_or: "ପକ୍କା ଘର ନଥିବା ଗ୍ରାମୀଣ ପରିବାର (ଆବାସ ପ୍ଲସ୍ / SECC ତାଲିକାରୁ ଚୟନ)",
    eligibility_note_en: "Selection is based on the government's housing wait list (houseless or living in kutcha/dilapidated houses), not just income. The family must not already own a pucca house.",
    description_en: "Financial help to build a pucca house with a cooking space for rural families that have no proper house.",
    description_or: "ପକ୍କା ଘର ନଥିବା ଗ୍ରାମୀଣ ପରିବାରଙ୍କୁ ରୋଷେଇ ସ୍ଥାନ ସହିତ ପକ୍କା ଘର ନିର୍ମାଣ ପାଇଁ ଆର୍ଥିକ ସହାୟତା।",
    benefits_en: [
      "₹1.20 Lakh assistance in plain areas and ₹1.30 Lakh in hilly/difficult areas",
      "Up to 90/95 days of MGNREGA wages for the construction work",
      "₹12,000 support for a toilet under Swachh Bharat Mission (Gramin)",
      "Pucca house of at least 25 sq m with a hygienic cooking space"
    ],
    benefits_or: [
      "ସମତଳ ଅଞ୍ଚଳରେ ₹୧.୨୦ ଲକ୍ଷ ଓ ପାହାଡ଼ିଆ/ଦୁର୍ଗମ ଅଞ୍ଚଳରେ ₹୧.୩୦ ଲକ୍ଷ ସହାୟତା",
      "ଘର ତିଆରି ପାଇଁ ୯୦/୯୫ ଦିନ ପର୍ଯ୍ୟନ୍ତ MGNREGA ମଜୁରୀ",
      "ସ୍ୱଚ୍ଛ ଭାରତ ମିଶନ (ଗ୍ରାମୀଣ) ଅଧୀନରେ ଶୌଚାଳୟ ପାଇଁ ₹୧୨,୦୦୦",
      "ଅନ୍ତତଃ ୨୫ ବର୍ଗ ମିଟର ପକ୍କା ଘର ଓ ସ୍ୱଚ୍ଛ ରୋଷେଇ ସ୍ଥାନ"
    ],
    eligibility_criteria: {
      min_age: 18,
      max_age: 100,
      max_income: null,
      allowed_occupations: ["Farmer", "Agricultural Labourer", "Small Artisan", "Self Employed", "Other"],
      requires_ration_card: false
    },
    documents_en: ["Aadhaar Card", "Bank Passbook (Aadhaar linked)", "Job Card (MGNREGA)", "Awaas+ / SECC wait-list entry"],
    documents_or: ["ଆଧାର କାର୍ଡ", "ବ୍ୟାଙ୍କ ପାସବୁକ୍ (ଆଧାର ସଂଲଗ୍ନ)", "ଜବ୍ କାର୍ଡ (MGNREGA)", "ଆବାସ ପ୍ଲସ୍ / SECC ତାଲିକାରେ ନାମ"],
    official_link: "https://pmayg.nic.in",
    helpline: "1800-11-6446",
    audioText_or: "ପ୍ରଧାନମନ୍ତ୍ରୀ ଆବାସ ଯୋଜନା ଗ୍ରାମୀଣ: ପକ୍କା ଘର ନଥିବା ପରିବାରକୁ ସମତଳରେ ଏକ ଲକ୍ଷ କୋଡ଼ିଏ ହଜାର ଏବଂ ପାହାଡ଼ିଆ ଅଞ୍ଚଳରେ ଏକ ଲକ୍ଷ ତିରିଶ ହଜାର ଟଙ୍କା ଘର ତିଆରି ପାଇଁ ମିଳିଥାଏ।",
    audioText_en: "PM Awas Yojana Gramin: Rural families without a pucca house get 1.2 lakh rupees in plain areas and 1.3 lakh rupees in hilly areas to build one."
  },
  {
    id: "mbpy",
    name_en: "Madhu Babu Pension Yojana (MBPY)",
    name_or: "ମଧୁବାବୁ ପେନସନ ଯୋଜନା (MBPY)",
    fullName_en: "Madhu Babu Pension Yojana - Social Security Pension",
    fullName_or: "ମଧୁବାବୁ ପେନସନ ଯୋଜନା - ସାମାଜିକ ସୁରକ୍ଷା ପେନସନ",
    department_en: "Social Security & Empowerment of Persons with Disabilities (SSEPD) Dept, Govt. of Odisha",
    department_or: "ସାମାଜିକ ସୁରକ୍ଷା ଓ ଭିନ୍ନକ୍ଷମ ସଶକ୍ତିକରଣ ବିଭାଗ, ଓଡ଼ିଶା ସରକାର",
    badge: "ଓଡ଼ିଶା ସରକାର / Govt. of Odisha",
    badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
    icon: "HeartPulse",
    targetAudience_en: "Senior citizens (60+), widows and persons with disabilities in Odisha",
    targetAudience_or: "ଓଡ଼ିଶାର ବରିଷ୍ଠ ନାଗରିକ (୬୦+), ବିଧବା ଓ ଭିନ୍ନକ୍ଷମ ବ୍ୟକ୍ତି",
    eligibility_note_en: "Permanent resident of Odisha who meets the age/category and household-income conditions. A person already receiving another government pension is generally not eligible.",
    description_en: "Monthly social security pension paid by DBT to elderly, widowed and disabled residents who lack a stable income.",
    description_or: "ସ୍ଥିର ଆୟ ନଥିବା ବୃଦ୍ଧ, ବିଧବା ଓ ଭିନ୍ନକ୍ଷମ ବ୍ୟକ୍ତିଙ୍କୁ ପ୍ରତି ମାସ DBT ଜରିଆରେ ଦିଆଯାଉଥିବା ସାମାଜିକ ସୁରକ୍ଷା ପେନସନ।",
    benefits_en: [
      "Monthly pension directly into the bank account through DBT",
      "₹3,500 per month for people aged 80+ and persons with 80%+ disability",
      "A lower monthly slab for ages 60-79 (rates are revised from time to time - confirm the current amount on the SSEPD portal)",
      "Covers old-age, widow and disability categories under one scheme"
    ],
    benefits_or: [
      "DBT ଜରିଆରେ ପ୍ରତି ମାସ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାକୁ ପେନସନ",
      "୮୦ ବର୍ଷ ଓ ତଦୂର୍ଦ୍ଧ୍ୱ ଏବଂ ୮୦%ରୁ ଅଧିକ ଭିନ୍ନକ୍ଷମଙ୍କୁ ମାସିକ ₹୩,୫୦୦",
      "୬୦-୭୯ ବର୍ଷ ପାଇଁ ଅପେକ୍ଷାକୃତ କମ୍ ମାସିକ ହାର (ହାର ବଦଳିପାରେ - SSEPD ପୋର୍ଟାଲରେ ବର୍ତ୍ତମାନର ହାର ଯାଞ୍ଚ କରନ୍ତୁ)",
      "ବୃଦ୍ଧ, ବିଧବା ଓ ଭିନ୍ନକ୍ଷମ ବର୍ଗ ଏକ ଯୋଜନାରେ"
    ],
    eligibility_criteria: {
      min_age: 60,
      max_age: 110,
      max_income: null,
      allowed_occupations: ["Farmer", "Agricultural Labourer", "Small Artisan", "Self Employed", "Other"],
      requires_ration_card: false
    },
    documents_en: ["Aadhaar Card", "Age proof", "Bank Passbook", "Recent passport-size photographs", "Income / BPL proof"],
    documents_or: ["ଆଧାର କାର୍ଡ", "ବୟସ ପ୍ରମାଣପତ୍ର", "ବ୍ୟାଙ୍କ ପାସବୁକ୍", "ସଦ୍ୟ ପାସପୋର୍ଟ ଆକାରର ଫଟୋ", "ଆୟ / BPL ପ୍ରମାଣପତ୍ର"],
    official_link: "https://ssepd.odisha.gov.in",
    helpline: "1551",
    audioText_or: "ମଧୁବାବୁ ପେନସନ ଯୋଜନା: ୬୦ ବର୍ଷ ଓ ତଦୂର୍ଦ୍ଧ୍ୱ ବୃଦ୍ଧ, ବିଧବା ଓ ଭିନ୍ନକ୍ଷମ ବ୍ୟକ୍ତିଙ୍କୁ ପ୍ରତି ମାସ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାରେ ପେନସନ ମିଳିଥାଏ।",
    audioText_en: "Madhu Babu Pension Yojana: Elderly people aged 60 and above, widows and persons with disabilities receive a monthly pension directly in their bank account."
  }
];
