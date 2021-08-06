package com.github.iceant.point.common.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Response<T> {
    T data;
    Integer status;
    String message;
    Date timestamp;

    public static <T> Response<T> success(int code, T value, String message){
        return (Response<T>) builder().status(code).data(value).message(message).timestamp(new Date()).build();
    }

    public static <T> Response<T> success(T value){
        return (Response<T>) builder().status(200).data(value).message("success").timestamp(new Date()).build();
    }

    public static <T> Response<T> fail(int code, String message){
        return (Response<T>) builder().status(code).message(message).timestamp(new Date()).build();
    }
}
