package com.krushaksahayak.controller;

import com.krushaksahayak.dto.AuthRequest;
import com.krushaksahayak.dto.AuthResponse;
import com.krushaksahayak.dto.RegisterRequest;
import com.krushaksahayak.entity.Farmer;
import com.krushaksahayak.entity.Role;
import com.krushaksahayak.repository.FarmerRepository;
import com.krushaksahayak.repository.RoleRepository;
import com.krushaksahayak.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/register")
    public ResponseEntity<?> registerFarmer(@RequestBody RegisterRequest request) {
        if (farmerRepository.existsByPhone(request.getPhone())) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "ଏହି ଫୋନ୍ ନମ୍ବର ପୂର୍ବରୁ ପଞ୍ଜୀକୃତ ହୋଇଛି (Phone number already registered)");
            return ResponseEntity.badRequest().body(err);
        }

        Farmer farmer = new Farmer();
        farmer.setFullName(request.getFullName());
        farmer.setPhone(request.getPhone());
        farmer.setEmail(request.getEmail());
        farmer.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        farmer.setDistrict(request.getDistrict() != null ? request.getDistrict() : "Cuttack");
        farmer.setBlock(request.getBlock());
        farmer.setVillage(request.getVillage());
        farmer.setLandSizeAcres(request.getLandSizeAcres());
        farmer.setPrimarySoilType(request.getPrimarySoilType());
        farmer.setPreferredLanguage(request.getPreferredLanguage() != null ? request.getPreferredLanguage() : "or");
        farmer.setHasRationCard(request.getHasRationCard() != null ? request.getHasRationCard() : true);
        farmer.setAnnualIncome(request.getAnnualIncome());

        Optional<Role> role = roleRepository.findByName("ROLE_FARMER");
        role.ifPresent(r -> farmer.setRoles(Collections.singleton(r)));

        Farmer saved = farmerRepository.save(farmer);

        String token = tokenProvider.generateToken(saved.getId(), saved.getPhone(), "ROLE_FARMER");

        return ResponseEntity.ok(new AuthResponse(
                token, saved.getId(), saved.getFullName(), saved.getPhone(), saved.getDistrict(), "ROLE_FARMER", saved.getPreferredLanguage()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginFarmer(@RequestBody AuthRequest request) {
        String idStr = request.getIdentifier().trim();
        Optional<Farmer> farmerOpt = farmerRepository.findByPhone(idStr);
        if (farmerOpt.isEmpty()) {
            farmerOpt = farmerRepository.findByEmail(idStr);
        }

        if (farmerOpt.isEmpty()) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "ଭୁଲ୍ ଫୋନ୍ ନମ୍ବର କିମ୍ବା ପାସୱାର୍ଡ (Invalid phone number or password)");
            return ResponseEntity.status(401).body(err);
        }

        Farmer farmer = farmerOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), farmer.getPasswordHash())) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "ଭୁଲ୍ ପାସୱାର୍ଡ (Invalid password)");
            return ResponseEntity.status(401).body(err);
        }

        String token = tokenProvider.generateToken(farmer.getId(), farmer.getPhone(), "ROLE_FARMER");

        return ResponseEntity.ok(new AuthResponse(
                token, farmer.getId(), farmer.getFullName(), farmer.getPhone(), farmer.getDistrict(), "ROLE_FARMER", farmer.getPreferredLanguage()
        ));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> payload) {
        String phone = payload.get("phone");
        Optional<Farmer> farmerOpt = farmerRepository.findByPhone(phone);
        Map<String, Object> resp = new HashMap<>();
        if (farmerOpt.isPresent()) {
            resp.put("success", true);
            resp.put("message", "ପାସୱାର୍ଡ ପୁନରୁଦ୍ଧାର ଓଟିପି (OTP: 4521) ଆପଣଙ୍କ ପଞ୍ଜୀକୃତ ମୋବାଇଲ୍ କୁ ପଠାଗଲା।");
            resp.put("message_en", "Password reset OTP sent to your registered phone number.");
            resp.put("mock_otp", "4521");
            return ResponseEntity.ok(resp);
        } else {
            resp.put("success", false);
            resp.put("error", "କୌଣସି କୃଷକ ଏହି ଫୋନ୍ ନମ୍ବର ସହିତ ମିଳିଲେ ନାହିଁ।");
            return ResponseEntity.badRequest().body(resp);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long farmerId = 1L; // default or from token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (tokenProvider.validateToken(token)) {
                farmerId = tokenProvider.getUserIdFromJWT(token);
            }
        }
        Optional<Farmer> farmerOpt = farmerRepository.findById(farmerId);
        return farmerOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Map<String, String> resp = new HashMap<>();
        resp.put("message", "ସଫଳତାର ସହ ଲଗଆଉଟ୍ ହେଲା (Logged out successfully)");
        return ResponseEntity.ok(resp);
    }
}
