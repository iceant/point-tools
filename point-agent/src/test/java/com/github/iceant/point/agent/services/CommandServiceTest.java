package com.github.iceant.point.agent.services;

import com.github.iceant.point.agent.PointAgentApplication;
import com.github.iceant.point.agent.utils.IOUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = {PointAgentApplication.class})
class CommandServiceTest {
    @Autowired
    CommandService commandService;

    @Test
    public void testExecute() throws InterruptedException {
        commandService.execute(new ICommandCallback() {
            @Override
            public void onSuccess(InputStream inputStream) {
                String content = IOUtil.readAsString(inputStream, "GBK");
                System.out.println("OUTPUT:");
                System.out.println(content);
            }

            @Override
            public void onError(InputStream inputStream) {
                String content = IOUtil.readAsString(inputStream, "GBK");
                System.out.println("ERROR:");
                System.out.println(content);
            }

            @Override
            public void onReturn(int code) {
                System.out.println("RETURN:"+code);
            }
        }, "cmd", "/c", "dir");
        Thread.sleep(1000);
    }
}