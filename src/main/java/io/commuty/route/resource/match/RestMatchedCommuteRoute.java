package io.commuty.route.resource.match;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record RestMatchedCommuteRoute(DayOfWeek day, LocalTime from, LocalTime to) {
}
