package com.krushaksahayak.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id")
    private Crop crop;

    @Column(nullable = false, length = 50)
    private String recommendationType; // Fertilizer, Treatment, Irrigation, General

    @Column(nullable = false, length = 200)
    private String title;

    private String titleOr;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String descriptionOr;

    @Column(columnDefinition = "TEXT")
    private String precautions;

    private String officialReference;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Recommendation() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Farmer getFarmer() { return farmer; }
    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
    public Crop getCrop() { return crop; }
    public void setCrop(Crop crop) { this.crop = crop; }
    public String getRecommendationType() { return recommendationType; }
    public void setRecommendationType(String recommendationType) { this.recommendationType = recommendationType; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getTitleOr() { return titleOr; }
    public void setTitleOr(String titleOr) { this.titleOr = titleOr; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDescriptionOr() { return descriptionOr; }
    public void setDescriptionOr(String descriptionOr) { this.descriptionOr = descriptionOr; }
    public String getPrecautions() { return precautions; }
    public void setPrecautions(String precautions) { this.precautions = precautions; }
    public String getOfficialReference() { return officialReference; }
    public void setOfficialReference(String officialReference) { this.officialReference = officialReference; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
