package com.krushaksahayak.dto;

import java.util.List;
import java.util.Map;

public class FarmerDashboardDTO {
    private String welcomeMessage;
    private String farmerName;
    private String district;
    private long totalPlantAnalyses;
    private long totalSoilAnalyses;
    private List<Map<String, Object>> recentHistory;
    private Map<String, Object> currentWeather;
    private List<String> dailyFarmingTips;
    private List<String> dailyFarmingTipsOr;
    private List<Map<String, Object>> upcomingActivities;

    public FarmerDashboardDTO() {}

    public String getWelcomeMessage() { return welcomeMessage; }
    public void setWelcomeMessage(String welcomeMessage) { this.welcomeMessage = welcomeMessage; }
    public String getFarmerName() { return farmerName; }
    public void setFarmerName(String farmerName) { this.farmerName = farmerName; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public long getTotalPlantAnalyses() { return totalPlantAnalyses; }
    public void setTotalPlantAnalyses(long totalPlantAnalyses) { this.totalPlantAnalyses = totalPlantAnalyses; }
    public long getTotalSoilAnalyses() { return totalSoilAnalyses; }
    public void setTotalSoilAnalyses(long totalSoilAnalyses) { this.totalSoilAnalyses = totalSoilAnalyses; }
    public List<Map<String, Object>> getRecentHistory() { return recentHistory; }
    public void setRecentHistory(List<Map<String, Object>> recentHistory) { this.recentHistory = recentHistory; }
    public Map<String, Object> getCurrentWeather() { return currentWeather; }
    public void setCurrentWeather(Map<String, Object> currentWeather) { this.currentWeather = currentWeather; }
    public List<String> getDailyFarmingTips() { return dailyFarmingTips; }
    public void setDailyFarmingTips(List<String> dailyFarmingTips) { this.dailyFarmingTips = dailyFarmingTips; }
    public List<String> getDailyFarmingTipsOr() { return dailyFarmingTipsOr; }
    public void setDailyFarmingTipsOr(List<String> dailyFarmingTipsOr) { this.dailyFarmingTipsOr = dailyFarmingTipsOr; }
    public List<Map<String, Object>> getUpcomingActivities() { return upcomingActivities; }
    public void setUpcomingActivities(List<Map<String, Object>> upcomingActivities) { this.upcomingActivities = upcomingActivities; }
}
