package io.commuty.route.domain;

import io.commuty.user.UserId;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record Route(UserId user, Address from, Address to, DayOfWeek day, LocalTime hour,
                    RidePreference ridePreference) {
}
