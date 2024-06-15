package io.commuty.route.resource;

import java.util.List;

public record RoutePreference(User user,
                              List<RidePreference> ridePreferences,
                              List<CommuteRoute> commutingRoutes) {
}
