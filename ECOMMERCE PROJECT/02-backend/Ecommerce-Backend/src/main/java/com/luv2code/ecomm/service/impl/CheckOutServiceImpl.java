package com.luv2code.ecomm.service.impl;

import com.luv2code.ecomm.Dao.CustomerRespository;
import com.luv2code.ecomm.Entity.Customer;
import com.luv2code.ecomm.Entity.Order;
import com.luv2code.ecomm.Entity.OrderItem;
import com.luv2code.ecomm.dto.Purchase;
import com.luv2code.ecomm.dto.PurchaseResponse;
import com.luv2code.ecomm.projection.CustomerProjection;
import com.luv2code.ecomm.service.CheckOutService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckOutServiceImpl implements CheckOutService {
    @Autowired
    private CustomerRespository customerRespository;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();
        System.out.println(order);
        String trackingNumber = generateTrackingNumber();

        order.setOrderTrackingNumber(trackingNumber);
        Set<OrderItem> orderItems = purchase.getOrderItems();

        orderItems.forEach(item -> order.add(item));

        order.setShippingAddress(purchase.getShippingAddress());
        order.setBillingAddress(purchase.getBillingAddress());

//        order.setOrderItems(orderItems);
//        🔥 Why Option 1 (add(item)) is better:
//        Maintains the relationship on both sides (i.e., sets item.setOrder(this)).
//
//        Avoids issues with lazy-loading, orphan removal, and cascading.
//
//                Plays nicely with Hibernate’s dirty checking.

        Customer customer = purchase.getCustomer();
        customer.add(order);

        System.out.println(customer.getFirstName());
        customerRespository.save(customer);

        customerRespository.flush();


        return new PurchaseResponse(trackingNumber);
    }

    private String generateTrackingNumber() {

        return UUID.randomUUID().toString();
    }

}
