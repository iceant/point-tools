package com.github.iceant.point.console.storage.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "t_event_log")
public class TEventLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String object_type;

    private String object_id;

    private String name;

    private Date timestamp;

    private String content;
}
