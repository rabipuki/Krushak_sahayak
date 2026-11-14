package com.krushaksahayak.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "soil_analyses")
public class SoilAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(nullable = false, length = 150)
    private String preliminarySoilType;

    private String soilTypeOr;

    @Column(nullable = false, length = 100)
    private String soilColor;

    private String visibleTexture;
    private String organicMatterStatus;
    private String surfaceDryness;
    private String drainageAssessment;

    @Column(columnDefinition = "TEXT")
    private String visualObservations;

    @Column(columnDefinition = "TEXT")
    private String improvementSuggestions;

    @Column(columnDefinition = "TEXT")
    private String nextSteps;

    private Boolean isDemonstrationMode = false;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public SoilAnalysis() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Farmer getFarmer() { return farmer; }
    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getPreliminarySoilType() { return preliminarySoilType; }
    public void setPreliminarySoilType(String preliminarySoilType) { this.preliminarySoilType = preliminarySoilType; }
    public String getSoilTypeOr() { return soilTypeOr; }
    public void setSoilTypeOr(String soilTypeOr) { this.soilTypeOr = soilTypeOr; }
    public String getSoilColor() { return soilColor; }
    public void setSoilColor(String soilColor) { this.soilColor = soilColor; }
    public String getVisibleTexture() { return visibleTexture; }
    public void setVisibleTexture(String visibleTexture) { this.visibleTexture = visibleTexture; }
    public String getOrganicMatterStatus() { return organicMatterStatus; }
    public void setOrganicMatterStatus(String organicMatterStatus) { this.organicMatterStatus = organicMatterStatus; }
    public String getSurfaceDryness() { return surfaceDryness; }
    public void setSurfaceDryness(String surfaceDryness) { this.surfaceDryness = surfaceDryness; }
    public String getDrainageAssessment() { return drainageAssessment; }
    public void setDrainageAssessment(String drainageAssessment) { this.drainageAssessment = drainageAssessment; }
    public String getVisualObservations() { return visualObservations; }
    public void setVisualObservations(String visualObservations) { this.visualObservations = visualObservations; }
    public String getImprovementSuggestions() { return improvementSuggestions; }
    public void setImprovementSuggestions(String improvementSuggestions) { this.improvementSuggestions = improvementSuggestions; }
    public String getNextSteps() { return nextSteps; }
    public void setNextSteps(String nextSteps) { this.nextSteps = nextSteps; }
    public Boolean getIsDemonstrationMode() { return isDemonstrationMode; }
    public void setIsDemonstrationMode(Boolean isDemonstrationMode) { this.isDemonstrationMode = isDemonstrationMode; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
