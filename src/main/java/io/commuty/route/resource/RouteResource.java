package io.commuty.route.resource;

import io.commuty.route.domain.Matcher;
import io.commuty.route.domain.Route;
import io.commuty.route.domain.RouteCreateFlow;
import io.commuty.route.resource.match.MatchedRoutes;
import io.commuty.route.resource.match.RestCommutingInfo;
import io.commuty.route.resource.match.RestMatchedCommuteRoute;
import io.commuty.route.resource.match.RestMatches;
import io.commuty.user.User;
import io.commuty.user.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.groupingBy;

@RestController
@RequestMapping("/routes")
@CrossOrigin
public class RouteResource {

    private static final Logger LOG = LoggerFactory.getLogger(RouteResource.class);

    private final RouteCreateFlow routeCreateFlow;
    private static final UserId creatorUserId = UserId.of(UUID.fromString("811a26c2-6e64-4309-83b3-642cbf4d6a8f"));
    private static final UserId matcherUserId = UserId.of(UUID.fromString("af7c93e4-13d7-42cc-b990-39ddccf5cfd9"));

    private final Matcher matcher;

    public RouteResource(RouteCreateFlow routeCreateFlow, Matcher matcher) {
        this.routeCreateFlow = routeCreateFlow;
        this.matcher = matcher;
    }


    @GetMapping
    public MatchedRoutes getMatchedRoutes() {
        final var matchedRoutes = matcher.matchFor(creatorUserId);
        final var user = new User(creatorUserId, "Tomek", "", "Looking for a passenger", List.of("#rockmusic", "#talkative"));
        final var matchedRouteByUserId = matchedRoutes.stream()
                .collect(groupingBy(Route::user));
        final var matches = matchedRouteByUserId.entrySet().stream()
                .map(matchedRouteByUserIdEntry -> {
                    final var userId = matchedRouteByUserIdEntry.getKey();
                    final var matchedRoutesByDay = matchedRouteByUserIdEntry.getValue().stream()
                            .collect(groupingBy(Route::day));
                    final var routes = matchedRoutesByDay.entrySet().stream()
                            .map(matchedRoutesByDayEntry -> {
                                final var day = matchedRoutesByDayEntry.getKey();
                                final var routesForDay = matchedRoutesByDayEntry.getValue();
                                final var departureTime = routesForDay.getFirst().hour();
                                final var returnTime = routesForDay.getLast().hour();
                                return new RestMatchedCommuteRoute(day, departureTime, returnTime);
                            }).toList();
                    return new RestMatches(user, new RestCommutingInfo(routes));
                }).toList();
        return new MatchedRoutes(matches);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody RestRoutePreference routePreference) {
        LOG.info("Create route request");
        routeCreateFlow.createFor(creatorUserId, routePreference);
    }

    @PostMapping("/v2")
    @ResponseStatus(HttpStatus.CREATED)
    public void createV2(@RequestBody RestRoutePreference routePreference) {
        LOG.info("Create route request");
        routeCreateFlow.createFor(matcherUserId, routePreference);
    }

}
