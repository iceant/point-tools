package com.github.iceant.point.agent.services;

import com.github.iceant.point.agent.utils.IOUtil;
import com.github.iceant.point.agent.utils.OSUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.function.Supplier;

@Service
public class CommandService {
    @Autowired
    ExecutorService executorService;

    @Value("${app.console.charset:UTF-8}")
    String consoleCharset;

    public static String[] makeCommand(String ... command){
        if(OSUtil.isWindows()){
            return new String[]{"cmd", "/C", String.join(" ", command)};
        }else{
            return new String[]{"/bin/sh", "-c", String.join(" ", command)};
        }
    }

    public <T> CompletableFuture<CommandResult> execute(ICommandCallback callback, String ... command){
        return execute(callback, null, command);
    }

    public <T> CompletableFuture<CommandResult> execute(ICommandCallback callback, File path, String ... command){

        return CompletableFuture.supplyAsync(new Supplier<Process>() {
            @Override
            public Process get() {
                try {
                    return Runtime.getRuntime().exec(command, null, path);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }, executorService).thenApplyAsync(new Function<Process, CommandResult>() {
            @Override
            public CommandResult apply(Process process) {
                CommandResult result = CommandResult.builder().build();
                try {
                    result.setOutput(IOUtil.readAsString(process.getInputStream(), consoleCharset));
                    result.setError(IOUtil.readAsString(process.getErrorStream(), consoleCharset));
                    result.setCode(process.waitFor());
                    return result;
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }finally {
                    process.destroy();
                }
            }
        }, executorService);
    }

    public Future executeAndWait(ICommandCallback callback, long timeout, TimeUnit unit, File path, String ... command){
        return executorService.submit(new Runnable() {
            @Override
            public void run() {
                Process process = null;
                try{
                    process = Runtime.getRuntime().exec(command, null, path);
                    if(process!=null) {
                        callback.onSuccess(process.getInputStream());
                        callback.onError(process.getErrorStream());
                        callback.onReturn(process.waitFor(timeout, unit)?0:-1);
                    }
                } catch (Exception e) {
                    throw new RuntimeException(e);
                } finally {
                    if(process!=null){
                        process.destroy();
                        process=null;
                    }
                }
            }
        });
    }
}
