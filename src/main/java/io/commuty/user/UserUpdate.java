package io.commuty.user;

import java.util.List;
import java.util.Set;

public record UserUpdate(String name, String photoUrl, String description, Set<String> tags) {
}
