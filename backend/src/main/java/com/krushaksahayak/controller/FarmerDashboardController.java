package com.krushaksahayak.controller;

import com.krushaksahayak.dto.FarmerDashboardDTO;
import com.krushaksahayak.entity.CropCalendar;
import com.krushaksahayak.entity.Farmer;
import com.krushaksahayak.entity.FarmingActivity;
import com.krushaksahayak.entity.PlantAnalysis;
import com.krushaksahayak.entity.SoilAnalysis;
import com.krushaksahayak.repository.*;
import com.krushaksahayak.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/farmer")
public class FarmerDashboardController {

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private PlantAnalysisRepository plantAnalysisRepository;

    @Autowired
    private SoilAnalysisRepository soilAnalysisRepository;

    @Autowired
    private CropCalendarRepository cropCalendarRepository;

    @Autowired
    private FarmingActivityRepository farmingActivityRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @GetMapping("/dashboard")
    public ResponseEntity<FarmerDashboardDTO> getDashboardData(
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        Long farmerId = 1L; // Fallback to seeded Ramesh Chandra Sahoo
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (tokenProvider.validateToken(token)) {
                try {
                    farmerId = tokenProvider.getUserIdFromJWT(token);
                } catch (Exception ignored) {}
            }
        }

        Farmer farmer = farmerRepository.findById(farmerId).orElseGet(() -> {
            Farmer f = new Farmer();
            f.setFullName("ରମେଶ ଚନ୍ଦ୍ର ସାହୁ (Ramesh Chandra Sahoo)");
            f.setDistrict("Cuttack");
            return f;
        });

        long plantCount = plantAnalysisRepository.countByFarmerId(farmerId);
        long soilCount = soilAnalysisRepository.countByFarmerId(farmerId);

        FarmerDashboardDTO dto = new FarmerDashboardDTO();
        dto.setFarmerName(farmer.getFullName());
        dto.setDistrict(farmer.getDistrict());
        dto.setWelcomeMessage("ନମସ୍କାର, " + farmer.getFullName() + "! ଆପଣଙ୍କ କୃଷି ଡ୍ୟାସବୋର୍ଡକୁ ସ୍ୱାଗତ।");
        dto.setTotalPlantAnalyses(plantCount);
        dto.setTotalSoilAnalyses(soilCount);

        // Daily Farming Tips
        List<String> tipsEn = List.of(
            "Avoid top-dressing urea during continuous rainy or cloudy periods to minimize fungal blast outbreak.",
            "Apply neem cake @ 100 kg/acre to reduce soil-borne nematodes and enhance microbial health.",
            "Inspect underside of leaves early morning between 7:00 AM and 9:00 AM for earliest disease symptoms."
        );
        List<String> tipsOr = List.of(
            "ବର୍ଷା କିମ୍ବା ବାଦଲିଆ ପାଗରେ ୟୁରିଆ ସାର ପ୍ରୟୋଗ ବନ୍ଦ ରଖନ୍ତୁ, ଯାହାଦ୍ୱାରା ଧାନ ବ୍ଲାଷ୍ଟ୍ ରୋଗ ଆଶଙ୍କା ହ୍ରାସ ପାଇବ।",
            "ଏକର ପ୍ରତି ୧୦୦ କିଲୋ ନିମ୍ବ ପିଡ଼ିଆ ପ୍ରୟୋଗ କଲେ ମାଟିରେ ଉପକାରୀ ଜୀବାଣୁ ବୃଦ୍ଧି ପାଏ ଓ ନେମାଟୋଡ୍ କବଳରୁ ମୁକ୍ତି ମିଳେ।",
            "ରୋଗ ଲକ୍ଷଣର ପ୍ରାରମ୍ଭିକ ଯାଞ୍ଚ ପାଇଁ ସକାଳ ୭ ରୁ ୯ ଟା ମଧ୍ୟରେ ପତ୍ରର ତଳ ପାଖ ଯାଞ୍ଚ କରନ୍ତୁ।"
        );
        dto.setDailyFarmingTips(tipsEn);
        dto.setDailyFarmingTipsOr(tipsOr);

        // Weather snapshot
        Map<String, Object> weather = new HashMap<>();
        weather.put("district", farmer.getDistrict());
        weather.put("temperature", "31.5°C");
        weather.put("humidity", "74%");
        weather.put("condition", "Partly Cloudy / ଆଂଶିକ ବେଘାଛନ୍ନ");
        weather.put("rainfallForecast", "12 mm (Scattered Light Showers)");
        weather.put("windSpeed", "14 km/h");
        weather.put("advisory", "Avoid pesticide spraying today due to expected afternoon rain showers.");
        weather.put("advisory_or", "ଅପରାହ୍ନରେ ସାମାନ୍ୟ ବର୍ଷା ସମ୍ଭାବନା ଥିବାରୁ କୀଟନାଶକ ସିଞ୍ଚନ ଆଜି ସ୍ଥଗିତ ରଖନ୍ତୁ।");
        dto.setCurrentWeather(weather);

