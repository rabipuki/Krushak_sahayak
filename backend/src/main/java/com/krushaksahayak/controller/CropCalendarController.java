package com.krushaksahayak.controller;

import com.krushaksahayak.entity.CropCalendar;
import com.krushaksahayak.entity.Farmer;
import com.krushaksahayak.entity.FarmingActivity;
import com.krushaksahayak.repository.CropCalendarRepository;
import com.krushaksahayak.repository.FarmerRepository;
import com.krushaksahayak.repository.FarmingActivityRepository;
import com.krushaksahayak.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/calendar")
public class CropCalendarController {

    @Autowired
    private CropCalendarRepository calendarRepository;

    @Autowired
    private FarmingActivityRepository activityRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/create")
    public ResponseEntity<?> createCalendar(
            @RequestBody Map<String, String> payload,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        Long farmerId = 1L;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (tokenProvider.validateToken(token)) {
                try {
                    farmerId = tokenProvider.getUserIdFromJWT(token);
                } catch (Exception ignored) {}
            }
        }
        Farmer farmer = farmerRepository.findById(farmerId).orElseGet(() -> farmerRepository.findAll().stream().findFirst().orElse(null));
        if (farmer == null) {
            return ResponseEntity.badRequest().body("Farmer record not found");
        }

        String cropName = payload.getOrDefault("crop_name", "Paddy / ଧାନ");
        String sowingDateStr = payload.getOrDefault("sowing_date", LocalDate.now().toString());
        LocalDate sowingDate = LocalDate.parse(sowingDateStr);
        String district = payload.getOrDefault("district", farmer.getDistrict());

        CropCalendar cal = new CropCalendar();
        cal.setFarmer(farmer);
        cal.setCropName(cropName);
        cal.setCropNameOr(cropName.contains("Paddy") || cropName.contains("Rice") ? "ଧାନ" : "ଫସଲ");
        cal.setSowingDate(sowingDate);
        cal.setLocationDistrict(district);
        cal.setStatus("ACTIVE");

        CropCalendar savedCal = calendarRepository.save(cal);

        // Standard 9 growth stage activities
        List<FarmingActivity> activities = new ArrayList<>();
        activities.add(createActivity(savedCal, 1, "Land Preparation", "ଜମି ପ୍ରସ୍ତୁତି", "Deep summer plowing and incorporation of 2.5 tons/acre Farm Yard Manure.", "ଜମିକୁ ୨-୩ ଥର ଗଭୀର ଚାଷ କରି ଏକର ପ୍ରତି ୨-୩ ଟନ୍ ଗୋବର ଖତ ମିଶାନ୍ତୁ।", sowingDate.minusDays(10)));
        activities.add(createActivity(savedCal, 2, "Seed Selection & Treatment", "ବିହନ ଚୟନ ଓ ବିଶୋଧନ", "Treat certified seeds with Carbendazim @ 2g/kg or Trichoderma viride @ 5g/kg seed.", "ପ୍ରମାଣିତ ବିହନକୁ କାର୍ବାଣ୍ଡାଜିମ୍ (୨ ଗ୍ରାମ/କେଜି) କିମ୍ବା ଟ୍ରାଇକୋଡର୍ମାରେ ବିଶୋଧନ କରନ୍ତୁ।", sowingDate.minusDays(2)));
        activities.add(createActivity(savedCal, 3, "Sowing / Nursery Raising", "ବିହନ ବୁଣା / ତଳି ପ୍ରସ୍ତୁତି", "Sow pre-germinated seeds in raised nursery beds or direct line sowing in prepared main field.", "ତଳି ଘାରେ ବିହନ ବୁଣନ୍ତୁ ଏବଂ ସମାନ ଭାବେ ପାଣି ମଡ଼ାନ୍ତୁ।", sowingDate));
        activities.add(createActivity(savedCal, 4, "Germination & Nursery Care", "ଗଜା ହେବା ଓ ଚାରା ଯତ୍ନ", "Maintain thin layer of water; spray Chlorpyrifos 20% EC @ 2 mL/L if thrips appear.", "ତଳିଘାରେ ହାଲୁକା ପାଣି ରଖନ୍ତୁ ଏବଂ ପତ୍ରପୋଡ଼ା ବା ଶୋଷକ ପୋକ ଯାଞ୍ଚ କରନ୍ତୁ।", sowingDate.plusDays(10)));
        activities.add(createActivity(savedCal, 5, "Transplanting / Thinning", "ଚାରା ରୋପଣ (ରୁଆ)", "Transplant 21-25 days old seedlings at 20x15 cm spacing with 2 seedlings per hill.", "୨୧-୨୫ ଦିନର ତଳିକୁ ୨୦x୧୫ ସେମି ଦୂରତାରେ ଗୋଟିଏ ଗାତରେ ୨ଟି କରି ରୋପଣ କରନ୍ତୁ।", sowingDate.plusDays(25)));
        activities.add(createActivity(savedCal, 6, "Fertilizer Application (1st Split)", "ସାର ପ୍ରୟୋଗ (ପ୍ରଥମ କିସ୍ତି)", "Apply 1st top dressing of Neem Coated Urea @ 25 kg/acre + MOP @ 15 kg/acre.", "ପ୍ରଥମ କିସ୍ତି ୟୁରିଆ (୨୫ କେଜି/ଏକର) ଏବଂ ପଟାସ ସାର ପ୍ରୟୋଗ କରନ୍ତୁ।", sowingDate.plusDays(40)));
        activities.add(createActivity(savedCal, 7, "Pest & Disease Monitoring", "କୀଟ ଓ ରୋଗ ନିରୀକ୍ଷଣ", "Inspect for yellow stem borer egg masses and rice blast spindle lesions on foliage.", "କାଣ୍ଡବିନ୍ଧା ପୋକ ଓ ବ୍ଲାଷ୍ଟ୍ ରୋଗ ଲକ୍ଷଣ ଅଛି କି ନାହିଁ ନିୟମିତ ଯାଞ୍ଚ କରନ୍ତୁ।", sowingDate.plusDays(60)));
        activities.add(createActivity(savedCal, 8, "Grain Filling & Irrigation", "ଦାନା ପୂରଣ ଓ ଜଳସେଚନ", "Ensure standing water (3-5 cm) during flowering and milk stages; drain 10 days before harvest.", "କେଣ୍ଡା ବାହାରିବା ଓ ଧାନ କ୍ଷୀର ଧରିବା ସମୟରେ ପାଣି ରଖନ୍ତୁ; କାଟିବା ପୂର୍ବରୁ ପାଣି କାଢ଼ନ୍ତୁ।", sowingDate.plusDays(95)));
        activities.add(createActivity(savedCal, 9, "Harvesting & Threshing", "ଫସଲ ଅମଳ", "Harvest when 85-90% grains turn golden yellow. Sun-dry grains to 12-14% moisture before storage.", "୮୫-୯୦% ଧାନ ସୁନେଲି ହେଲେ ଅମଳ କରନ୍ତୁ ଏବଂ ଖରାରେ ଶୁଖାଇ ସାଇତି ରଖନ୍ତୁ।", sowingDate.plusDays(125)));

