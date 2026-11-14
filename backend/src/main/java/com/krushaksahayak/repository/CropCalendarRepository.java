package com.krushaksahayak.repository;

import com.krushaksahayak.entity.CropCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CropCalendarRepository extends JpaRepository<CropCalendar, Long> {
    List<CropCalendar> findByFarmerIdOrderByCreatedAtDesc(Long farmerId);
    Optional<CropCalendar> findTopByFarmerIdAndStatusOrderByCreatedAtDesc(Long farmerId, String status);
}
