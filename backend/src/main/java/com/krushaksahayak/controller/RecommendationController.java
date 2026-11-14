package com.krushaksahayak.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @GetMapping("/fertilizer")
    public ResponseEntity<?> getFertilizerRecommendation(
            @RequestParam(value = "crop", defaultValue = "Paddy") String crop,
            @RequestParam(value = "soil_type", defaultValue = "Alluvial Loam") String soilType,
            @RequestParam(value = "growth_stage", defaultValue = "Tillering") String growthStage,
            @RequestParam(value = "land_area", defaultValue = "1.0") Double landArea
    ) {
        Map<String, Object> response = new HashMap<>();
        response.put("crop", crop);
        response.put("soil_type", soilType);
        response.put("growth_stage", growthStage);
        response.put("land_area_acres", landArea);

        List<Map<String, Object>> plans = new ArrayList<>();

        Map<String, Object> p1 = new HashMap<>();
        p1.put("product_name", "Neem Coated Urea (୪୬% ନାଇଟ୍ରୋଜେନ୍)");
        p1.put("nutrient", "Nitrogen (N)");
        p1.put("dosage", Math.round(25 * landArea) + " kg");
        p1.put("purpose", "Promotes vigorous tillering and leaf chlorophyll synthesis.");
        p1.put("purpose_or", "ଗଛର ଶାଖା ପ୍ରଶାଖା (ପିଲ) ବୃଦ୍ଧି ଏବଂ ସବୁଜ ପତ୍ର ଗଠନ ପାଇଁ।");
        p1.put("application_method", "Even broadcast in standing water (2-3 cm); foliage must be dry.");
        p1.put("precautions", "Do not apply before rainstorm or directly onto wet leaf blades.");
        p1.put("is_organic", false);
        p1.put("official_ref", "OUAT Package of Practices for Rice");
        plans.add(p1);

        Map<String, Object> p2 = new HashMap<>();
        p2.put("product_name", "Muriate of Potash - MOP (୬୦% ପଟାସ୍)");
        p2.put("nutrient", "Potassium (K)");
        p2.put("dosage", Math.round(15 * landArea) + " kg");
        p2.put("purpose", "Enhances stem strength, drought resistance, and disease defense.");
        p2.put("purpose_or", "ଗଛକୁ କାଣ୍ଡବିନ୍ଧା ଓ ବ୍ଲାଷ୍ଟ୍ ରୋଗ ଦାଉରୁ ରକ୍ଷା କରିବା ସହ ଦାନା ପୂଷ୍ଟ କରେ।");
        p2.put("application_method", "Broadcast and incorporate gently into the topsoil.");
        p2.put("precautions", "Split application yields 25% higher efficiency than single basal dose.");
        p2.put("is_organic", false);
        p2.put("official_ref", "ICAR-NRRI Cuttack Guidelines");
        plans.add(p2);

        Map<String, Object> p3 = new HashMap<>();
        p3.put("product_name", "Vermicompost / ଜିଆ ଖତ");
        p3.put("nutrient", "Organic Carbon & Multi-Microelements");
        p3.put("dosage", Math.round(500 * landArea) + " kg");
        p3.put("purpose", "Restores beneficial mycorrhizal fungi and soil humus.");
        p3.put("purpose_or", "ମାଟିର ଉର୍ବରତା ଓ ଜୈବିକ ଅଙ୍ଗାର ବୃଦ୍ଧି କରେ।");
        p3.put("application_method", "Soil incorporation around the rhizosphere.");
        p3.put("precautions", "Keep moist during storage; protect from extreme solar heating.");
        p3.put("is_organic", true);
        p3.put("official_ref", "Odisha State Organic Farming Board");
        plans.add(p3);

        response.put("recommendations", plans);
        response.put("general_precautions", List.of(
            "Always follow official ICAR/OUAT recommended dosage based on your actual land size.",
            "Maintain adequate soil moisture before chemical top-dressing.",
            "Do not mix single super phosphate directly with zinc sulphate."
        ));

        return ResponseEntity.ok(response);
    }
}
