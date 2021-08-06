package com.github.iceant.point.console.mapper;

import com.github.iceant.point.common.dto.AgentOfflineDTO;
import com.github.iceant.point.common.dto.AgentOnlineDTO;
import com.github.iceant.point.console.storage.entity.TAgentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface IAgentMapper {
    static IAgentMapper INSTANCE = Mappers.getMapper(IAgentMapper.class);

    TAgentEntity registerDtoToEntity(AgentOnlineDTO dto);

    TAgentEntity offlineDtoToEntity(AgentOfflineDTO dto);
}
