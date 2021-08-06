package com.github.iceant.point.console.utils;

import com.github.iceant.point.console.api.dto.AgentCommandDTO;

public class AgentRequestUtil {
    public static String makeBaseUrl(AgentCommandDTO dto){
        return "http://"+dto.getHost()+":"+dto.getPort();
    }
}
