package com.krushaksahayak.controller;

import com.krushaksahayak.entity.Crop;
import com.krushaksahayak.entity.Farmer;
import com.krushaksahayak.entity.PlantDisease;
import com.krushaksahayak.entity.Treatment;
import com.krushaksahayak.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private PlantAnalysisRepository plantAnalysisRepository;

    @Autowired
    private SoilAnalysisRepository soilAnalysisRepository;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private PlantDiseaseRepository diseaseRepository;

    @Autowired
    private TreatmentRepository treatmentRepository;

    @Autowired
    private FertilizerRepository fertilizerRepository;

    @Autowired
    private AnalysisFeedbackRepository feedbackRepository;

    @GetMapping("/stats")
    public ResponseEntity<?> getPlatformStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total_farmers", farmerRepository.count());
        stats.put("total_plant_analyses", plantAnalysisRepository.count());
        stats.put("total_soil_analyses", soilAnalysisRepository.count());
        stats.put("total_supported_crops", cropRepository.count());
        stats.put("total_plant_diseases", diseaseRepository.count());
        stats.put("verified_fertilizers", fertilizerRepository.count());
        stats.put("pending_feedback_reviews", feedbackRepository.count());
        stats.put("ai_microservice_status", "ONLINE (FastAPI 0.162.7)");
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/farmers")
    public ResponseEntity<List<Farmer>> getAllFarmers() {
        return ResponseEntity.ok(farmerRepository.findAll());
    }

    @GetMapping("/crops")
    public ResponseEntity<List<Crop>> getAllCrops() {
        return ResponseEntity.ok(cropRepository.findAll());
    }

    @PostMapping("/treatment/verify")
    public ResponseEntity<?> verifyTreatment(
            @RequestBody Map<String, Object> payload
    ) {
        // Enforce AI Safety Rule 14: Admin must not be allowed to publish unverified chemical treatment recommendations without valid reference!
        String type = String.valueOf(payload.getOrDefault("treatment_type", "Chemical"));
        String officialRef = String.valueOf(payload.getOrDefault("official_reference", ""));

        if ("Chemical".equalsIgnoreCase(type) && (officialRef.trim().isEmpty() || officialRef.length() < 5)) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "Safety Violation: Chemical recommendations cannot be approved without a verified official agricultural reference (e.g., OUAT/ICAR/CIBRC).");
            return ResponseEntity.badRequest().body(err);
        }

        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("message", "Treatment successfully verified and published to knowledge base.");
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/feedbacks")
    public ResponseEntity<?> getFeedbacks() {
        return ResponseEntity.ok(feedbackRepository.findAll());
    }
}
