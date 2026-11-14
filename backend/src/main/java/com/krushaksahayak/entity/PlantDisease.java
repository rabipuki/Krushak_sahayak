package com.krushaksahayak.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "plant_diseases")
public class PlantDisease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @Column(nullable = false, length = 150)
    private String diseaseNameEn;

    @Column(nullable = false, length = 150)
    private String diseaseNameOr;

    @Column(nullable = false, length = 150)
    private String diseaseNameHi;

    private String pathogenType;
    private String scientificName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String symptomsEn;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String symptomsOr;

    @Column(columnDefinition = "TEXT")
    private String causesEn;

    @Column(columnDefinition = "TEXT")
    private String causesOr;

    private String severityLevel = "MODERATE";

    @Column(columnDefinition = "TEXT")
    private String preventionMethodsEn;

    @Column(columnDefinition = "TEXT")
    private String preventionMethodsOr;

    private String officialReference;

    public PlantDisease() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Crop getCrop() { return crop; }
    public void setCrop(Crop crop) { this.crop = crop; }
    public String getDiseaseNameEn() { return diseaseNameEn; }
    public void setDiseaseNameEn(String diseaseNameEn) { this.diseaseNameEn = diseaseNameEn; }
    public String getDiseaseNameOr() { return diseaseNameOr; }
    public void setDiseaseNameOr(String diseaseNameOr) { this.diseaseNameOr = diseaseNameOr; }
    public String getDiseaseNameHi() { return diseaseNameHi; }
    public void setDiseaseNameHi(String diseaseNameHi) { this.diseaseNameHi = diseaseNameHi; }
    public String getPathogenType() { return pathogenType; }
    public void setPathogenType(String pathogenType) { this.pathogenType = pathogenType; }
    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }
    public String getSymptomsEn() { return symptomsEn; }
    public void setSymptomsEn(String symptomsEn) { this.symptomsEn = symptomsEn; }
    public String getSymptomsOr() { return symptomsOr; }
    public void setSymptomsOr(String symptomsOr) { this.symptomsOr = symptomsOr; }
    public String getCausesEn() { return causesEn; }
    public void setCausesEn(String causesEn) { this.causesEn = causesEn; }
    public String getCausesOr() { return causesOr; }
    public void setCausesOr(String causesOr) { this.causesOr = causesOr; }
    public String getSeverityLevel() { return severityLevel; }
    public void setSeverityLevel(String severityLevel) { this.severityLevel = severityLevel; }
    public String getPreventionMethodsEn() { return preventionMethodsEn; }
    public void setPreventionMethodsEn(String preventionMethodsEn) { this.preventionMethodsEn = preventionMethodsEn; }
    public String getPreventionMethodsOr() { return preventionMethodsOr; }
    public void setPreventionMethodsOr(String preventionMethodsOr) { this.preventionMethodsOr = preventionMethodsOr; }
    public String getOfficialReference() { return officialReference; }
    public void setOfficialReference(String officialReference) { this.officialReference = officialReference; }
}
