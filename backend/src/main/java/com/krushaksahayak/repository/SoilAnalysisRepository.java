package com.krushaksahayak.repository;

import com.krushaksahayak.entity.SoilAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SoilAnalysisRepository extends JpaRepository<SoilAnalysis, Long> {
    List<SoilAnalysis> findByFarmerIdOrderByCreatedAtDesc(Long farmerId);
    long countByFarmerId(Long farmerId);
}
