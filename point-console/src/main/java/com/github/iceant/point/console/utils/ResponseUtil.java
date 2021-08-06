package com.github.iceant.point.console.utils;

import com.github.iceant.point.common.api.Response;
import com.github.iceant.point.console.components.SpringContext;

import java.util.Date;

public class ResponseUtil {

    public static <T> Response<T> makeResponse(int errorCode){
        String message = SpringContext.getMessage("error."+errorCode);
        return (Response<T>) Response.builder()
                .timestamp(new Date())
                .status(errorCode)
                .message(message)
                .build();
    }
}
