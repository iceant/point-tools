package com.github.iceant.point.console.api;

import com.github.iceant.point.common.api.Response;
import com.github.iceant.point.common.dto.AgentCommandRequestDTO;
import com.github.iceant.point.common.dto.AgentOfflineDTO;
import com.github.iceant.point.common.dto.AgentOnlineDTO;
import com.github.iceant.point.common.util.InetAddressUtil;
import com.github.iceant.point.common.util.WebClientUtil;
import com.github.iceant.point.console.api.dto.AgentCommandDTO;
import com.github.iceant.point.console.services.IPointConsoleService;
import com.github.iceant.point.console.storage.entity.TAgentEntity;
import com.github.iceant.point.console.utils.ResponseUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import reactor.core.publisher.Mono;

import java.net.URISyntaxException;
import java.util.Date;
import java.util.Optional;

import static com.github.iceant.point.console.utils.AgentRequestUtil.makeBaseUrl;

@RestController
@RequestMapping(path = {"/api/agent/v1"})
@Slf4j
public class AgentApiController {

    @Value("${server.port:8080}")
    Integer port;

    final IPointConsoleService pointConsoleService;

    public AgentApiController(IPointConsoleService pointConsoleService) {
        this.pointConsoleService = pointConsoleService;
    }

    @PostMapping(path = {"/register", "/online"})
    public Mono<Response> register(@RequestBody AgentOnlineDTO dto){
        log.info("Register: {}", dto);
        TAgentEntity entity = pointConsoleService.handleOnline(dto);
        return Mono.just(Response.success(entity));
    }

    @PostMapping(path = {"/offline"})
    public Mono<Response> offline(@RequestBody AgentOfflineDTO dto){
        log.info("Offline: {}", dto);
        TAgentEntity entity = pointConsoleService.handleOffline(dto);
        return Mono.just(Response.success(entity));
    }

    @PostMapping(path = {"/send", "/run", "/exec"})
    public Mono<Response> send(@Validated @RequestBody AgentCommandDTO dto, ServerHttpRequest serverHttpRequest) throws URISyntaxException {
        log.info("Send: {}", dto);
        Optional<TAgentEntity> agentEntity = pointConsoleService.getAgentByHostAndPort(dto.getHost(), dto.getPort());
        if(!agentEntity.isPresent()){
            return Mono.just(ResponseUtil.makeResponse(50001));
        }
        AgentCommandRequestDTO requestDTO = AgentCommandRequestDTO.builder()
                .request_host(serverHttpRequest.getRemoteAddress().getAddress().getHostAddress())
                .request_port(serverHttpRequest.getRemoteAddress().getPort())
                .sender_host(InetAddressUtil.getLocalHostAddress())
                .sender_port(port)
                .timestamp(new Date())
                .cmd(dto.getCommand())
                .build();
        Mono<Response> response = WebClientUtil.postAsync(makeBaseUrl(dto), "/api/cmd/v1/exec", AgentCommandRequestDTO.class, requestDTO, Response.class);
        return response;
    }
}
