package com.github.iceant.point.agent.controller;

import com.github.iceant.point.common.dto.CommandResult;
import com.github.iceant.point.agent.services.CommandService;
import com.github.iceant.point.common.api.Response;
import com.github.iceant.point.common.dto.AgentCommandRequestDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(path = {"/api/cmd/v1"})
@Slf4j
public class CommandController {

    final CommandService commandService;

    public CommandController(CommandService commandService) {
        this.commandService = commandService;
    }

    @PostMapping(path = {"/run", "/exec"})
    public Mono<Object> execute(@RequestBody AgentCommandRequestDTO dto) throws ExecutionException, InterruptedException {
        log.info("Received Request:{}", dto);
        CompletableFuture<CommandResult> future = commandService.execute(null, CommandService.makeCommand(dto.getCmd()));
        return Mono.just(Response.success(future.get()));
    }
}
