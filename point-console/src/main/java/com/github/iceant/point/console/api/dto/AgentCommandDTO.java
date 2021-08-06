package com.github.iceant.point.console.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AgentCommandDTO {

    @NotEmpty
    private String host;

    @NotNull
    private Integer port;

    @NotEmpty
    private String command;
}