        // Recent analysis history
        List<Map<String, Object>> history = new ArrayList<>();
        List<PlantAnalysis> recentPlants = plantAnalysisRepository.findByFarmerIdOrderByCreatedAtDesc(farmerId);
        for (int i = 0; i < Math.min(3, recentPlants.size()); i++) {
            PlantAnalysis pa = recentPlants.get(i);
            Map<String, Object> item = new HashMap<>();
            item.put("type", "PLANT");
            item.put("id", pa.getId());
            item.put("name", pa.getCropName() + " - " + pa.getDiseaseName());
            item.put("name_or", (pa.getCropNameOr() != null ? pa.getCropNameOr() : pa.getCropName()) + " - " + (pa.getDiseaseNameOr() != null ? pa.getDiseaseNameOr() : pa.getDiseaseName()));
            item.put("confidence", (pa.getConfidenceScore().doubleValue() * 100) + "%");
            item.put("healthStatus", pa.getHealthStatus());
            item.put("date", pa.getCreatedAt().toString());
            item.put("imageUrl", pa.getImageUrl());
            history.add(item);
        }

        List<SoilAnalysis> recentSoils = soilAnalysisRepository.findByFarmerIdOrderByCreatedAtDesc(farmerId);
        for (int i = 0; i < Math.min(3, recentSoils.size()); i++) {
            SoilAnalysis sa = recentSoils.get(i);
            Map<String, Object> item = new HashMap<>();
            item.put("type", "SOIL");
            item.put("id", sa.getId());
            item.put("name", sa.getPreliminarySoilType());
            item.put("name_or", sa.getSoilTypeOr() != null ? sa.getSoilTypeOr() : sa.getPreliminarySoilType());
            item.put("color", sa.getSoilColor());
            item.put("date", sa.getCreatedAt().toString());
            item.put("imageUrl", sa.getImageUrl());
            history.add(item);
        }
        dto.setRecentHistory(history);

        // Upcoming Activities
        List<Map<String, Object>> activities = new ArrayList<>();
        Optional<CropCalendar> calOpt = cropCalendarRepository.findTopByFarmerIdAndStatusOrderByCreatedAtDesc(farmerId, "ACTIVE");
        if (calOpt.isPresent()) {
            List<FarmingActivity> acts = farmingActivityRepository.findByCalendarIdAndIsCompletedFalseOrderByDueDateAsc(calOpt.get().getId());
            for (int i = 0; i < Math.min(4, acts.size()); i++) {
                FarmingActivity a = acts.get(i);
                Map<String, Object> actMap = new HashMap<>();
                actMap.put("id", a.getId());
                actMap.put("stage", a.getStageName());
                actMap.put("stage_or", a.getStageNameOr());
                actMap.put("title", a.getActivityTitle());
                actMap.put("title_or", a.getActivityTitleOr());
                actMap.put("dueDate", a.getDueDate().toString());
                actMap.put("isCompleted", a.getIsCompleted());
                activities.add(actMap);
            }
        } else {
            // Default active tasks
            Map<String, Object> d1 = new HashMap<>();
            d1.put("id", 101);
            d1.put("stage", "Tillering Stage");
            d1.put("stage_or", "ପିଲ ବାହାରିବା ସମୟ");
            d1.put("title", "Apply 1st Split of Potash (MOP) and Neem Coated Urea");
            d1.put("title_or", "ପ୍ରଥମ କିସ୍ତି ପଟାସ ଓ ନିମ୍ବ ୟୁରିଆ ସାର ପ୍ରୟୋଗ କରନ୍ତୁ");
            d1.put("dueDate", "2026-11-18");
            d1.put("isCompleted", false);
            activities.add(d1);

            Map<String, Object> d2 = new HashMap<>();
            d2.put("id", 102);
            d2.put("stage", "Pest & Disease Monitoring");
            d2.put("stage_or", "ରୋଗ ଓ ପୋକ ଯାଞ୍ଚ");
            d2.put("title", "Install Yellow Sticky Traps for Stem Borer Surveillance");
            d2.put("title_or", "କାଣ୍ଡବିନ୍ଧା ପୋକ ନିୟନ୍ତ୍ରଣ ପାଇଁ ହଳଦିଆ ଷ୍ଟିକି ଟ୍ରାପ୍ ଲଗାନ୍ତୁ");
            d2.put("dueDate", "2026-11-20");
            d2.put("isCompleted", false);
            activities.add(d2);
        }
        dto.setUpcomingActivities(activities);

        return ResponseEntity.ok(dto);
    }
}
