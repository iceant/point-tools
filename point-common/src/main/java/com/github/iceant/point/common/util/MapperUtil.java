package com.github.iceant.point.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;

public class MapperUtil {
    public static <T> T mapAsType(Object object, Class<T> type){
        ObjectMapper mapper = new ObjectMapper();
        return mapper.convertValue(object, type);
    }
}
