package com.krushaksahayak.repository;

import com.krushaksahayak.entity.PlantAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlantAnalysisRepository extends JpaRepository<PlantAnalysis, Long> {
    List<PlantAnalysis> findByFarmerIdOrderByCreatedAtDesc(Long farmerId);
    long countByFarmerId(Long farmerId);
}
