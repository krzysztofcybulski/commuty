package io.commuty.user;

public interface UserRepository {

    void save(User user);

    void updateFor(UserId userId, UserUpdate userUpdate);
}
