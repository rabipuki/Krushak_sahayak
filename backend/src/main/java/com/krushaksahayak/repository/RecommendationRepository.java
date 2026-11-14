package com.krushaksahayak.repository;

import com.krushaksahayak.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByFarmerIdOrderByCreatedAtDesc(Long farmerId);
}
