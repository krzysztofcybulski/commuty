package io.commuty.route.domain;

import io.commuty.route.resource.RestAddress;
import io.commuty.route.resource.RestRidePreference;
import io.commuty.route.resource.RestRoutePreference;
import io.commuty.route.resource.RestTimePreference;
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

    public void createFor(String userId, RestRoutePreference routePreference) {
        final var ridePreference = ridePreferenceFrom(routePreference.ridePreferences());
        final var routes = routePreference.commutingRoutes().stream()
                .flatMap(commuteRoute -> commuteRoute.timePreferences().stream()
                        .map(timePreference -> createRoutesCombinationsForTimeRange(
                                userId,
                                commuteRoute.addressFrom(),
                                commuteRoute.addressTo(),
                                timePreference,
                                ridePreference
                        )))
                .flatMap(List::stream)
                .toList();
        LOG.info("Routes mapped to domain routes: " + routes);
        routeRepository.save(routes);
    }

    private List<Route> createRoutesCombinationsForTimeRange(String userId, RestAddress from, RestAddress to, RestTimePreference timePreference, RidePreference ridePreference) {
        final DayOfWeek day = timePreference.day();
        final LocalTime departureTime = LocalTime.parse(timePreference.timeRange().departureTime(), formatter);
        final LocalTime returnTime = LocalTime.parse(timePreference.timeRange().returnTime(), formatter);
        return List.of(
                createRouteFor(userId, from, to, day, departureTime, ridePreference),
                createRouteFor(userId, to, from, day, returnTime, ridePreference)
        );
    }

    private Route createRouteFor(String userId, RestAddress from, RestAddress to, DayOfWeek day, LocalTime hour, RidePreference ridePreference) {
        return new Route(userId, addressFrom(from), addressFrom(to), day, hour, ridePreference);
    }

    private Address addressFrom(RestAddress address) {
        return new Address(Double.valueOf(address.longitude()), Double.valueOf(address.latitude()), address.levelOfDetail());
    }

    private RidePreference ridePreferenceFrom(List<RestRidePreference> restRidePreferences) {
        if (restRidePreferences.size() == 2) return RidePreference.BOTH;
        if (restRidePreferences.size() == 1)
            return restRidePreferences.getFirst() == RestRidePreference.DRIVER ? RidePreference.DRIVER : RidePreference.PASSENGER;
        throw new IllegalStateException("Improper ride preference");
    }
}
