package com.github.iceant.point.agent.services;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommandResult {
    private Integer code;
    private String output;
    private String error;
}
