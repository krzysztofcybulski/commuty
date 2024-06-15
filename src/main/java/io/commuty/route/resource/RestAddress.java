package io.commuty.route.resource;

import io.commuty.route.domain.Address;

public record RestAddress(String longitude, String latitude, Integer levelOfDetail) {

    public static RestAddress restAddressFrom(Address address) {
        return new RestAddress(address.longitude().toString(), address.latitude().toString(), address.levelOfDetail());
    }
}
