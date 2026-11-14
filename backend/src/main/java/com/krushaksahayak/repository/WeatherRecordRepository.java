package com.krushaksahayak.repository;

import com.krushaksahayak.entity.WeatherRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface WeatherRecordRepository extends JpaRepository<WeatherRecord, Long> {
    Optional<WeatherRecord> findTopByDistrictOrderByRecordedAtDesc(String district);
}
