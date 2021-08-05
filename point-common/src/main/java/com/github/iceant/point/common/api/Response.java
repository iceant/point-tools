package com.github.iceant.point.common.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Response<T> {
    T data;
    Integer code;
    String message;

    public static <T> Response<T> success(int code, T value, String message){
        return (Response<T>) builder().code(code).data(value).message(message).build();
    }

    public static <T> Response<T> success(T value){
        return (Response<T>) builder().code(200).data(value).message("success").build();
    }

    public static <T> Response<T> fail(int code, String message){
        return (Response<T>) builder().code(code).message(message).build();
    }
}
