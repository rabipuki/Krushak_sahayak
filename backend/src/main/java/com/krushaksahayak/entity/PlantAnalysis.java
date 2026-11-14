package com.krushaksahayak.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "plant_analyses")
public class PlantAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(nullable = false, length = 100)
    private String cropName;

    private String cropNameOr;

    @Column(nullable = false, length = 200)
    private String diseaseName;

    private String diseaseNameOr;

    @Column(nullable = false, precision = 5, scale = 4)
    private BigDecimal confidenceScore;

    @Column(nullable = false, length = 50)
    private String healthStatus;

    private String severity;

    @Column(columnDefinition = "TEXT")
    private String visibleSymptoms;

    @Column(columnDefinition = "TEXT")
    private String possibleCauses;

    @Column(columnDefinition = "TEXT")
    private String recommendedTreatment;

    @Column(columnDefinition = "TEXT")
    private String organicTreatment;

    @Column(columnDefinition = "TEXT")
    private String suitableFertilizers;

    @Column(columnDefinition = "TEXT")
    private String waterRequirements;

    @Column(columnDefinition = "TEXT")
    private String sunlightRequirements;

    @Column(columnDefinition = "TEXT")
    private String preventionMethods;

    private Boolean isDemonstrationMode = false;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public PlantAnalysis() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Farmer getFarmer() { return farmer; }
    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getCropNameOr() { return cropNameOr; }
    public void setCropNameOr(String cropNameOr) { this.cropNameOr = cropNameOr; }
    public String getDiseaseName() { return diseaseName; }
    public void setDiseaseName(String diseaseName) { this.diseaseName = diseaseName; }
    public String getDiseaseNameOr() { return diseaseNameOr; }
    public void setDiseaseNameOr(String diseaseNameOr) { this.diseaseNameOr = diseaseNameOr; }
    public BigDecimal getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(BigDecimal confidenceScore) { this.confidenceScore = confidenceScore; }
    public String getHealthStatus() { return healthStatus; }
    public void setHealthStatus(String healthStatus) { this.healthStatus = healthStatus; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public String getVisibleSymptoms() { return visibleSymptoms; }
    public void setVisibleSymptoms(String visibleSymptoms) { this.visibleSymptoms = visibleSymptoms; }
    public String getPossibleCauses() { return possibleCauses; }
    public void setPossibleCauses(String possibleCauses) { this.possibleCauses = possibleCauses; }
    public String getRecommendedTreatment() { return recommendedTreatment; }
    public void setRecommendedTreatment(String recommendedTreatment) { this.recommendedTreatment = recommendedTreatment; }
    public String getOrganicTreatment() { return organicTreatment; }
    public void setOrganicTreatment(String organicTreatment) { this.organicTreatment = organicTreatment; }
    public String getSuitableFertilizers() { return suitableFertilizers; }
    public void setSuitableFertilizers(String suitableFertilizers) { this.suitableFertilizers = suitableFertilizers; }
    public String getWaterRequirements() { return waterRequirements; }
    public void setWaterRequirements(String waterRequirements) { this.waterRequirements = waterRequirements; }
    public String getSunlightRequirements() { return sunlightRequirements; }
    public void setSunlightRequirements(String sunlightRequirements) { this.sunlightRequirements = sunlightRequirements; }
    public String getPreventionMethods() { return preventionMethods; }
    public void setPreventionMethods(String preventionMethods) { this.preventionMethods = preventionMethods; }
    public Boolean getIsDemonstrationMode() { return isDemonstrationMode; }
    public void setIsDemonstrationMode(Boolean isDemonstrationMode) { this.isDemonstrationMode = isDemonstrationMode; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
