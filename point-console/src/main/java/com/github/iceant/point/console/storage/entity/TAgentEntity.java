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

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
@DynamicInsert
@Table(name = "t_agent")
@IdClass(HostPortKey.class)
public class TAgentEntity implements Serializable {
    @Id
    private String host;
    @Id
    private Integer port;
    
    private String operationSystem;

    private Date onlineDate;

    private Date offlineDate;
}
