package com.github.iceant.point.agent.utils;

import java.io.IOException;

public class RuntimeUtil {
    public static String run(String command){
        try {
            Process process = Runtime.getRuntime().exec(command);
            process.waitFor();
            return IOUtil.readAsStream(process.getInputStream(), "UTF-8");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        String out = run("java");
        System.out.println(out);
    }
}
