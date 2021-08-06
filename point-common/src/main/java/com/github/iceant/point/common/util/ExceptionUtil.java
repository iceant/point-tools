package com.github.iceant.point.common.util;

import java.io.PrintWriter;
import java.io.StringWriter;

public class ExceptionUtil {
    public static String dumpAsString(Exception err){
        StringWriter sw = new StringWriter();
        PrintWriter printWriter = new PrintWriter(sw);
        err.printStackTrace(printWriter);
        return sw.toString();
    }
}
