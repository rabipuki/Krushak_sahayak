package com.krushaksahayak.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "treatments")
public class Treatment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_id", nullable = false)
    private PlantDisease disease;

    @Column(nullable = false, length = 200)
    private String treatmentName;

    private String treatmentNameOr;

    @Column(nullable = false, length = 50)
    private String treatmentType; // Chemical, Organic, Cultural

    @Column(nullable = false, columnDefinition = "TEXT")
    private String purpose;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String applicationMethod;

    @Column(nullable = false, length = 100)
    private String dosage;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String applicationPrecautions;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String safetyInformation;

    private Boolean isOrganic = false;
    private Boolean isVerified = true;

    @Column(nullable = false, length = 255)
    private String officialReference;

    public Treatment() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public PlantDisease getDisease() { return disease; }
    public void setDisease(PlantDisease disease) { this.disease = disease; }
    public String getTreatmentName() { return treatmentName; }
    public void setTreatmentName(String treatmentName) { this.treatmentName = treatmentName; }
    public String getTreatmentNameOr() { return treatmentNameOr; }
    public void setTreatmentNameOr(String treatmentNameOr) { this.treatmentNameOr = treatmentNameOr; }
    public String getTreatmentType() { return treatmentType; }
    public void setTreatmentType(String treatmentType) { this.treatmentType = treatmentType; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public String getApplicationMethod() { return applicationMethod; }
    public void setApplicationMethod(String applicationMethod) { this.applicationMethod = applicationMethod; }
    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }
    public String getApplicationPrecautions() { return applicationPrecautions; }
    public void setApplicationPrecautions(String applicationPrecautions) { this.applicationPrecautions = applicationPrecautions; }
    public String getSafetyInformation() { return safetyInformation; }
    public void setSafetyInformation(String safetyInformation) { this.safetyInformation = safetyInformation; }
    public Boolean getIsOrganic() { return isOrganic; }
    public void setIsOrganic(Boolean isOrganic) { this.isOrganic = isOrganic; }
    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }
    public String getOfficialReference() { return officialReference; }
    public void setOfficialReference(String officialReference) { this.officialReference = officialReference; }
}
