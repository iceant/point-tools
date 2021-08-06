package com.github.iceant.point.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AgentCommandRequestDTO {
    @NotEmpty
    private String cmd;

    @NotNull
    private Date timestamp;

    @NotEmpty
    private String request_host;

    @NotEmpty
    private Integer request_port;

    @NotEmpty
    private String sender_host;

    @NotNull
    private Integer sender_port;
}
