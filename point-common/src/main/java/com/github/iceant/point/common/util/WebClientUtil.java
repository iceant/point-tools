package com.github.iceant.point.common.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Slf4j
public class WebClientUtil {
    public static <T> Mono<T> postAsync(String baseUrl, String relativeUrl, Class type, Object value, Class<T> resultType){
        log.info("Send Request[{}] to {}{}", value, baseUrl, relativeUrl);
        WebClient webClient = WebClient.builder().baseUrl(baseUrl).build();
        return webClient.post()
                .uri(relativeUrl)
                .body(Mono.just(value), type)
                .retrieve()
                .bodyToMono(resultType);
    }
}
