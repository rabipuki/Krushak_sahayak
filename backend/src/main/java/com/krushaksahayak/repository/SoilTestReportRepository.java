package com.krushaksahayak.repository;

import com.krushaksahayak.entity.SoilTestReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SoilTestReportRepository extends JpaRepository<SoilTestReport, Long> {
    List<SoilTestReport> findByFarmerIdOrderByCreatedAtDesc(Long farmerId);
    Optional<SoilTestReport> findTopByFarmerIdOrderByCreatedAtDesc(Long farmerId);
}
