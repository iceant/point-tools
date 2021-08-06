package com.github.iceant.point.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AgentOfflineDTO {
    private String host;
    private Integer port;
    private Date offlineDate;
}
