package com.github.iceant.point.console.storage.repo;

import com.github.iceant.point.console.storage.entity.TEventLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TEventLogRepository extends JpaRepository<TEventLog, Integer> {

}
