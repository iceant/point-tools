package com.github.iceant.point.agent.components;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

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
}
