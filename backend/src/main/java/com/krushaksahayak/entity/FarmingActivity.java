package com.krushaksahayak.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "farming_activities")
public class FarmingActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "calendar_id", nullable = false)
    private CropCalendar calendar;

    @Column(nullable = false, length = 100)
    private String stageName;

    @Column(nullable = false, length = 100)
    private String stageNameOr;

    @Column(nullable = false)
    private Integer stageOrder;

    @Column(nullable = false, length = 200)
    private String activityTitle;

    @Column(nullable = false, length = 200)
    private String activityTitleOr;

    @Column(columnDefinition = "TEXT")
    private String activityDescription;

    @Column(columnDefinition = "TEXT")
    private String activityDescriptionOr;

    @Column(nullable = false)
    private LocalDate dueDate;

    private Boolean isCompleted = false;
    private LocalDateTime completedAt;

    public FarmingActivity() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public CropCalendar getCalendar() { return calendar; }
    public void setCalendar(CropCalendar calendar) { this.calendar = calendar; }
    public String getStageName() { return stageName; }
    public void setStageName(String stageName) { this.stageName = stageName; }
    public String getStageNameOr() { return stageNameOr; }
    public void setStageNameOr(String stageNameOr) { this.stageNameOr = stageNameOr; }
    public Integer getStageOrder() { return stageOrder; }
    public void setStageOrder(Integer stageOrder) { this.stageOrder = stageOrder; }
    public String getActivityTitle() { return activityTitle; }
    public void setActivityTitle(String activityTitle) { this.activityTitle = activityTitle; }
    public String getActivityTitleOr() { return activityTitleOr; }
    public void setActivityTitleOr(String activityTitleOr) { this.activityTitleOr = activityTitleOr; }
    public String getActivityDescription() { return activityDescription; }
    public void setActivityDescription(String activityDescription) { this.activityDescription = activityDescription; }
    public String getActivityDescriptionOr() { return activityDescriptionOr; }
    public void setActivityDescriptionOr(String activityDescriptionOr) { this.activityDescriptionOr = activityDescriptionOr; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
