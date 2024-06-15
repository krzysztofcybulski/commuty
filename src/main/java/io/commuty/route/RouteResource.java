package io.commuty.route;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.UUID;

import static java.util.UUID.randomUUID;

@RestController
@RequestMapping("/routes")
@CrossOrigin
public class RouteResource {

    private static final HashMap<UUID, Route> routesById = new HashMap<>();

    @GetMapping
    public String getRoute() {
        return "Route";
    }

    @PostMapping
    public RouteId create(@RequestBody Route route) {
        final var routeId = randomUUID();
        routesById.put(routeId, route);
        return new RouteId(routeId);
    }

}
