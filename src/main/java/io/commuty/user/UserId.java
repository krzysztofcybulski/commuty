package io.commuty.user;

import java.util.UUID;

public record UserId(String userId) {

    public static UserId of(String userId) {
        return new UserId(userId);
    }
}
