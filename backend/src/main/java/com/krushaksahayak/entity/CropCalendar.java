package com.krushaksahayak.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "crop_calendars")
public class CropCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    @Column(nullable = false, length = 100)
    private String cropName;

    private String cropNameOr;

    @Column(nullable = false)
    private LocalDate sowingDate;

    @Column(nullable = false, length = 100)
    private String locationDistrict;

    private Integer totalStages = 9;
    private Integer currentStageIndex = 1;

    @Column(length = 50)
    private String status = "ACTIVE"; // ACTIVE, COMPLETED, CANCELLED

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("stageOrder ASC")
    private List<FarmingActivity> activities = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public CropCalendar() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Farmer getFarmer() { return farmer; }
    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public String getCropNameOr() { return cropNameOr; }
    public void setCropNameOr(String cropNameOr) { this.cropNameOr = cropNameOr; }
    public LocalDate getSowingDate() { return sowingDate; }
    public void setSowingDate(LocalDate sowingDate) { this.sowingDate = sowingDate; }
    public String getLocationDistrict() { return locationDistrict; }
    public void setLocationDistrict(String locationDistrict) { this.locationDistrict = locationDistrict; }
    public Integer getTotalStages() { return totalStages; }
    public void setTotalStages(Integer totalStages) { this.totalStages = totalStages; }
    public Integer getCurrentStageIndex() { return currentStageIndex; }
    public void setCurrentStageIndex(Integer currentStageIndex) { this.currentStageIndex = currentStageIndex; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<FarmingActivity> getActivities() { return activities; }
    public void setActivities(List<FarmingActivity> activities) { this.activities = activities; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
