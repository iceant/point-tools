package com.github.iceant.point.console.api;

import com.github.iceant.point.common.api.Response;
import com.github.iceant.point.common.dto.AgentCommandRequestDTO;
import com.github.iceant.point.common.dto.AgentOfflineDTO;
import com.github.iceant.point.common.dto.AgentOnlineDTO;
import com.github.iceant.point.common.dto.CommandResult;
import com.github.iceant.point.common.util.ExceptionUtil;
import com.github.iceant.point.common.util.InetAddressUtil;
import com.github.iceant.point.common.util.MapperUtil;
import com.github.iceant.point.common.util.WebClientUtil;
import com.github.iceant.point.console.api.dto.AgentCommandDTO;
import com.github.iceant.point.console.api.vo.AgentVO;
import com.github.iceant.point.console.mapper.IAgentMapper;
import com.github.iceant.point.console.services.IPointConsoleService;
import com.github.iceant.point.console.storage.entity.TAgentCommandHistory;
import com.github.iceant.point.console.storage.entity.TAgentEntity;
import com.github.iceant.point.console.utils.ResponseUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

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
    public Response register(@RequestBody AgentOnlineDTO dto){
        log.info("Register: {}", dto);
        TAgentEntity entity = pointConsoleService.handleOnline(dto);
        return Response.success(entity);
    }

    @PostMapping(path = {"/offline"})
    public Response offline(@RequestBody AgentOfflineDTO dto){
        log.info("Offline: {}", dto);
        TAgentEntity entity = pointConsoleService.handleOffline(dto);
        return Response.success(entity);
    }

    @PostMapping(path = {"/send", "/run", "/exec"})
    public Response send(@Validated @RequestBody AgentCommandDTO dto, HttpServletRequest httpRequest){
        log.info("Send: {}", dto);
        Optional<TAgentEntity> agentEntity = pointConsoleService.getAgentByHostAndPort(dto.getHost(), dto.getPort());
        if(!agentEntity.isPresent()){
            log.info("NotFound: {}:{}", dto.getHost(), dto.getPort());
            return ResponseUtil.makeResponse(50001);
        }
        AgentCommandRequestDTO requestDTO = AgentCommandRequestDTO.builder()
                .request_host(httpRequest.getRemoteHost())
                .request_port(httpRequest.getRemotePort())
                .sender_host(InetAddressUtil.getLocalHostAddress())
                .sender_port(port)
                .timestamp(new Date())
                .cmd(dto.getCommand())
                .build();
        TAgentCommandHistory history = TAgentCommandHistory.builder()
                .agentHost(dto.getHost())
                .agentPort(dto.getPort())
                .requestHost(requestDTO.getRequest_host())
                .requestPort(requestDTO.getRequest_port())
                .senderHost(requestDTO.getSender_host())
                .senderPort(requestDTO.getSender_port())
                .timestamp(new Date())
                .command(dto.getCommand())
                .build();
        pointConsoleService.save(history);
        try {
            Mono<Response> response = WebClientUtil.postAsync(makeBaseUrl(dto), "/api/cmd/v1/exec", AgentCommandRequestDTO.class, requestDTO, Response.class);
            Response commandResponse = response.block();
            if(ResponseUtil.isSuccess(commandResponse)){
                CommandResult commandResult = MapperUtil.mapAsType(commandResponse.getData(), CommandResult.class);
                history.setReturnCode(commandResult.getCode());
                history.setOutput(commandResult.getOutput());
                history.setError(commandResult.getError());
                pointConsoleService.save(history);
            }else{
                history.setReturnCode(commandResponse.getStatus());
                history.setError(commandResponse.getMessage());
            }
            return commandResponse;
        }catch (Exception err){
            history.setError(ExceptionUtil.dumpAsString(err));
            pointConsoleService.save(history);
            throw new RuntimeException(err);
        }
    }

    @GetMapping(path = {"/list"})
    public Response list(){
        List<TAgentEntity> agentEntityList = pointConsoleService.listAllAgent();
        List<AgentVO> list = new ArrayList<>();
        for(TAgentEntity entity : agentEntityList){
            list.add(IAgentMapper.INSTANCE.entityToVO(entity));
        }
        return Response.success(list);
    }
}
