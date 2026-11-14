package com.krushaksahayak.repository;

import com.krushaksahayak.entity.AnalysisFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnalysisFeedbackRepository extends JpaRepository<AnalysisFeedback, Long> {
    List<AnalysisFeedback> findByReviewedByAdminFalseOrderByCreatedAtDesc();
}
