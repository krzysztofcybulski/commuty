package io.commuty.route.resource;

import io.commuty.route.domain.Matcher;
import io.commuty.route.domain.Route;
import io.commuty.route.domain.RouteCreateFlow;
import io.commuty.route.domain.RouteRepository;
import io.commuty.route.resource.match.MatchedRoutes;
import io.commuty.route.resource.match.RestCommutingInfo;
import io.commuty.route.resource.match.RestMatchedCommuteRoute;
import io.commuty.route.resource.match.RestMatches;
import io.commuty.route.resource.preference.RestCommutingInfoPreference;
import io.commuty.route.resource.preference.RestMatchedCommuteRouteWithAddress;
import io.commuty.route.resource.preference.RestRoutePreferences;
import io.commuty.user.User;
import io.commuty.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static java.util.Comparator.comparingInt;
import static java.util.stream.Collectors.groupingBy;

@RestController
@RequestMapping("/routes")
@CrossOrigin
public class RouteResource {

    private static final Logger LOG = LoggerFactory.getLogger(RouteResource.class);

    private final RouteCreateFlow routeCreateFlow;
    private final Matcher matcher;
    private final RouteRepository routeRepository;
    private final UserRepository userRepository;

    public RouteResource(RouteCreateFlow routeCreateFlow, Matcher matcher, RouteRepository routeRepository, UserRepository userRepository) {
        this.routeCreateFlow = routeCreateFlow;
        this.matcher = matcher;
        this.routeRepository = routeRepository;
        this.userRepository = userRepository;
    }


    @GetMapping
    public MatchedRoutes getMatchedRoutes(Authentication authentication) {
        final var matchedRoutes = matcher.matchFor(authentication.getName());
        final var matchedRouteByUserId = matchedRoutes.stream()
                .collect(groupingBy(Route::user));
        final var matches = matchedRouteByUserId.entrySet().stream()
                .map(matchedRouteByUserIdEntry -> {
                    final var user = userRepository.get(matchedRouteByUserIdEntry.getKey());
                    final var matchedRoutesByDay = matchedRouteByUserIdEntry.getValue().stream()
                            .collect(groupingBy(Route::day));
                    final var routes = matchedRoutesByDay.entrySet().stream()
                            .map(matchedRoutesByDayEntry -> {
                                final var day = matchedRoutesByDayEntry.getKey();
                                final var routesForDay = matchedRoutesByDayEntry.getValue();
                                routesForDay.sort(comparingInt(route -> route.hour().getHour())); // simplification
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
    public void create(@RequestBody RestRoutePreference routePreference, Authentication authentication) {
        LOG.info("Create route request");
        final var user = routePreference.user();
        userRepository.save(new User(authentication.getName(), user.name(), "", "", Set.of()));
        routeCreateFlow.createFor(authentication.getName(), routePreference);
    }

    @GetMapping("/preferences")
    public RestRoutePreferences getRoutesPreferences(Authentication authentication) {
        final var routes = routeRepository.findRoutesFor(authentication.getName());
        final var sortedRoutes = new ArrayList<>(routes);
        sortedRoutes.sort(comparingInt(route -> route.hour().getHour())); // simplification
        final var firstPartRoute = routes.getFirst();
        final var lastPartRoute = routes.getLast();
        final var routeWithAddress = new RestMatchedCommuteRouteWithAddress(
                RestAddress.restAddressFrom(firstPartRoute.from()),
                RestAddress.restAddressFrom(firstPartRoute.to()),
                firstPartRoute.day(),
                firstPartRoute.hour(),
                lastPartRoute.hour()
        );
        final var commutingInfo = new RestCommutingInfoPreference(List.of(routeWithAddress));
        return new RestRoutePreferences(commutingInfo);
    }

    @PostMapping("/v2")
    @ResponseStatus(HttpStatus.CREATED)
    public void createV2(@RequestBody RestRoutePreference routePreference, Authentication authentication) {
        LOG.info("Create route request");
        final var user = routePreference.user();
        userRepository.save(new User(authentication.getName(), user.name(), "", "", Set.of()));
        routeCreateFlow.createFor(authentication.getName(), routePreference);
    }
}
