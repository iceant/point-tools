package com.github.iceant.point.console.api.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgentVO {
    private String host;
    private Integer port;
    private String operationSystem;

    @JsonProperty("offline_date")
    private Date offlineDate;

    @JsonProperty("online_date")
    private Date onlineDate;
}
