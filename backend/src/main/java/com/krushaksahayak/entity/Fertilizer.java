package com.krushaksahayak.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "fertilizers")
public class Fertilizer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 150)
    private String nameOr;

    @Column(nullable = false, length = 50)
    private String fertilizerType; // Inorganic, Organic, Bio-fertilizer

    private String npkRatio;

    @Column(nullable = false, length = 100)
    private String dosagePerAcre;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String applicationMethod;

    private String applicationStage;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String precautions;

    private Boolean isOrganic = false;

    @Column(nullable = false, length = 255)
    private String officialReference;

    public Fertilizer() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getNameOr() { return nameOr; }
    public void setNameOr(String nameOr) { this.nameOr = nameOr; }
    public String getFertilizerType() { return fertilizerType; }
    public void setFertilizerType(String fertilizerType) { this.fertilizerType = fertilizerType; }
    public String getNpkRatio() { return npkRatio; }
    public void setNpkRatio(String npkRatio) { this.npkRatio = npkRatio; }
    public String getDosagePerAcre() { return dosagePerAcre; }
    public void setDosagePerAcre(String dosagePerAcre) { this.dosagePerAcre = dosagePerAcre; }
    public String getApplicationMethod() { return applicationMethod; }
    public void setApplicationMethod(String applicationMethod) { this.applicationMethod = applicationMethod; }
    public String getApplicationStage() { return applicationStage; }
    public void setApplicationStage(String applicationStage) { this.applicationStage = applicationStage; }
    public String getPrecautions() { return precautions; }
    public void setPrecautions(String precautions) { this.precautions = precautions; }
    public Boolean getIsOrganic() { return isOrganic; }
    public void setIsOrganic(Boolean isOrganic) { this.isOrganic = isOrganic; }
    public String getOfficialReference() { return officialReference; }
    public void setOfficialReference(String officialReference) { this.officialReference = officialReference; }
}
