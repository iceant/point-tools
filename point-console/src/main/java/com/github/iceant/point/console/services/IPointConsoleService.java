package com.github.iceant.point.console.services;

import com.github.iceant.point.common.dto.AgentOfflineDTO;
import com.github.iceant.point.common.dto.AgentOnlineDTO;
import com.github.iceant.point.console.storage.entity.TAgentEntity;
import com.github.iceant.point.console.storage.entity.TEventLog;

public interface IPointConsoleService {
    TAgentEntity save(TAgentEntity entity);

    TEventLog save(TEventLog log);

    TAgentEntity handleOnline(AgentOnlineDTO dto);

    TAgentEntity handleOffline(AgentOfflineDTO dto);
}
