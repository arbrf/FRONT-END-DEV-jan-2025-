package com.luv2code.ecomm.dto;

import com.luv2code.ecomm.Entity.Address;
import com.luv2code.ecomm.Entity.Customer;
import com.luv2code.ecomm.Entity.Order;
import com.luv2code.ecomm.Entity.OrderItem;

import java.util.Set;

public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

    public Customer getCustomer() {
        return this.customer;
    }

    public Address getShippingAddress() {
        return this.shippingAddress;
    }

    public Address getBillingAddress() {
        return this.billingAddress;
    }

    public Order getOrder() {
        return this.order;
    }

    public Set<OrderItem> getOrderItems() {
        return this.orderItems;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
