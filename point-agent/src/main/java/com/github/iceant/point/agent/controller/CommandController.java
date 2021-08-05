package com.github.iceant.point.agent.controller;

import com.github.iceant.point.agent.services.CommandResult;
import com.github.iceant.point.agent.services.CommandService;
import com.github.iceant.point.common.api.Response;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(path = {"/api/cmd/v1"})
public class CommandController {

    final CommandService commandService;

    public CommandController(CommandService commandService) {
        this.commandService = commandService;
    }

    @PostMapping(path = {"/run"})
    public Mono<Object> execute(@RequestBody String command) throws ExecutionException, InterruptedException {

        CompletableFuture<CommandResult> future = commandService.execute(null, CommandService.makeCommand(command));

        return Mono.just(Response.success(future.get()));
    }
}
