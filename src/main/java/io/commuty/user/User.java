package io.commuty.user;

import java.util.List;

public record User(UserId id, String name, String photoUrl, String description, List<String> tags) {
}
