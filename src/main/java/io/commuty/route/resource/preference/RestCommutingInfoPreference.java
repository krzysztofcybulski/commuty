package io.commuty.route.resource.preference;

import java.util.List;

public record RestCommutingInfoPreference(List<RestMatchedCommuteRouteWithAddress> routes) {
}
