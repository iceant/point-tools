package com.github.iceant.point.console.services;

import com.github.iceant.point.common.dto.AgentOfflineDTO;
import com.github.iceant.point.common.dto.AgentOnlineDTO;
import com.github.iceant.point.console.storage.entity.TAgentEntity;
import com.github.iceant.point.console.storage.entity.TEventLog;

import java.util.Optional;

public interface IPointConsoleService {
    TAgentEntity save(TAgentEntity entity);

    TEventLog save(TEventLog log);

    TAgentEntity handleOnline(AgentOnlineDTO dto);

    TAgentEntity handleOffline(AgentOfflineDTO dto);

    Optional<TAgentEntity> getAgentByHostAndPort(String agentHost, Integer agentPort);
}
