package io.commuty.route.domain;

import io.commuty.user.UserId;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

@Component
public class Matcher {

    private final RouteRepository routeRepository;

    public Matcher(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public List<Route> matchFor(UserId authenticated) {
        final var routes = routeRepository.findRoutesFor(authenticated);
        return routes.stream()
                .map(route -> List.of(matchRouteFor(route.from(), route.day(), route.hour(), route.ridePreference()),
                        matchRouteFor(route.to(), route.day(), route.hour(), route.ridePreference()))
                )
                .flatMap(List::stream)
                .flatMap(List::stream) //??????
                .filter(route -> !route.user().equals(authenticated))
                .toList();
    }

    private List<Route> matchRouteFor(Address address, DayOfWeek day, LocalTime hour, RidePreference ridePreference) {
        return routeRepository.findMatchedRoutes(
                address.longitude(),
                address.latitude(),
                address.levelOfDetail(),
                day,
                hour,
                ridePreference);
    }
}
