package io.commuty.route.resource;

import java.util.List;

public record RestCommuteRoute(RestAddress addressFrom, RestAddress addressTo, List<RestTimePreference> timePreferences) {
}
