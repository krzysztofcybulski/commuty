package io.commuty.route.resource;

import java.time.DayOfWeek;

public record TimePreference(DayOfWeek day, TimeRange timeRange) {
}
