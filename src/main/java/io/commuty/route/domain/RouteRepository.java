package io.commuty.route.domain;

import io.commuty.user.UserId;

import java.util.List;

public interface RouteRepository {

    void save(List<Route> routes);

    List<Route> findRoutesFor(UserId userId);
}
