package io.commuty.route.resource;

import java.util.List;

public record RestRoutePreference(RestUser user,
                                  List<RestRidePreference> ridePreferences,
                                  List<RestCommuteRoute> commutingRoutes) {
}
