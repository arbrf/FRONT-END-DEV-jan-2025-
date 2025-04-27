package com.luv2code.ecomm.projection;

import com.luv2code.ecomm.Entity.Address;
import com.luv2code.ecomm.Entity.Customer;
import com.luv2code.ecomm.Entity.Order;

import com.luv2code.ecomm.Entity.OrderItem;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Projection(name = "orderProjection", types = { Order.class })
public interface OrderProjection {
    Long getId();
    String getOrderTrackingNumber();
    String getStatus();
    Date getDateCreated();
    Date getDateLastUpdated();
    Address getShippingAddress();
    Address getBillingAddress();
    Set<OrderItem> getOrderItems();
    BigDecimal getTotalQuantity();
    Customer getCustomer();
    BigDecimal getTotalPrice();
}