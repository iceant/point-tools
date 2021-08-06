package com.github.iceant.point.common.util;

public class PathUtil {
    public static String join(String root, String ... paths){
        StringBuilder stringBuilder = new StringBuilder();
        if(root.endsWith("/")){
            stringBuilder.append(root.substring(0, root.length()-1));
        }
        for(String path : paths){
            path = path.startsWith("/")?path.substring(1):path;
            path = path.endsWith("/")?path.substring(0, path.length()-1):path;
            stringBuilder.append("/").append(path);
        }
        return stringBuilder.toString();
    }
}
