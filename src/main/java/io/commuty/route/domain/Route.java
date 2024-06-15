package io.commuty.route.domain;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record Route(String user, Address from, Address to, DayOfWeek day, LocalTime hour,
                    RidePreference ridePreference) {
}
