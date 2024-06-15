package io.commuty.user;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserResource {

    private static final UserId creatorUserId = UserId.of("811a26c2-6e64-4309-83b3-642cbf4d6a8f");

    private final UserRepository userRepository;

    public UserResource(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PutMapping
    public void updateUser(@RequestBody UserUpdate userUpdate) {
        userRepository.updateFor(creatorUserId, userUpdate);
    }
}
