package com.example.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {

    @RequestMapping("/{path:[^\\.]*}")
    public String forwardToReact(@PathVariable String path) {
        return "forward:/";
    }
}
