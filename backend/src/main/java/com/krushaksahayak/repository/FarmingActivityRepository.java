package com.krushaksahayak.repository;

import com.krushaksahayak.entity.FarmingActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FarmingActivityRepository extends JpaRepository<FarmingActivity, Long> {
    List<FarmingActivity> findByCalendarIdOrderByStageOrderAsc(Long calendarId);
    List<FarmingActivity> findByCalendarIdAndIsCompletedFalseOrderByDueDateAsc(Long calendarId);
}
