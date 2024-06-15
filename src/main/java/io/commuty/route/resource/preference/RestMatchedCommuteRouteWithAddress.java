package io.commuty.route.resource.preference;

import io.commuty.route.resource.RestAddress;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Set;

public record RestMatchedCommuteRouteWithAddress(RestAddress addressFrom, RestAddress addressTo, Set<DayOfWeek> days, LocalTime from, LocalTime to) {
}
