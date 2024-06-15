package io.commuty.user;

import java.util.UUID;

public record UserId(UUID userId) {

    public static UserId of(UUID userId) {
        return new UserId(userId);
    }
}
