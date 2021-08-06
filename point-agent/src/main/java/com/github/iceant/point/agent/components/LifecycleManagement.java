package com.github.iceant.point.agent.components;

import com.github.iceant.point.common.InetAddressUtil;
import com.github.iceant.point.common.api.Response;
import com.github.iceant.point.common.dto.AgentOfflineDTO;
import com.github.iceant.point.common.dto.AgentOnlineDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.Date;

@Component
@Slf4j
public class LifecycleManagement {

    @Value("${point.console.server-addr:'http://localhost:10101'}")
    String serverAddr;

    @Value("${server.port:8080}")
    Integer port;

    @PostConstruct
    public void register(){
        AgentOnlineDTO dto = AgentOnlineDTO.builder()
                .host(InetAddressUtil.getLocalHostAddress())
                .port(port)
                .onlineDate(new Date())
                .build();
        WebClient webClient = WebClient.builder().baseUrl(serverAddr).build();
        Mono<Response> response = webClient.post().uri("/api/agent/v1/register")
        .body(Mono.just(dto), AgentOnlineDTO.class).retrieve().bodyToMono(Response.class);
        log.info("Register: {}", response.block());
        assert response.block().getStatus()==200;
    }

    @PreDestroy
    public void offline(){
        AgentOfflineDTO dto = AgentOfflineDTO.builder()
                .host(InetAddressUtil.getLocalHostAddress())
                .port(port)
                .offlineDate(new Date())
                .build();
        WebClient webClient = WebClient.builder().baseUrl(serverAddr).build();
        Mono<Response> response = webClient.post().uri("/api/agent/v1/offline")
                .body(Mono.just(dto), AgentOfflineDTO.class)
                .retrieve()
                .bodyToMono(Response.class);
        log.info("Offline Response: {}", response.block());
        assert response.block().getStatus()==200;
    }
}
