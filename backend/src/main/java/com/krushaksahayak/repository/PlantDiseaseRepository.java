package com.krushaksahayak.repository;

import com.krushaksahayak.entity.PlantDisease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlantDiseaseRepository extends JpaRepository<PlantDisease, Long> {
    List<PlantDisease> findByCropId(Long cropId);
}
