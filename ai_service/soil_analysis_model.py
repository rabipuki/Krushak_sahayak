"""
AI Soil Analysis & Soil Health Diagnostic Engine
Implements visual soil characterization using OpenCV and
laboratory soil test report evaluation based on ICAR standards.
"""

import cv2
import numpy as np


def analyze_visual_soil(image_bytes: bytes) -> dict:
    """
    Visual Soil Analysis using OpenCV color histogram and edge/texture variance.
    Identifies soil colour, approximate texture, moisture, and drainage characteristics.
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Invalid image format. Please upload a clear JPG, JPEG, or PNG soil photograph.")

    h, w, _ = img.shape
    if h < 50 or w < 50:
        raise ValueError("Image resolution too low for soil visual analysis.")

    # Calculate average color in BGR and HSV
    mean_bgr = cv2.mean(img)[:3]
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    mean_hsv = cv2.mean(hsv)[:3]

    h_val, s_val, v_val = mean_hsv[0], mean_hsv[1], mean_hsv[2]
    b, g, r = mean_bgr[0], mean_bgr[1], mean_bgr[2]

    # Texture & roughness metric (Laplacian variance on grayscale)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    texture_roughness = float(cv2.Laplacian(gray, cv2.CV_64F).var())

    # Soil color and type heuristic classification
    if v_val < 65:
        soil_type = "Black Soil (କଳା ମାଟି / Regur Soil)"
        soil_type_or = "କଳା ମାଟି (ରେଗୁର)"
        soil_type_hi = "काली मिट्टी"
        color_desc = "Deep Black to Dark Brown"
        color_desc_or = "ଗାଢ଼ କଳା ରଙ୍ଗ"
        drainage = "Moderate to Slow (High water retention capacity)"
        organic_status = "Moderate to High visible organic matter"
        improvement = "Improve drainage with broad bed and furrow system. Add gypsum if soil turns excessively sticky when wet."
    elif r > 120 and r > g * 1.15 and r > b * 1.3:
        if r > 150 and texture_roughness > 80:
            soil_type = "Laterite Soil (ଲାଟେରାଇଟ୍ ମାଟି)"
            soil_type_or = "ଲାଟେରାଇଟ୍ ମାଟି (ମାଙ୍କଡ଼ା ପଥରିଆ ମାଟି)"
            soil_type_hi = "लेटराइट मिट्टी"
            color_desc = "Reddish-Brown / Brick Red with porous gravelly texture"
            color_desc_or = "ଇଟା ଭଳି ଲାଲ-ବାଦାମୀ ରଙ୍ଗ"
            drainage = "Excessive to Rapid Drainage (Low water holding capacity)"
            organic_status = "Low visible organic matter; prone to nutrient leaching"
            improvement = "Apply Agricultural Lime @ 200 kg/acre to neutralize acidity. Incorporate heavy doses of Farmyard Manure (FYM) or Vermicompost."
        else:
            soil_type = "Red Loamy Soil (ନାଲି ଦୋରସା ମାଟି)"
            soil_type_or = "ନାଲି ଦୋରସା ମାଟି"
            soil_type_hi = "लाल दोमट मिट्टी"
            color_desc = "Light Reddish-Brown"
            color_desc_or = "ହାଲୁକା ନାଲି ରଙ୍ଗ"
            drainage = "Well Drained (Optimal for oilseeds, pulses, and vegetables)"
            organic_status = "Moderate organic matter"
            improvement = "Apply well-decomposed compost, biofertilizers (Azotobacter & PSB), and green manuring (Dhaincha)."
    elif s_val < 60 and v_val > 140:
        soil_type = "Sandy Loam Soil (ବାଲିଆ ଦୋରସା ମାଟି)"
        soil_type_or = "ବାଲିଆ ଦୋରସା ମାଟି"
        soil_type_hi = "बलुई दोमट मिट्टी"
        color_desc = "Pale Yellowish Brown / Sandy Buff"
        color_desc_or = "ବାଲିଆ ଫିକା ବାଦାମୀ ରଙ୍ଗ"
        drainage = "Rapid Drainage (High porosity, poor nutrient retention)"
        organic_status = "Low organic carbon content"
        improvement = "Incorporate green manures, coco peat, or tank silt (10-15 cartloads/acre) to build water and nutrient retention capacity."
    else:
        soil_type = "Alluvial Loam Soil (ପଟୁ ଦୋରସା ମାଟି / Alluvial Soil)"
        soil_type_or = "ପଟୁ ଦୋରସା ମାଟି"
        soil_type_hi = "जलोढ़ दोमट मिट्टी"
        color_desc = "Greyish Brown to Light Brown"
        color_desc_or = "ଧୂସର ବାଦାମୀ ରଙ୍ଗ"
        drainage = "Well-balanced internal drainage and capillary movement"
        organic_status = "Moderate to Good organic presence"
        improvement = "Maintain crop rotation with legumes (Arhar, Moong) and practice minimum tillage to preserve soil structure."

    # Surface Dryness / Moisture assessment
    if v_val < 80:
        moisture_status = "Moist to Saturated (ଆର୍ଦ୍ର / ଓଦାଳିଆ)"
        dryness_concern = "Low surface dryness. Check for water stagnation in root zones."
    elif v_val > 150:
        moisture_status = "Dry to Very Dry (ଶୁଷ୍କ / ଟାଣ)"
        dryness_concern = "Surface soil appears dry with high crusting. Mulching and timely light irrigation recommended."
    else:
        moisture_status = "Optimum Field Capacity (ଉପଯୁକ୍ତ ବତର)"
        dryness_concern = "Adequate surface moisture observed."

    return {
        "status": "success",
        "is_demonstration_mode": True,
        "mode_label": "Visual Diagnostic Model (Lab Soil Test Verification Advised)",
        "preliminary_soil_type": soil_type,
        "soil_type_or": soil_type_or,
        "soil_type_hi": soil_type_hi,
        "soil_color": color_desc,
        "soil_color_or": color_desc_or,
        "approximate_texture": "Loamy to Silty texture with moderate aggregation" if texture_roughness < 120 else "Coarse to Granular gravelly structure",
        "visible_organic_matter": organic_status,
        "surface_dryness": moisture_status,
        "surface_dryness_observations": dryness_concern,
        "drainage_assessment": drainage,
        "organic_matter_improvement_suggestions": [
            "Incorporate 2 to 3 tons of well-rotted Farm Yard Manure (FYM) or 1.5 tons of Vermicompost per acre before primary tillage.",
            "Sow green manure crop (Dhaincha / Sesbania aculeata) at onset of pre-monsoon showers and incorporate at 45 days stage.",
            "Apply bio-fertilizer consortium (Rhizobium, Azospirillum, and Phosphate Solubilizing Bacteria) @ 2 kg/acre mixed with compost."
        ],
        "organic_matter_improvement_or": "ଏକର ପ୍ରତି ୨-୩ ଟନ୍ ଗୋବର ଖତ କିମ୍ବା ୧.୫ ଟନ୍ ଜିଆ ଖତ ପ୍ରୟୋଗ କରନ୍ତୁ ଏବଂ ଧଇଞ୍ଚା ଚାଷ କରି ମାଟିରେ ମିଶାନ୍ତୁ।",
        "recommended_next_steps": [
            "Submit soil sample to the nearest Block Soil Testing Laboratory (ମାଟି ପରୀକ୍ଷାଗାର) for accurate chemical profiling.",
            "Avoid over-application of synthetic nitrogenous fertilizers without knowing current soil pH.",
            "Maintain soil mulching using crop stubbles to prevent surface erosion and moisture loss."
        ],
        "safety_disclaimer": (
            "IMPORTANT: A visual photograph cannot measure exact soil pH, Available Nitrogen (N), "
            "Available Phosphorus (P), Available Potassium (K), Electrical Conductivity (EC), or micronutrients. "
            "Please enter your Soil Health Card / Laboratory Test Report values below for scientifically accurate fertilizer prescriptions."
        ),
        "safety_disclaimer_or": (
            "ସୂଚନା: କେବଳ ଫଟୋରୁ ମାଟିର pH, ନାଇଟ୍ରୋଜେନ୍, ଫସଫରସ୍ ବା ପଟାସ୍ ର ସଠିକ୍ ମାପ ଜାଣିବା ସମ୍ଭବ ନୁହେଁ। "
            "ସଠିକ୍ ସାର ପ୍ରୟୋଗ ପାଇଁ ତଳେ ଆପଣଙ୍କ ମାଟି ପରୀକ୍ଷା ରିପୋର୍ଟ (Soil Health Card) ପ୍ରବେଶ କରନ୍ତୁ।"
        )
    }


def evaluate_soil_test_report(
    ph: float,
    nitrogen: float = None,
    phosphorus: float = None,
    potassium: float = None,
    organic_carbon: float = None,
    electrical_conductivity: float = None,
    crop_name: str = "Paddy / Rice"
) -> dict:
    """
    Evaluates physical & chemical soil laboratory values against ICAR / OUAT benchmarks.
    Generates exact fertilizer, soil amendment, and nutrient management recommendations.
    """
    findings = []
    amendments = []
    fertilizer_plans = []

    # 1. Soil Reaction (pH) Evaluation
    if ph < 5.5:
        ph_status = "Strongly Acidic (ଅତ୍ୟଧିକ ଅମ୍ଳିଆ ମାଟି)"
        ph_status_or = "ଅତ୍ୟଧିକ ଅମ୍ଳିଆ ମାଟି (Strongly Acidic)"
        findings.append(f"Soil is strongly acidic (pH {ph}). Phosphorus fixation occurs and micronutrient toxicities (Al, Fe) may develop.")
        amendments.append("Apply Agricultural Lime (CaCO3) or Paper Mill Sludge @ 250-300 kg/acre at least 2 weeks before sowing/transplanting.")
    elif 5.5 <= ph < 6.5:
        ph_status = "Moderately Acidic (ମଧ୍ୟମ ଅମ୍ଳିଆ ମାଟି)"
        ph_status_or = "ମଧ୍ୟମ ଅମ୍ଳିଆ ମାଟି"
        findings.append(f"Soil is moderately acidic (pH {ph}). Suitable for rice, but pulses and oilseeds benefit from mild liming.")
        amendments.append("Apply Lime @ 100-150 kg/acre or basic slag to improve nutrient uptake.")
    elif 6.5 <= ph <= 7.5:
        ph_status = "Neutral / Optimal (ଉତ୍ତମ ସନ୍ତୁଳିତ ମାଟି)"
        ph_status_or = "ସନ୍ତୁଳିତ ଓ ଉତ୍ତମ ମାଟି (Neutral)"
        findings.append(f"Soil pH ({ph}) is ideal for virtually all field crops, vegetables, and fruit orchards.")
        amendments.append("No liming or gypsum required. Preserve balanced organic matter.")
    elif 7.5 < ph <= 8.5:
        ph_status = "Mildly Alkaline (ହାଲୁକା କ୍ଷାରୀୟ ମାଟି)"
        ph_status_or = "ହାଲୁକା କ୍ଷାରୀୟ ମାଟି"
        findings.append(f"Soil is mildly alkaline (pH {ph}). Zinc and Iron availability may be restricted.")
        amendments.append("Incorporate green manure (Dhaincha) and apply Zinc Sulphate @ 10 kg/acre.")
    else:
        ph_status = "Strongly Alkaline / Sodic (ଅତ୍ୟଧିକ କ୍ଷାରୀୟ ମାଟି)"
        ph_status_or = "ଅତ୍ୟଧିକ କ୍ଷାରୀୟ ମାଟି"
        findings.append(f"Soil is strongly alkaline/sodic (pH {ph}). Structure is dispersed with poor infiltration.")
        amendments.append("Apply Gypsum (Calcium Sulphate) @ 500 kg/acre followed by flushing/leaching with good quality irrigation water.")

    # 2. Available Nitrogen (kg/ha)
    # ICAR Benchmark: <280 Low, 280-560 Medium, >560 High
    n_status = "Medium"
    n_dose_urea = 65  # standard kg/acre
    if nitrogen is not None:
        if nitrogen < 280:
            n_status = "Low (କମ୍ ନାଇଟ୍ରୋଜେନ୍)"
            findings.append(f"Available Nitrogen is LOW ({nitrogen} kg/ha). Plants may exhibit stunted growth and pale yellowing.")
            n_dose_urea = 80
            fertilizer_plans.append("Apply 80 kg Neem Coated Urea per acre split into 3 equal doses (Basal, Tillering, Panicle Initiation).")
        elif nitrogen > 560:
            n_status = "High (ଅଧିକ ନାଇଟ୍ରୋଜେନ୍)"
            findings.append(f"Available Nitrogen is HIGH ({nitrogen} kg/ha). Reduce chemical nitrogen to prevent lodging and fungal diseases.")
            n_dose_urea = 45
            fertilizer_plans.append("Reduce Urea to 45 kg/acre. Avoid excess vegetative growth.")
        else:
            n_status = "Medium (ସନ୍ତୁଳିତ ନାଇଟ୍ରୋଜେନ୍)"
            findings.append(f"Available Nitrogen is OPTIMAL ({nitrogen} kg/ha).")
            fertilizer_plans.append("Apply standard recommended 65 kg Urea per acre in split doses.")

    # 3. Available Phosphorus (kg/ha)
    # ICAR Benchmark: <10 Low, 10-25 Medium, >25 High
    p_status = "Medium"
    if phosphorus is not None:
        if phosphorus < 10:
            p_status = "Low (କମ୍ ଫସଫରସ୍)"
            findings.append(f"Available Phosphorus is LOW ({phosphorus} kg/ha). Poor root development and delayed maturity risk.")
            fertilizer_plans.append("Apply Single Super Phosphate (SSP) @ 100 kg/acre or DAP @ 35 kg/acre as 100% basal dose during final plowing.")
        elif phosphorus > 25:
            p_status = "High (ଅଧିକ ଫସଫରସ୍)"
            findings.append(f"Available Phosphorus is HIGH ({phosphorus} kg/ha). High P reserves present.")
            fertilizer_plans.append("Reduce phosphatic fertilizers by 25%. Apply Rock Phosphate if soil is acidic.")
        else:
            p_status = "Medium (ମଧ୍ୟମ ଫସଫରସ୍)"
            findings.append(f"Available Phosphorus is ADEQUATE ({phosphorus} kg/ha).")
            fertilizer_plans.append("Apply DAP @ 25 kg/acre or SSP @ 75 kg/acre as basal dose.")

    # 4. Available Potassium (kg/ha)
    # ICAR Benchmark: <110 Low, 110-280 Medium, >280 High
    k_status = "Medium"
    if potassium is not None:
        if potassium < 110:
            k_status = "Low (କମ୍ ପଟାସ୍)"
            findings.append(f"Available Potassium is LOW ({potassium} kg/ha). Crops prone to lodging, drought stress, and pest attack.")
            fertilizer_plans.append("Apply Muriate of Potash (MOP) @ 30 kg/acre (50% basal + 50% at flowering stage).")
        elif potassium > 280:
            k_status = "High (ପର୍ଯ୍ୟାପ୍ତ ପଟାସ୍)"
            findings.append(f"Available Potassium is HIGH ({potassium} kg/ha).")
            fertilizer_plans.append("Apply maintenance dose of MOP @ 15 kg/acre.")
        else:
            k_status = "Medium (ସନ୍ତୁଳିତ ପଟାସ୍)"
            findings.append(f"Available Potassium is OPTIMAL ({potassium} kg/ha).")
            fertilizer_plans.append("Apply standard MOP @ 20 kg/acre.")

    # 5. Organic Carbon (%)
    # ICAR Benchmark: <0.5% Low, 0.5-0.75% Medium, >0.75% High
    oc_status = "Medium"
    if organic_carbon is not None:
        if organic_carbon < 0.5:
            oc_status = "Low (କମ୍ ଜୈବିକ ଅଙ୍ଗାର)"
            findings.append(f"Organic Carbon is CRITICALLY LOW ({organic_carbon}%). Soil microbiological activity is depressed.")
            amendments.append("Mandatory application of 3 tons Farm Yard Manure (FYM) or 2 tons Vermicompost per acre annually.")
        elif organic_carbon > 0.75:
            oc_status = "High (ଉତ୍ତମ ଜୈବିକ ଅଙ୍ଗାର)"
            findings.append(f"Organic Carbon is HIGH ({organic_carbon}%). Excellent soil bio-activity and aggregate stability.")
        else:
            oc_status = "Medium (ସାଧାରଣ ଜୈବିକ ଅଙ୍ଗାର)"

    # 6. Electrical Conductivity (dS/m)
    # Benchmark: <1.0 Normal, 1.0-2.0 Critical for sensitive crops, >2.0 Saline
    ec_status = "Normal"
    if electrical_conductivity is not None:
        if electrical_conductivity > 1.2:
            ec_status = "Saline / High Salt (ଲୁଣିଆ ମାଟି)"
            findings.append(f"Electrical Conductivity is ELEVATED ({electrical_conductivity} dS/m). Salinity risk to seedlings.")
            amendments.append("Ensure internal drainage channels. Leach out salts with fresh water flooding before transplanting.")
        else:
            ec_status = "Normal / Safe (< 1.0 dS/m)"

    return {
        "status": "success",
        "crop_evaluated": crop_name,
        "ph_value": ph,
        "ph_classification": ph_status,
        "ph_classification_or": ph_status_or,
        "nitrogen_status": n_status,
        "phosphorus_status": p_status,
        "potassium_status": k_status,
        "organic_carbon_status": oc_status,
        "salinity_ec_status": ec_status,
        "key_findings": findings,
        "soil_amendments": amendments,
        "recommended_fertilizer_schedule": fertilizer_plans,
        "organic_alternatives": [
            "Incorporate 2.5 tons well-decomposed FYM or compost per acre",
            "Apply Jeevamrutha (200 L/acre) along with irrigation water every 21 days",
            "Seed treatment with Azospirillum / Rhizobium & PSB culture @ 200 g/10 kg seed"
        ],
        "organic_alternatives_or": [
            "ଏକର ପ୍ରତି ୨.୫ ଟନ୍ ପଚା ଗୋବର ଖତ କିମ୍ବା କମ୍ପୋଷ୍ଟ୍ ମାଟିରେ ମିଶାନ୍ତୁ।",
            "ପ୍ରତି ୨୧ ଦିନରେ ଜଳସେଚନ ସହିତ ଜୀବାମୃତ (୨୦୦ ଲିଟର/ଏକର) ପ୍ରୟୋଗ କରନ୍ତୁ।",
            "ବିହନକୁ ଆଜୋସ୍ପାଇରିଲମ୍ / ରାଇଜୋବିୟମ୍ ଏବଂ ପିଏସବି ଜୀବାଣୁ ଟିକାରେ ବିଶୋଧନ କରନ୍ତୁ।"
        ],
        "precautions": [
            "Never mix phosphatic fertilizers (DAP/SSP) directly with zinc sulphate.",
            "Apply urea when leaf foliage is dry to avoid leaf scorching.",
            "Always maintain sufficient soil moisture before chemical fertilizer top-dressing."
        ],
        "official_guideline": "Integrated Nutrient Management (INM) Guidelines, ICAR & Directorate of Agriculture and Food Production, Odisha"
    }
