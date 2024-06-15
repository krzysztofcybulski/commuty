package io.commuty.route.domain;

import io.commuty.user.UserId;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface RouteRepository {

    void save(List<Route> routes);

    List<Route> findRoutesFor(UserId userId);
}
