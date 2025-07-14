package com.springproject.jobapplication.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FallbackController {

    @GetMapping(value = {
        "/jobs",
        "/jobs/**",
        "/companies", 
        "/companies/**"
    })
    public String forwardToReact() {
        return "forward:/index.html";
    }
}
