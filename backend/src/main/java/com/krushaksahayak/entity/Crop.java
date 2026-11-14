package com.krushaksahayak.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "crops")
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nameEn;

    @Column(nullable = false, length = 100)
    private String nameOr;

    @Column(nullable = false, length = 100)
    private String nameHi;

    private String scientificName;

    @Column(nullable = false, length = 50)
    private String season;

    @Column(nullable = false)
    private Integer durationDays;

    private String suitableSoilTypes;
    private String waterRequirements;
    private String icon;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Crop() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }
    public String getNameOr() { return nameOr; }
    public void setNameOr(String nameOr) { this.nameOr = nameOr; }
    public String getNameHi() { return nameHi; }
    public void setNameHi(String nameHi) { this.nameHi = nameHi; }
    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }
    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }
    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }
    public String getSuitableSoilTypes() { return suitableSoilTypes; }
    public void setSuitableSoilTypes(String suitableSoilTypes) { this.suitableSoilTypes = suitableSoilTypes; }
    public String getWaterRequirements() { return waterRequirements; }
    public void setWaterRequirements(String waterRequirements) { this.waterRequirements = waterRequirements; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
