-- ============================================================================
-- SMART FARMING PLATFORM - COMPLETE MYSQL DATABASE SCHEMA
-- Compatible with MySQL 8.0+ and Spring Boot JPA
-- ============================================================================

CREATE DATABASE IF NOT EXISTS smart_farming_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smart_farming_db;

-- 1. ROLES TABLE
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. FARMERS TABLE
CREATE TABLE IF NOT EXISTS farmers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    state VARCHAR(100) DEFAULT 'Odisha',
    district VARCHAR(100) NOT NULL,
    block VARCHAR(100),
    village VARCHAR(100),
    land_size_acres DECIMAL(6, 2) DEFAULT 1.0,
    primary_soil_type VARCHAR(100),
    preferred_language VARCHAR(10) DEFAULT 'or',
    has_ration_card BOOLEAN DEFAULT TRUE,
    annual_income DECIMAL(12, 2) DEFAULT 40000.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_farmer_phone (phone),
    INDEX idx_farmer_district (district)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. FARMER ROLES JUNCTION TABLE
CREATE TABLE IF NOT EXISTS farmer_roles (
    farmer_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (farmer_id, role_id),
    CONSTRAINT fk_farmer_roles_farmer FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE,
    CONSTRAINT fk_farmer_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    designation VARCHAR(100) DEFAULT 'Agricultural Extension Officer',
    department VARCHAR(150) DEFAULT 'Department of Agriculture & Farmers Empowerment, Odisha',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. CROPS TABLE
CREATE TABLE IF NOT EXISTS crops (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_or VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(150),
    season VARCHAR(50) NOT NULL, -- Kharif, Rabi, Zaid
    duration_days INT NOT NULL,
    suitable_soil_types VARCHAR(255),
    water_requirements VARCHAR(255),
    icon VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. PLANT DISEASES TABLE
CREATE TABLE IF NOT EXISTS plant_diseases (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    crop_id BIGINT NOT NULL,
    disease_name_en VARCHAR(150) NOT NULL,
    disease_name_or VARCHAR(150) NOT NULL,
    disease_name_hi VARCHAR(150) NOT NULL,
    pathogen_type VARCHAR(50), -- Fungal, Bacterial, Viral, Nematode
    scientific_name VARCHAR(150),
    symptoms_en TEXT NOT NULL,
    symptoms_or TEXT NOT NULL,
    causes_en TEXT,
    causes_or TEXT,
    severity_level VARCHAR(20) DEFAULT 'MODERATE', -- LOW, MODERATE, HIGH
    prevention_methods_en TEXT,
    prevention_methods_or TEXT,
    official_reference VARCHAR(255),
    CONSTRAINT fk_disease_crop FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. TREATMENTS TABLE
CREATE TABLE IF NOT EXISTS treatments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    disease_id BIGINT NOT NULL,
    treatment_name VARCHAR(200) NOT NULL,
    treatment_name_or VARCHAR(200),
    treatment_type VARCHAR(50) NOT NULL, -- Chemical, Organic, Cultural
    purpose TEXT NOT NULL,
    application_method TEXT NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    application_precautions TEXT NOT NULL,
    safety_information TEXT NOT NULL,
    is_organic BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT TRUE,
    official_reference VARCHAR(255) NOT NULL,
    CONSTRAINT fk_treatment_disease FOREIGN KEY (disease_id) REFERENCES plant_diseases(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. FERTILIZERS TABLE
CREATE TABLE IF NOT EXISTS fertilizers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    name_or VARCHAR(150) NOT NULL,
    fertilizer_type VARCHAR(50) NOT NULL, -- Inorganic, Organic, Bio-fertilizer
    npk_ratio VARCHAR(50),
    dosage_per_acre VARCHAR(100) NOT NULL,
    application_method TEXT NOT NULL,
    application_stage VARCHAR(100),
    precautions TEXT NOT NULL,
    is_organic BOOLEAN DEFAULT FALSE,
    official_reference VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. PLANT ANALYSES TABLE (Farmer Analysis History)
CREATE TABLE IF NOT EXISTS plant_analyses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    crop_name VARCHAR(100) NOT NULL,
    crop_name_or VARCHAR(100),
    disease_name VARCHAR(200) NOT NULL,
    disease_name_or VARCHAR(200),
    confidence_score DECIMAL(5, 4) NOT NULL,
    health_status VARCHAR(50) NOT NULL,
    severity VARCHAR(50),
    visible_symptoms TEXT,
    possible_causes TEXT,
    recommended_treatment TEXT,
    organic_treatment TEXT,
    suitable_fertilizers TEXT,
    water_requirements TEXT,
    sunlight_requirements TEXT,
    prevention_methods TEXT,
    is_demonstration_mode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_plant_analysis_farmer FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE,
    INDEX idx_plant_farmer_date (farmer_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. SOIL ANALYSES TABLE (Farmer Soil Visual History)
CREATE TABLE IF NOT EXISTS soil_analyses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    preliminary_soil_type VARCHAR(150) NOT NULL,
    soil_type_or VARCHAR(150),
    soil_color VARCHAR(100) NOT NULL,
    visible_texture VARCHAR(150),
    organic_matter_status VARCHAR(150),
    surface_dryness VARCHAR(100),
    drainage_assessment VARCHAR(200),
    visual_observations TEXT,
    improvement_suggestions TEXT,
    next_steps TEXT,
    is_demonstration_mode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_soil_analysis_farmer FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE,
    INDEX idx_soil_farmer_date (farmer_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. SOIL TEST REPORTS TABLE (Lab Measurements)
CREATE TABLE IF NOT EXISTS soil_test_reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    soil_analysis_id BIGINT NULL,
    ph DECIMAL(4, 2) NOT NULL,
    nitrogen_kg_ha DECIMAL(7, 2),
    phosphorus_kg_ha DECIMAL(7, 2),
    potassium_kg_ha DECIMAL(7, 2),
    organic_carbon_percent DECIMAL(4, 2),
    electrical_conductivity_ds_m DECIMAL(5, 2),
    lab_report_file_url VARCHAR(500),
    target_crop VARCHAR(100) DEFAULT 'Paddy',
    ph_classification VARCHAR(100),
    fertilizer_schedule TEXT,
    soil_amendments TEXT,
    tested_at DATE DEFAULT (CURRENT_DATE),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_test_report_farmer FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE,
    CONSTRAINT fk_test_report_soil_analysis FOREIGN KEY (soil_analysis_id) REFERENCES soil_analyses(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. RECOMMENDATIONS TABLE
CREATE TABLE IF NOT EXISTS recommendations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    crop_id BIGINT,
    recommendation_type VARCHAR(50) NOT NULL, -- Fertilizer, Treatment, Irrigation, General
    title VARCHAR(200) NOT NULL,
    title_or VARCHAR(200),
    description TEXT NOT NULL,
    description_or TEXT,
    precautions TEXT,
    official_reference VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_recommendation_farmer FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE,
    CONSTRAINT fk_recommendation_crop FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. WEATHER RECORDS TABLE
CREATE TABLE IF NOT EXISTS weather_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    district VARCHAR(100) NOT NULL,
    temperature DECIMAL(5, 2) NOT NULL,
    humidity INT NOT NULL,
    rainfall_forecast_mm DECIMAL(6, 2) DEFAULT 0.0,
    wind_speed_kmh DECIMAL(5, 2) DEFAULT 0.0,
    condition_text VARCHAR(100) NOT NULL,
    alert_message TEXT,
    farming_advice TEXT,
    farming_advice_or TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_weather_district (district, recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. CROP CALENDARS TABLE
CREATE TABLE IF NOT EXISTS crop_calendars (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    crop_name VARCHAR(100) NOT NULL,
    crop_name_or VARCHAR(100),
    sowing_date DATE NOT NULL,
    location_district VARCHAR(100) NOT NULL,
    total_stages INT DEFAULT 9,
    current_stage_index INT DEFAULT 1,
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, COMPLETED, CANCELLED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_calendar_farmer FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 15. FARMING ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS farming_activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    calendar_id BIGINT NOT NULL,
    stage_name VARCHAR(100) NOT NULL,
    stage_name_or VARCHAR(100) NOT NULL,
    stage_order INT NOT NULL,
    activity_title VARCHAR(200) NOT NULL,
    activity_title_or VARCHAR(200) NOT NULL,
    activity_description TEXT,
    activity_description_or TEXT,
    due_date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    CONSTRAINT fk_activity_calendar FOREIGN KEY (calendar_id) REFERENCES crop_calendars(id) ON DELETE CASCADE,
    INDEX idx_calendar_activity_status (calendar_id, is_completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 16. ANALYSIS FEEDBACK TABLE
CREATE TABLE IF NOT EXISTS analysis_feedbacks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    analysis_type VARCHAR(50) NOT NULL, -- PLANT, SOIL
    analysis_id BIGINT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    is_accurate BOOLEAN NOT NULL,
    comments TEXT,
    reviewed_by_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_feedback_farmer FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
