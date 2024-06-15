package io.commuty.route.domain;

import io.commuty.user.UserId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class InMemoryRouteRepository implements RouteRepository {

    private static final List<Route> ROUTES = new ArrayList<>();

    @Override
    public void save(List<Route> routes) {
        ROUTES.addAll(routes);
    }

    @Override
    public List<Route> findRoutesFor(UserId userId) {
        return null;
    }
}
