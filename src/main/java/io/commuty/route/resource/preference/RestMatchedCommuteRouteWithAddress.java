package io.commuty.route.resource.preference;

import io.commuty.route.resource.RestAddress;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record RestMatchedCommuteRouteWithAddress(RestAddress addressFrom, RestAddress addressTo, DayOfWeek day, LocalTime from, LocalTime to) {
}
