package com.krushaksahayak.dto;

import java.math.BigDecimal;

public class RegisterRequest {
    private String fullName;
    private String phone;
    private String email;
    private String password;
    private String district;
    private String block;
    private String village;
    private BigDecimal landSizeAcres;
    private String primarySoilType;
    private String preferredLanguage = "or";
    private Boolean hasRationCard = true;
    private BigDecimal annualIncome = BigDecimal.valueOf(40000.0);

    public RegisterRequest() {}

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getBlock() { return block; }
    public void setBlock(String block) { this.block = block; }
    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }
    public BigDecimal getLandSizeAcres() { return landSizeAcres; }
    public void setLandSizeAcres(BigDecimal landSizeAcres) { this.landSizeAcres = landSizeAcres; }
    public String getPrimarySoilType() { return primarySoilType; }
    public void setPrimarySoilType(String primarySoilType) { this.primarySoilType = primarySoilType; }
    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }
    public Boolean getHasRationCard() { return hasRationCard; }
    public void setHasRationCard(Boolean hasRationCard) { this.hasRationCard = hasRationCard; }
    public BigDecimal getAnnualIncome() { return annualIncome; }
    public void setAnnualIncome(BigDecimal annualIncome) { this.annualIncome = annualIncome; }
}
