package io.commuty.route.domain;

import io.commuty.user.UserId;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

public interface RouteRepository {

    void save(List<Route> routes);

    List<Route> findRoutesFor(UserId userId);

    List<Route> findMatchedRoutes(Double longitude, Double latitude, Integer levelOfDetail, DayOfWeek day, LocalTime hour, RidePreference ridePreference);
}
