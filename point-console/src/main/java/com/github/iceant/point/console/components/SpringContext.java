package com.github.iceant.point.console.components;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class SpringContext implements ApplicationContextAware {
    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        SpringContext.applicationContext = applicationContext;
    }

    public static <T> T getBean(Class<T> type){
        return applicationContext.getBean(type);
    }

    public static Integer getPort(){
        return applicationContext.getBean(Environment.class).getProperty("server.port", Integer.class, 8080);
    }

    public static String getMessage(Locale locale, String message, String defaultValue, Object ... args){
        return applicationContext.getMessage(message, args, defaultValue, locale);
    }

    public static String getMessage(String name){
        return getMessage(LocaleContextHolder.getLocale(), name, null);
    }

    public static String getMessage(String name, Object ... args){
        return getMessage(LocaleContextHolder.getLocale(), name, null, args);
    }

}
