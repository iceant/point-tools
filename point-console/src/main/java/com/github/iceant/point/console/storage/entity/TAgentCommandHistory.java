package com.github.iceant.point.console.storage.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
@DynamicInsert
@Entity
@Table(name = "t_agent_command_history")
public class TAgentCommandHistory implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "agent_host", nullable = false)
    private String agentHost;

    @Column(name = "agent_port", nullable = false)
    private Integer agentPort;

    @Column(name = "request_host")
    private String requestHost;

    @Column(name = "request_port")
    private Integer requestPort;

    @Column(name = "sender_host")
    private String senderHost;

    @Column(name = "sender_port")
    private Integer senderPort;

    private Date timestamp;

    @Column(nullable = false)
    private String command;

    private String output;

    private String error;

    private Integer returnCode;
}
