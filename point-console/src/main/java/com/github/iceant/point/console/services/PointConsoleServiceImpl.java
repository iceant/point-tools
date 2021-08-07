package com.github.iceant.point.console.services;

import com.github.iceant.point.common.dto.AgentCommandRequestDTO;
import com.github.iceant.point.common.dto.AgentOfflineDTO;
import com.github.iceant.point.common.dto.AgentOnlineDTO;
import com.github.iceant.point.console.mapper.IAgentMapper;
import com.github.iceant.point.console.storage.entity.TAgentCommandHistory;
import com.github.iceant.point.console.storage.entity.TAgentEntity;
import com.github.iceant.point.console.storage.entity.TEventLog;
import com.github.iceant.point.console.storage.repo.TAgentCommandHistoryRepository;
import com.github.iceant.point.console.storage.repo.TAgentRepository;
import com.github.iceant.point.console.storage.repo.TEventLogRepository;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PointConsoleServiceImpl implements IPointConsoleService{
    final TAgentRepository tAgentRepository;
    final TEventLogRepository tEventLogRepository;
    final TAgentCommandHistoryRepository tAgentCommandHistoryRepository;

    public PointConsoleServiceImpl(TAgentRepository tAgentRepository, TEventLogRepository tEventLogRepository, TAgentCommandHistoryRepository tAgentCommandHistoryRepository) {
        this.tAgentRepository = tAgentRepository;
        this.tEventLogRepository = tEventLogRepository;
        this.tAgentCommandHistoryRepository = tAgentCommandHistoryRepository;
    }

    @Override
    public TAgentEntity save(TAgentEntity entity) {
        return tAgentRepository.saveAndFlush(entity);
    }

    @Override
    public TEventLog save(TEventLog log) {
        return tEventLogRepository.saveAndFlush(log);
    }

    @Override
    public TAgentEntity handleOnline(AgentOnlineDTO dto) {
        TAgentEntity entity = IAgentMapper.INSTANCE.registerDtoToEntity(dto);
        if(entity.getOnlineDate()==null){
            entity.setOnlineDate(new Date());
        }
        tAgentRepository.saveAndFlush(entity);
        TEventLog log = TEventLog.builder()
                .name("Agent::Online")
                .object_type("t_agent")
                .object_id(dto.getHost()+":"+dto.getPort())
                .timestamp(entity.getOnlineDate())
                .content("{\"result\":\"success\"}")
                .build();
        tEventLogRepository.saveAndFlush(log);
        return entity;
    }

    @Override
    public TAgentEntity handleOffline(AgentOfflineDTO dto) {
        TAgentEntity entity = IAgentMapper.INSTANCE.offlineDtoToEntity(dto);
        if(entity.getOfflineDate()==null){
            entity.setOfflineDate(new Date());
        }
        tAgentRepository.saveAndFlush(entity);
        TEventLog log = TEventLog.builder()
                .name("Agent::Offline")
                .object_type("t_agent")
                .object_id(dto.getHost()+":"+dto.getPort())
                .timestamp(entity.getOfflineDate())
                .content("{\"result\":\"success\"}")
                .build();
        tEventLogRepository.saveAndFlush(log);
        return entity;
    }

    @Override
    public Optional<TAgentEntity> getAgentByHostAndPort(String agentHost, Integer agentPort) {
        return tAgentRepository.findOne(Example.of(TAgentEntity.builder()
                .host(agentHost)
                .port(agentPort)
                .build()));
    }

    @Override
    public TAgentCommandHistory save(TAgentCommandHistory history) {
        return tAgentCommandHistoryRepository.saveAndFlush(history);
    }

    @Override
    public List<TAgentEntity> listAllAgent() {
        return tAgentRepository.findAll();
    }
}
