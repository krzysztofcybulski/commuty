package io.commuty.route.resource;

import java.util.List;

public record CommuteRoute(RestAddress addressFrom, RestAddress addressTo, List<TimePreference> timePreferences) {
}
