package com.github.iceant.point.console.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class IndexController {
    @RequestMapping(path = {"/", "/index", "", "/home", "/index.htm", "/index.html"})
    public String index(Model model){
        return "forward:/static/index.html";
    }
}
