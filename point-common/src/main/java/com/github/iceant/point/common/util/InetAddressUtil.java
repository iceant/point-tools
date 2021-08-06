package com.github.iceant.point.common.util;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class InetAddressUtil {

    public static String getLocalHostAddress(){
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getLocalHostName(){
        try {
            return InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getRemoteHostName(){
        return InetAddress.getLoopbackAddress().getHostName();
    }

    public static String getRemoteAddress(){
        return InetAddress.getLoopbackAddress().getHostAddress();
    }

}
