package com.krushaksahayak.dto;

public class AuthResponse {
    private String token;
    private String tokenType = "Bearer";
    private Long id;
    private String fullName;
    private String phone;
    private String district;
    private String role;
    private String preferredLanguage;

    public AuthResponse() {}

    public AuthResponse(String token, Long id, String fullName, String phone, String district, String role, String preferredLanguage) {
        this.token = token;
        this.id = id;
        this.fullName = fullName;
        this.phone = phone;
        this.district = district;
        this.role = role;
        this.preferredLanguage = preferredLanguage;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }
}
