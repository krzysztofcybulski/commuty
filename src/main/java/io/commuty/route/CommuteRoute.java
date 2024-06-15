package io.commuty.route;

import java.util.List;

public record CommuteRoute(List<Address> addressFrom, List<Address> addressTo, List<TimePreference> timePreferences) {
}
