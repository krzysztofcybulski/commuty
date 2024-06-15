package io.commuty.user;

import org.springframework.stereotype.Repository;

import java.util.HashMap;

import static io.commuty.user.User.Builder.user;

@Repository
public class InMemoryUserRepository implements UserRepository {

    private final HashMap<UserId, User> USERS = new HashMap<>();

    @Override
    public void save(User user) {
        USERS.put(user.id(), user);
    }

    @Override
    public void updateFor(UserId userId, UserUpdate userUpdate) {
        final var user = USERS.get(userId);
        final var updated = user()
                .id(user.id())
                .name(user.name().equals(userUpdate.name()) ? user.name() : userUpdate.name())
                .description(user.description().equals(userUpdate.description()) ? user.description() : userUpdate.description())
                .photoUrl(user.photoUrl().equals(userUpdate.photoUrl()) ? user.photoUrl() : userUpdate.photoUrl())
                .tags(userUpdate.tags())
                .build();
        USERS.put(userId, updated);
    }
}
