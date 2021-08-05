package com.github.iceant.point.agent.controller;

import com.github.iceant.point.common.api.Response;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = {"/api/cmd/v1"})
public class CommandController {
    @PostMapping(path = {"/run"})
    public Object execute(@RequestBody String command){

        return Response.success("SUCCESS");
    }
}
