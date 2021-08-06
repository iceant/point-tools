package com.github.iceant.point.console.storage.repo;

import com.github.iceant.point.console.storage.entity.TAgentCommandHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TAgentCommandHistoryRepository extends JpaRepository<TAgentCommandHistory, Integer> {
}
