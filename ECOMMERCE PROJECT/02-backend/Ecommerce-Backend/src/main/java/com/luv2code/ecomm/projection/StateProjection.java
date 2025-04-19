package com.luv2code.ecomm.projection;

import com.luv2code.ecomm.Entity.State;
import org.springframework.data.rest.core.config.Projection;
import com.luv2code.ecomm.Entity.Country;

@Projection(name = "stateProjection", types = { State.class })
public interface StateProjection {
    int getId();
    String getName();
    Country getCountry();
}
