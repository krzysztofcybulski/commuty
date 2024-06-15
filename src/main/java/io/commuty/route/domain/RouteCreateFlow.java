package io.commuty.route.domain;

import io.commuty.route.resource.RestAddress;
import io.commuty.route.resource.RoutePreference;
import io.commuty.route.resource.TimePreference;
import io.commuty.user.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class RouteCreateFlow {

    private static final Logger LOG = LoggerFactory.getLogger(RouteCreateFlow.class);
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

    private final RouteRepository routeRepository;

    public RouteCreateFlow(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public void createFor(UserId userId, RoutePreference routePreference) {
        final var routes = routePreference.commutingRoutes().stream()
                .flatMap(commuteRoute -> commuteRoute.timePreferences().stream()
                        .map(timePreference -> createRoutesCombinationsForTimeRange(
                                userId,
                                commuteRoute.addressFrom(),
                                commuteRoute.addressTo(),
                                timePreference
                        )))
                .flatMap(List::stream)
                .toList();
        LOG.info("Routes mapped to domain routes: " + routes);
        routeRepository.save(routes);
    }

    private List<Route> createRoutesCombinationsForTimeRange(UserId userId, RestAddress from, RestAddress to, TimePreference timePreference) {
        final DayOfWeek day = timePreference.day();
        final LocalTime departureTime = LocalTime.parse(timePreference.timeRange().departureTime(), formatter);
        final LocalTime returnTime = LocalTime.parse(timePreference.timeRange().returnTime(), formatter);
        return List.of(
                createRouteFor(userId, from, to, day, departureTime),
                createRouteFor(userId, to, from, day, returnTime)
        );
    }

    private Route createRouteFor(UserId userId, RestAddress from, RestAddress to, DayOfWeek day, LocalTime hour) {
        return new Route(userId, addressFrom(from), addressFrom(to), day, hour);
    }

    private Address addressFrom(RestAddress address) {
        return new Address(address.longitude(), address.latitude(), address.levelOfDetail());
    }
}
