package com.krushaksahayak.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "analysis_feedbacks")
public class AnalysisFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    @Column(nullable = false, length = 50)
    private String analysisType; // PLANT, SOIL

    @Column(nullable = false)
    private Long analysisId;

    private Integer rating;
    private Boolean isAccurate;

    @Column(columnDefinition = "TEXT")
    private String comments;

    private Boolean reviewedByAdmin = false;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public AnalysisFeedback() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Farmer getFarmer() { return farmer; }
    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
    public String getAnalysisType() { return analysisType; }
    public void setAnalysisType(String analysisType) { this.analysisType = analysisType; }
    public Long getAnalysisId() { return analysisId; }
    public void setAnalysisId(Long analysisId) { this.analysisId = analysisId; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public Boolean getIsAccurate() { return isAccurate; }
    public void setIsAccurate(Boolean isAccurate) { this.isAccurate = isAccurate; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
    public Boolean getReviewedByAdmin() { return reviewedByAdmin; }
    public void setReviewedByAdmin(Boolean reviewedByAdmin) { this.reviewedByAdmin = reviewedByAdmin; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
