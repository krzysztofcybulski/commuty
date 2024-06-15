package io.commuty;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/routes")
public class CommutyResource {

    @GetMapping
    public String getRoute() {
        return "Route";
    }

}
