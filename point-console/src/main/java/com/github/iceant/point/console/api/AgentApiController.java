package com.github.iceant.point.console.api;

import com.github.iceant.point.common.api.Response;
import com.github.iceant.point.common.dto.AgentOfflineDTO;
import com.github.iceant.point.common.dto.AgentOnlineDTO;
import com.github.iceant.point.console.services.IPointConsoleService;
import com.github.iceant.point.console.storage.entity.TAgentEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = {"/api/agent/v1"})
@Slf4j
public class AgentApiController {
    final IPointConsoleService pointConsoleService;

    public AgentApiController(IPointConsoleService pointConsoleService) {
        this.pointConsoleService = pointConsoleService;
    }

    @PostMapping(path = {"/register", "/online"})
    public Object register(@RequestBody AgentOnlineDTO dto){
        log.info("Register: {}", dto);
        TAgentEntity entity = pointConsoleService.handleOnline(dto);
        return Response.success(entity);
    }

    @PostMapping(path = {"/offline"})
    public Object offline(@RequestBody AgentOfflineDTO dto){
        log.info("Offline: {}", dto);
        TAgentEntity entity = pointConsoleService.handleOffline(dto);
        return Response.success(entity);
    }
}
