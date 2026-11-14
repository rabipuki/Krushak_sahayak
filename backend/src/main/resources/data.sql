-- ============================================================================
-- SMART FARMING PLATFORM - INITIAL SEED DATA
-- ICAR / OUAT verified agricultural recommendations
-- ============================================================================

-- ROLES
INSERT INTO roles (id, name, description) VALUES 
(1, 'ROLE_FARMER', 'Registered Farmer with access to farm tools, AI analyses, and advisory'),
(2, 'ROLE_ADMIN', 'Agricultural Officer / System Administrator with knowledge approval rights')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- DEFAULT ADMIN (Password: Admin@123)
-- BCrypt: $2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi
INSERT INTO admins (id, username, email, password_hash, full_name, designation, department, is_active) VALUES
(1, 'admin', 'admin@krushaksahayak.in', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'Dr. Subhransu Sekhar Mohanty', 'Senior Agronomist & Extension Officer', 'Directorate of Agriculture & Food Production, Odisha', TRUE)
ON DUPLICATE KEY UPDATE username=VALUES(username);

-- SAMPLE REGISTERED FARMER (Phone: 9876543210, Password: Farmer@123)
INSERT INTO farmers (id, full_name, phone, email, password_hash, state, district, block, village, land_size_acres, primary_soil_type, preferred_language, has_ration_card, annual_income) VALUES
(1, 'ରମେଶ ଚନ୍ଦ୍ର ସାହୁ (Ramesh Chandra Sahoo)', '9876543210', 'ramesh.farmer@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'Odisha', 'Cuttack', 'Banki', 'Subarnapur', 3.5, 'Alluvial Loam', 'or', TRUE, 45000.0)
ON DUPLICATE KEY UPDATE phone=VALUES(phone);

INSERT INTO farmer_roles (farmer_id, role_id) VALUES (1, 1) ON DUPLICATE KEY UPDATE farmer_id=VALUES(farmer_id);

-- CROPS DATA
INSERT INTO crops (id, name_en, name_or, name_hi, scientific_name, season, duration_days, suitable_soil_types, water_requirements, icon) VALUES
(1, 'Rice / Paddy', 'ଧାନ', 'धान', 'Oryza sativa', 'Kharif', 135, 'Clay Loam, Alluvial', '1200-1400 mm standing water', '🌾'),
(2, 'Tomato', 'ବିଲାତି ବାଇଗଣ (ଟମାଟୋ)', 'टमाटर', 'Solanum lycopersicum', 'Rabi', 110, 'Sandy Loam, Well-drained Red Loam', 'Drip / 400-600 mm', '🍅'),
(3, 'Potato', 'ଆଳୁ', 'आलू', 'Solanum tuberosum', 'Rabi', 90, 'Loose Sandy Loam rich in organic matter', 'Frequent light irrigation / 350-500 mm', '🥔'),
(4, 'Maize / Corn', 'ମକା', 'मक्का', 'Zea mays', 'Kharif/Rabi', 105, 'Well-drained deep loamy soil', '500-700 mm avoiding waterlogging', '🌽'),
(5, 'Groundnut', 'ଚିନାବାଦାମ', 'मूंगफली', 'Arachis hypogaea', 'Rabi', 120, 'Sandy, Sandy Loam with good calcium', '350-500 mm at pegging stage', '🥜'),
(6, 'Green Gram (Moong)', 'ମୁଗ', 'मूंग', 'Vigna radiata', 'Summer/Rabi', 65, 'Loamy to clay loam', 'Minimal (2-3 irrigations)', '🌱')
ON DUPLICATE KEY UPDATE id=VALUES(id);

-- PLANT DISEASES
INSERT INTO plant_diseases (id, crop_id, disease_name_en, disease_name_or, disease_name_hi, pathogen_type, scientific_name, symptoms_en, symptoms_or, causes_en, causes_or, severity_level, official_reference) VALUES
(1, 1, 'Rice Blast', 'ଧାନ ବ୍ଲାଷ୍ଟ୍ ରୋଗ', 'धान का झुलसा', 'Fungal', 'Magnaporthe oryzae', 'Spindle-shaped elliptical lesions with gray centers; blackened neck node causing chaffy grain.', 'ପତ୍ରରେ ଧାରୁଆ କଳା-ବାଦାମୀ ଦାଗ ଏବଂ କେଣ୍ଡା ମୂଳ କଳା ପଡ଼ି ଧାନ ଶୁଖିଯାଏ।', 'Excessive urea application, high humidity (>90%) with cool nights.', 'ଅତ୍ୟଧିକ ୟୁରିଆ ଏବଂ କୁହୁଡ଼ିଆ ପାଗରେ କବକ ବୃଦ୍ଧି।', 'HIGH', 'OUAT Crop Protection Guide'),
(2, 1, 'Bacterial Leaf Blight', 'ଜୀବାଣୁଜନିତ ପତ୍ରପୋଡ଼ା', 'जीवाणु पत्ती झुलसा', 'Bacterial', 'Xanthomonas oryzae pv. oryzae', 'Wavy marginal leaf drying with bacterial ooze in mornings.', 'ପତ୍ରର ଧାର କଡ଼ରୁ ହଳଦିଆ ହୋଇ ତଳକୁ ଶୁଖିଆସେ।', 'High nitrogen, storm winds, stagnant water.', 'ପବନ, ବର୍ଷା ଓ କ୍ଷେତରେ ଅଧିକ ପାଣି ଜମି ରହିବା।', 'HIGH', 'NRRI Cuttack Advisory'),
(3, 2, 'Early Blight', 'ଅଗୁଆ ପତ୍ରପୋଡ଼ା', 'अगेती झुलसा', 'Fungal', 'Alternaria solani', 'Target board circular lesions with yellow concentric rings on lower foliage.', 'ତଳ ପତ୍ରରେ ଗୋଲାକାର ଟାର୍ଗେଟ୍ ଭଳି ବାଦାମୀ ଦାଗ।', 'Foliar wetness, temperature 24-29°C.', 'ପତ୍ର ଓଦା ରହିବା ଓ ଅନୁକୂଳ ତାପମାତ୍ରା।', 'MODERATE', 'IIHR Bangalore Package of Practices'),
(4, 3, 'Late Blight', 'ପଛୁଆ ପତ୍ରପୋଡ଼ା', 'पछेती झुलसा', 'Fungal/Oomycete', 'Phytophthora infestans', 'Rapid water-soaked lesions turning purplish black with white fungal down on lower leaf surface.', 'ପତ୍ରରେ କଳା ପାଣିଚିଆ ଦାଗ, ପତ୍ର ତଳେ ଧଳା କବକ ଓ ଦ୍ରୁତ ପଚନ।', 'Dense winter fog, continuous dew, temperatures 10-18°C.', 'କୁହୁଡ଼ି ଓ ଅତ୍ୟଧିକ କାକର।', 'HIGH', 'CPRI Shimla Bulletins')
ON DUPLICATE KEY UPDATE id=VALUES(id);

-- TREATMENTS
INSERT INTO treatments (id, disease_id, treatment_name, treatment_name_or, treatment_type, purpose, application_method, dosage, application_precautions, safety_information, is_organic, is_verified, official_reference) VALUES
(1, 1, 'Tricyclazole 75% WP', 'ଟ୍ରାଇସାଇକ୍ଲାଜୋଲ୍ ୭୫% WP', 'Chemical', 'Systemic preventive & curative control of leaf and neck blast', 'Foliar spray using knapsack sprayer with hollow cone nozzle', '0.6 g per Litre of water (120 g/acre)', 'Spray during early morning or late afternoon. Do not spray during direct intense sun or before rain.', 'Wear rubber gloves and mask. Keep away from livestock and water bodies.', FALSE, TRUE, 'OUAT Integrated Pest Management Schedule'),
(2, 1, 'Neem Oil (Azadirachtin 5000 ppm) + Pseudomonas fluorescens', 'ନିମ୍ବ ତେଲ + ସୁଡୋମୋନାସ ଫ୍ଲୋରେସେନ୍ସ', 'Organic', 'Organic biocontrol inhibiting fungal spore germination', 'Foliar spray mixed with mild khadi soap emulsifier', '3 mL Neem Oil + 5 g Pseudomonas per Litre water', 'Shake vigorously before spraying. Best applied preventively or at first sign of disease.', 'Safe for beneficial pollinators, honeybees, and earthworms.', TRUE, TRUE, 'National Centre for Organic and Natural Farming (NCONF)'),
(3, 2, 'Copper Hydroxide 77% WP + Streptocycline', 'କପର ହାଇଡ୍ରୋକ୍ସାଇଡ୍ + ଷ୍ଟ୍ରେପ୍ଟୋସାଇକ୍ଲିନ୍', 'Chemical', 'Bactericidal contact and systemic disinfection of bacterial blight', 'Foliar spray with thorough lower and upper leaf coverage', '2 g Copper Hydroxide + 0.1 g Streptocycline per Litre water', 'Drain field water for 3 days before spraying to allow aeration.', 'Toxic to aquatic organisms. Do not discard leftover spray wash in fish ponds.', FALSE, TRUE, 'Directorate of Agriculture, Odisha Guidelines'),
(4, 3, 'Mancozeb 75% WP', 'ମାଙ୍କୋଜେବ୍ ୭୫% WP', 'Chemical', 'Broad-spectrum contact protective fungicide', 'Uniform foliar spray at 10-day intervals', '2.5 g per Litre water (500 g/acre)', 'Ensure coverage of underside of leaves where spores reside.', 'Pre-harvest interval: 7 days before fruit plucking.', FALSE, TRUE, 'Central Insecticides Board & Registration Committee (CIBRC)')
ON DUPLICATE KEY UPDATE id=VALUES(id);

-- FERTILIZERS
INSERT INTO fertilizers (id, name, name_or, fertilizer_type, npk_ratio, dosage_per_acre, application_method, application_stage, precautions, is_organic, official_reference) VALUES
(1, 'Neem Coated Urea', 'ନିମ୍ବ ଲିପ୍ତ ୟୁରିଆ', 'Inorganic', '46-0-0', '65-80 kg/acre', 'Broadcasting in split doses', 'Basal, Tillering, Panicle Initiation', 'Apply only when field foliage is dry. Never apply on wet leaves.', FALSE, 'Fertilizer Control Order, Govt of India'),
(2, 'Single Super Phosphate (SSP)', 'ସିଙ୍ଗଲ୍ ସୁପର ଫସଫେଟ୍ (SSP)', 'Inorganic', '0-16-0 + 11% Sulphur', '100 kg/acre', 'Basal incorporation during final land preparation', 'Land Preparation', 'Must be incorporated into root zone depth; do not surface broadcast.', FALSE, 'OUAT Fertilizer Recommendations'),
(3, 'Muriate of Potash (MOP)', 'ମ୍ୟୁରେଟ୍ ଅଫ୍ ପଟାସ୍ (MOP)', 'Inorganic', '0-0-60', '25-30 kg/acre', '50% Basal + 50% at Panicle Initiation', 'Tillering & Flowering', 'Essential for drought tolerance, disease defense, and grain filling.', FALSE, 'ICAR-NRRI Guidelines'),
(4, 'Vermicompost (Earthworm Compost)', 'ଜିଆ ଖତ (ଭର୍ମିକମ୍ପୋଷ୍ଟ୍)', 'Organic', '1.5-1.0-1.5 + Micronutrients', '1.5 to 2.0 Tons/acre', 'Soil incorporation before sowing', 'Primary Tillage', 'Store in cool shaded place; maintain 20-30% moisture.', TRUE, 'Odisha Organic Farming Policy')
ON DUPLICATE KEY UPDATE id=VALUES(id);
