package com.krushaksahayak.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    // District-specific live meteorological simulation matching Odisha coastal and interior agro-climatic zones
    private static final Map<String, Map<String, Object>> ODISHA_DISTRICT_WEATHER = new HashMap<>();

    static {
        Map<String, Object> cuttack = new HashMap<>();
        cuttack.put("district", "Cuttack (କଟକ)");
        cuttack.put("temperature", "31.8°C");
        cuttack.put("temp_min", "23.4°C");
        cuttack.put("temp_max", "33.2°C");
        cuttack.put("humidity", "76%");
        cuttack.put("rainfall_forecast", "8.5 mm (Light evening showers)");
        cuttack.put("wind_speed", "12 km/h (South-Easterly)");
        cuttack.put("uv_index", "6 (Moderate)");
        cuttack.put("condition", "Partly Cloudy");
        cuttack.put("condition_or", "ଆଂଶିକ ମେଘୁଆ");
        cuttack.put("farming_advisories", List.of(
            "Avoid foliar pesticide spraying after 2:00 PM due to high probability of scattered rain showers.",
            "Maintain optimal drainage in rice nurseries to avoid water stagnation and damping off.",
            "Suitable time for transplanting Kharif paddy seedlings as soil moisture is optimum."
        ));
        cuttack.put("farming_advisories_or", List.of(
            "ଅପରାହ୍ନ ୨ଟା ପରେ ବର୍ଷା ଆଶଙ୍କା ଥିବାରୁ କୀଟନାଶକ ସିଞ୍ଚନ ବନ୍ଦ ରଖନ୍ତୁ।",
            "ଧାନ ତଳିଘାରେ ଅତିରିକ୍ତ ପାଣି ଜମିବାକୁ ନଦେଇ ନିଷ୍କାସନ ବ୍ୟବସ୍ଥା ସୁନିଶ୍ଚିତ କରନ୍ତୁ।",
            "ମାଟିରେ ଉପଯୁକ୍ତ ବତର ଥିବାରୁ ଧାନ ରୁଆ କାର୍ଯ୍ୟ ପାଇଁ ଅନୁକୂଳ ସମୟ।"
        ));
        ODISHA_DISTRICT_WEATHER.put("cuttack", cuttack);

        Map<String, Object> khordha = new HashMap<>();
        khordha.put("district", "Khordha / Bhubaneswar (ଖୋର୍ଦ୍ଧା)");
        khordha.put("temperature", "32.4°C");
        khordha.put("temp_min", "24.0°C");
        khordha.put("temp_max", "34.0°C");
        khordha.put("humidity", "71%");
        khordha.put("rainfall_forecast", "2.0 mm (Isolated drizzle)");
        khordha.put("wind_speed", "14 km/h");
        khordha.put("condition", "Warm & Sunny");
        khordha.put("condition_or", "ଖରାଟିଆ ଓ ଉଷୁମ");
        khordha.put("farming_advisories", List.of(
            "Optimal sunshine for field weeding and intercultural operations in vegetable plots.",
            "Apply light evening irrigation to tomato and brinjal nursery beds."
        ));
        khordha.put("farming_advisories_or", List.of(
            "ପନିପରିବା କ୍ଷେତରେ ଘାସ ବାଛିବା ଓ କୋଡ଼ାଖୁସା କରିବା ପାଇଁ ଉତ୍ତମ ସମୟ।",
            "ବିଲାତି ବାଇଗଣ ତଳିରେ ସନ୍ଧ୍ୟା ସମୟରେ ହାଲୁକା ପାଣି ମଡ଼ାନ୍ତୁ।"
        ));
        ODISHA_DISTRICT_WEATHER.put("khordha", khordha);

        Map<String, Object> sambalpur = new HashMap<>();
        sambalpur.put("district", "Sambalpur (ସମ୍ବଲପୁର)");
        sambalpur.put("temperature", "34.2°C");
        sambalpur.put("temp_min", "22.8°C");
        sambalpur.put("temp_max", "35.6°C");
        sambalpur.put("humidity", "58%");
        sambalpur.put("rainfall_forecast", "0.0 mm (Dry)");
        sambalpur.put("wind_speed", "9 km/h");
        sambalpur.put("condition", "Sunny / Dry");
        sambalpur.put("condition_or", "ଶୁଖିଲା ଓ ଖରାଟିଆ");
        sambalpur.put("farming_advisories", List.of(
            "Dry weather conditions: Provide scheduled canal irrigation for tillering paddy.",
            "Mulch vegetable beds with straw to conserve soil moisture against daytime evaporation."
        ));
        sambalpur.put("farming_advisories_or", List.of(
            "ଶୁଖିଲା ପାଗ ଯୋଗୁଁ ଧାନ ଫସଲରେ ନିୟମିତ ଜଳସେଚନ ବଜାୟ ରଖନ୍ତୁ।",
            "ମାଟିର ଆର୍ଦ୍ରତା ରକ୍ଷା ପାଇଁ ଗଛ ମୂଳରେ ନଡ଼ା ବିଛାଇ ମଲଚିଂ କରନ୍ତୁ।"
        ));
        ODISHA_DISTRICT_WEATHER.put("sambalpur", sambalpur);
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentWeather(@RequestParam(value = "district", defaultValue = "Cuttack") String district) {
        String key = district.trim().toLowerCase();
        Map<String, Object> weather = ODISHA_DISTRICT_WEATHER.get(key);

        if (weather == null) {
            weather = new HashMap<>(ODISHA_DISTRICT_WEATHER.get("cuttack"));
            weather.put("district", district + " (Odisha)");
        }

        return ResponseEntity.ok(weather);
    }

    @GetMapping("/districts")
    public ResponseEntity<?> getSupportedDistricts() {
        List<Map<String, String>> districts = List.of(
            Map.of("id", "cuttack", "name_en", "Cuttack", "name_or", "କଟକ"),
            Map.of("id", "khordha", "name_en", "Khordha / Bhubaneswar", "name_or", "ଖୋର୍ଦ୍ଧା / ଭୁବନେଶ୍ୱର"),
            Map.of("id", "sambalpur", "name_en", "Sambalpur", "name_or", "ସମ୍ବଲପୁର"),
            Map.of("id", "puri", "name_en", "Puri", "name_or", "ପୁରୀ"),
            Map.of("id", "balasore", "name_en", "Balasore (Baleswar)", "name_or", "ବାଲେଶ୍ୱର"),
            Map.of("id", "ganjam", "name_en", "Ganjam", "name_or", "ଗଞ୍ଜାମ"),
            Map.of("id", "koraput", "name_en", "Koraput", "name_or", "କୋରାପୁଟ"),
            Map.of("id", "mayurbhanj", "name_en", "Mayurbhanj", "name_or", "ମୟୂରଭଞ୍ଜ"),
            Map.of("id", "balangir", "name_en", "Balangir", "name_or", "ବଲାଙ୍ଗୀର"),
            Map.of("id", "bhadrak", "name_en", "Bhadrak", "name_or", "ଭଦ୍ରକ")
        );
        return ResponseEntity.ok(districts);
    }
}
