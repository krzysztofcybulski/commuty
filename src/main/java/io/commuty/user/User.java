package io.commuty.user;

import java.util.HashSet;
import java.util.Set;

public record User(String id, String name, String photoUrl, String description, Set<String> tags) {

    public static class Builder {

        private String id;
        private String name;
        private String photoUrl;
        private String description;
        private Set<String> tags = new HashSet<>();

        private Builder(String id, String name, String photoUrl, String description, Set<String> tags) {
            this.name = name;
            this.photoUrl = photoUrl;
            this.description = description;
            this.tags = tags;
        }

        public static Builder user() {
            return new Builder();
        }

        private Builder() {
        }

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder photoUrl(String photoUrl) {
            this.photoUrl = photoUrl;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder tags(Set<String> tags) {
            this.tags.addAll(tags);
            return this;
        }

        public User build() {
            return new User(id, name, photoUrl, description, tags);
        }
    }
}
