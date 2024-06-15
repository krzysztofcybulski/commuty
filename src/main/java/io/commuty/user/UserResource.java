package io.commuty.user;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserResource {

    private final UserRepository userRepository;

    public UserResource(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PutMapping
    public void updateUser(@RequestBody UserUpdate userUpdate, Authentication authentication) {
        userRepository.updateFor(authentication.getName(), userUpdate);
    }
}
