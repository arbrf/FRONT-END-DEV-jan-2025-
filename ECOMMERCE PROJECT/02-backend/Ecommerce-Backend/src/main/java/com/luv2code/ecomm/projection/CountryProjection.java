package com.luv2code.ecomm.projection;

import com.luv2code.ecomm.entity.Country;
import org.springframework.data.rest.core.config.Projection;
import java.util.Set;
import com.luv2code.ecomm.Entity.State;

@Projection(name = "countryProjection", types = { Country.class })
public interface CountryProjection {
    int getId();
    String getCode();
    String getName();
    Set<State> getStates();
}