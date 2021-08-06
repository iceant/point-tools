package com.github.iceant.point.console.storage.entity;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class HostPortKey implements Serializable {
    private String host;
    private Integer port;
}
