package com.luv2code.ecomm.projection;

import com.luv2code.ecomm.Entity.Customer;
import com.luv2code.ecomm.Entity.Order;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "customerprojection", types = { Customer.class })
public interface CustomerProjection {

    long getId();

    String getFirstName();

    String getLastName();

    String getEmail();

    Set<Order> getOrders(); // Optional – will show orders if you want to expose them
}
