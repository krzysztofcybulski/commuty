package io.commuty.route;

import java.time.DayOfWeek;

public record TimePreference(DayOfWeek day, TimeRange timeRange) {
}