        activityRepository.saveAll(activities);

        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("calendar_id", savedCal.getId());
        resp.put("crop_name", savedCal.getCropName());
        resp.put("activities_count", activities.size());
        return ResponseEntity.ok(resp);
    }

    private FarmingActivity createActivity(CropCalendar cal, int order, String stage, String stageOr, String desc, String descOr, LocalDate dueDate) {
        FarmingActivity fa = new FarmingActivity();
        fa.setCalendar(cal);
        fa.setStageOrder(order);
        fa.setStageName(stage);
        fa.setStageNameOr(stageOr);
        fa.setActivityTitle(stage + " Tasks");
        fa.setActivityTitleOr(stageOr + " କାର୍ଯ୍ୟ");
        fa.setActivityDescription(desc);
        fa.setActivityDescriptionOr(descOr);
        fa.setDueDate(dueDate);
        fa.setIsCompleted(false);
        return fa;
    }

    @GetMapping("/current")
    public ResponseEntity<?> getActiveCalendar(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long farmerId = 1L;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (tokenProvider.validateToken(token)) {
                try {
                    farmerId = tokenProvider.getUserIdFromJWT(token);
                } catch (Exception ignored) {}
            }
        }

        Optional<CropCalendar> calOpt = calendarRepository.findTopByFarmerIdAndStatusOrderByCreatedAtDesc(farmerId, "ACTIVE");
        if (calOpt.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyMap());
        }

        CropCalendar cal = calOpt.get();
        List<FarmingActivity> activities = activityRepository.findByCalendarIdOrderByStageOrderAsc(cal.getId());

        long completedCount = activities.stream().filter(FarmingActivity::getIsCompleted).count();
        int progress = activities.isEmpty() ? 0 : (int) ((completedCount * 100) / activities.size());

        Map<String, Object> result = new HashMap<>();
        result.put("calendar", cal);
        result.put("activities", activities);
        result.put("progress_percentage", progress);
        result.put("completed_count", completedCount);
        result.put("total_count", activities.size());

        return ResponseEntity.ok(result);
    }

    @PostMapping("/activity/{id}/toggle")
    public ResponseEntity<?> toggleActivityCompletion(@PathVariable Long id) {
        Optional<FarmingActivity> actOpt = activityRepository.findById(id);
        if (actOpt.isPresent()) {
            FarmingActivity a = actOpt.get();
            boolean newStatus = !a.getIsCompleted();
            a.setIsCompleted(newStatus);
            a.setCompletedAt(newStatus ? LocalDateTime.now() : null);
            activityRepository.save(a);

            Map<String, Object> resp = new HashMap<>();
            resp.put("success", true);
            resp.put("id", a.getId());
            resp.put("is_completed", a.getIsCompleted());
            return ResponseEntity.ok(resp);
        }
        return ResponseEntity.notFound().build();
    }
}
