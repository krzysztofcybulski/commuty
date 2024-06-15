package io.commuty.route.domain;

import io.commuty.user.UserId;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class InMemoryRouteRepository implements RouteRepository {

    private static final Double COORDINATION_RANGE = Double.valueOf("0.02");
    private static final Duration HOUR_RANGE = Duration.ofHours(3);
    private static final List<Route> ROUTES = new ArrayList<>();

    @Override
    public void save(List<Route> routes) {
        ROUTES.addAll(routes);
    }

    @Override
    public List<Route> findRoutesFor(UserId userId) {
        return ROUTES.stream()
                .filter(route -> route.user().equals(userId))
                .toList();
    }

    @Override
    public List<Route> findMatchedRoutes(Double longitude,
                                         Double latitude,
                                         Integer levelOfDetail,
                                         DayOfWeek day,
                                         LocalTime hour,
                                         RidePreference ridePreference) {
        return ROUTES.stream()
                .filter(route -> route.from().levelOfDetail().equals(levelOfDetail)
                        && checkCoordinateRangeFor(route.from().longitude(), longitude)
                        && checkCoordinateRangeFor(route.from().latitude(), latitude))
                .filter(route -> route.day().equals(day))
                .filter(route -> checkHourRangeFor(route.hour().getHour(), hour.getHour()))
                .filter(route -> route.ridePreference().equals(ridePreference))
                .toList();
    }

    private boolean checkCoordinateRangeFor(Double coordinateToMatch, Double routeCoordinate) {
        return Math.abs(coordinateToMatch - routeCoordinate) <= COORDINATION_RANGE;
    }

    private boolean checkHourRangeFor(int hourToMatch, int routeHour) {
        return Math.abs(hourToMatch - routeHour) <= HOUR_RANGE.toHours();
    }
}
