package io.commuty.route.resource;

import io.commuty.route.domain.RouteCreateFlow;
import io.commuty.user.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static java.util.UUID.randomUUID;

@RestController
@RequestMapping("/routes")
@CrossOrigin
public class RouteResource {

    private static final Logger LOG = LoggerFactory.getLogger(RouteResource.class);

    private final RouteCreateFlow routeCreateFlow;

    public RouteResource(RouteCreateFlow routeCreateFlow) {
        this.routeCreateFlow = routeCreateFlow;
    }


    @GetMapping
    public String getRoute() {
        return "Route";
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody RestRoutePreference routePreference) {
        LOG.info("Create route request");
        routeCreateFlow.createFor(UserId.of(randomUUID()), routePreference);
    }

}
