package com.krushaksahayak.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "soil_test_reports")
public class SoilTestReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "soil_analysis_id")
    private SoilAnalysis soilAnalysis;

    @Column(nullable = false, precision = 4, scale = 2)
    private BigDecimal ph;

    @Column(precision = 7, scale = 2)
    private BigDecimal nitrogenKgHa;

    @Column(precision = 7, scale = 2)
    private BigDecimal phosphorusKgHa;

    @Column(precision = 7, scale = 2)
    private BigDecimal potassiumKgHa;

    @Column(precision = 4, scale = 2)
    private BigDecimal organicCarbonPercent;

    @Column(precision = 5, scale = 2)
    private BigDecimal electricalConductivityDsM;

    @Column(length = 500)
    private String labReportFileUrl;

    private String targetCrop = "Paddy";
    private String phClassification;

    @Column(columnDefinition = "TEXT")
    private String fertilizerSchedule;

    @Column(columnDefinition = "TEXT")
    private String soilAmendments;

    private LocalDate testedAt = LocalDate.now();

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public SoilTestReport() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Farmer getFarmer() { return farmer; }
    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
    public SoilAnalysis getSoilAnalysis() { return soilAnalysis; }
    public void setSoilAnalysis(SoilAnalysis soilAnalysis) { this.soilAnalysis = soilAnalysis; }
    public BigDecimal getPh() { return ph; }
    public void setPh(BigDecimal ph) { this.ph = ph; }
    public BigDecimal getNitrogenKgHa() { return nitrogenKgHa; }
    public void setNitrogenKgHa(BigDecimal nitrogenKgHa) { this.nitrogenKgHa = nitrogenKgHa; }
    public BigDecimal getPhosphorusKgHa() { return phosphorusKgHa; }
    public void setPhosphorusKgHa(BigDecimal phosphorusKgHa) { this.phosphorusKgHa = phosphorusKgHa; }
    public BigDecimal getPotassiumKgHa() { return potassiumKgHa; }
    public void setPotassiumKgHa(BigDecimal potassiumKgHa) { this.potassiumKgHa = potassiumKgHa; }
    public BigDecimal getOrganicCarbonPercent() { return organicCarbonPercent; }
    public void setOrganicCarbonPercent(BigDecimal organicCarbonPercent) { this.organicCarbonPercent = organicCarbonPercent; }
    public BigDecimal getElectricalConductivityDsM() { return electricalConductivityDsM; }
    public void setElectricalConductivityDsM(BigDecimal electricalConductivityDsM) { this.electricalConductivityDsM = electricalConductivityDsM; }
    public String getLabReportFileUrl() { return labReportFileUrl; }
    public void setLabReportFileUrl(String labReportFileUrl) { this.labReportFileUrl = labReportFileUrl; }
    public String getTargetCrop() { return targetCrop; }
    public void setTargetCrop(String targetCrop) { this.targetCrop = targetCrop; }
    public String getPhClassification() { return phClassification; }
    public void setPhClassification(String phClassification) { this.phClassification = phClassification; }
    public String getFertilizerSchedule() { return fertilizerSchedule; }
    public void setFertilizerSchedule(String fertilizerSchedule) { this.fertilizerSchedule = fertilizerSchedule; }
    public String getSoilAmendments() { return soilAmendments; }
    public void setSoilAmendments(String soilAmendments) { this.soilAmendments = soilAmendments; }
    public LocalDate getTestedAt() { return testedAt; }
    public void setTestedAt(LocalDate testedAt) { this.testedAt = testedAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
