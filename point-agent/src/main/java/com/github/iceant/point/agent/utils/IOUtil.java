package com.github.iceant.point.agent.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class IOUtil {
    public static String readAsString(InputStream inputStream, String charset){
        if(inputStream==null) return null;
        if(charset==null||charset.length()<1) charset = "UTF-8";
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] buffer=new byte[1024];
        int count =0;
        try {
            while ((count = inputStream.read(buffer, 0, 1024)) != -1) {
                byteArrayOutputStream.write(buffer, 0, count);
            }
            byteArrayOutputStream.flush();
            return byteArrayOutputStream.toString(charset);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                byteArrayOutputStream.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

    }

    public static String readAsString(InputStream inputStream) {
        return readAsString(inputStream, "UTF-8");
    }
}
