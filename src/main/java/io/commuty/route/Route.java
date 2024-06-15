package io.commuty.route;

import java.util.List;

public record Route(User user,
                    List<RidePreference> ridePreferences,
                    List<CommuteRoute> commuteRoutes) {
}
