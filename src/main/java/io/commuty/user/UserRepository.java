package io.commuty.user;

public interface UserRepository {

    User get(String userId);

    void save(User user);

    void updateFor(String userId, UserUpdate userUpdate);
}
