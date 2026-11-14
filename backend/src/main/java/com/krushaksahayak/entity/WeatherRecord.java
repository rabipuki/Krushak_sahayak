package com.krushaksahayak.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "weather_records")
public class WeatherRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String district;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal temperature;

    @Column(nullable = false)
    private Integer humidity;

    @Column(precision = 6, scale = 2)
    private BigDecimal rainfallForecastMm = BigDecimal.ZERO;

    @Column(precision = 5, scale = 2)
    private BigDecimal windSpeedKmh = BigDecimal.ZERO;

    @Column(nullable = false, length = 100)
    private String conditionText;

    @Column(columnDefinition = "TEXT")
    private String alertMessage;

    @Column(columnDefinition = "TEXT")
    private String farmingAdvice;

    @Column(columnDefinition = "TEXT")
    private String farmingAdviceOr;

    @Column(updatable = false)
    private LocalDateTime recordedAt = LocalDateTime.now();

    public WeatherRecord() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public BigDecimal getTemperature() { return temperature; }
    public void setTemperature(BigDecimal temperature) { this.temperature = temperature; }
    public Integer getHumidity() { return humidity; }
    public void setHumidity(Integer humidity) { this.humidity = humidity; }
    public BigDecimal getRainfallForecastMm() { return rainfallForecastMm; }
    public void setRainfallForecastMm(BigDecimal rainfallForecastMm) { this.rainfallForecastMm = rainfallForecastMm; }
    public BigDecimal getWindSpeedKmh() { return windSpeedKmh; }
    public void setWindSpeedKmh(BigDecimal windSpeedKmh) { this.windSpeedKmh = windSpeedKmh; }
    public String getConditionText() { return conditionText; }
    public void setConditionText(String conditionText) { this.conditionText = conditionText; }
    public String getAlertMessage() { return alertMessage; }
    public void setAlertMessage(String alertMessage) { this.alertMessage = alertMessage; }
    public String getFarmingAdvice() { return farmingAdvice; }
    public void setFarmingAdvice(String farmingAdvice) { this.farmingAdvice = farmingAdvice; }
    public String getFarmingAdviceOr() { return farmingAdviceOr; }
    public void setFarmingAdviceOr(String farmingAdviceOr) { this.farmingAdviceOr = farmingAdviceOr; }
    public LocalDateTime getRecordedAt() { return recordedAt; }
    public void setRecordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; }
}
