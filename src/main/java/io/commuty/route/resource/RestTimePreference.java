package io.commuty.route.resource;

import java.time.DayOfWeek;

public record RestTimePreference(DayOfWeek day, RestTimeRange timeRange) {
}
