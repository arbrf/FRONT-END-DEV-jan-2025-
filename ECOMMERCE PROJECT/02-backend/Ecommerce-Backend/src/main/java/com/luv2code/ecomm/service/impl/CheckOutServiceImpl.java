package com.luv2code.ecomm.service.impl;

import com.luv2code.ecomm.Dao.CustomerRespository;
import com.luv2code.ecomm.Entity.Customer;
import com.luv2code.ecomm.Entity.Order;
import com.luv2code.ecomm.Entity.OrderItem;
import com.luv2code.ecomm.dto.PaymentInfoDTO;
import com.luv2code.ecomm.dto.Purchase;
import com.luv2code.ecomm.dto.PurchaseResponse;
import com.luv2code.ecomm.projection.CustomerProjection;
import com.luv2code.ecomm.service.CheckOutService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CheckOutServiceImpl implements CheckOutService {
    @Autowired
    private CustomerRespository customerRespository;

    private String stripeSecretKey;

    public CheckOutServiceImpl(CustomerRespository customerRespository,/*@Value("${stripe.key.secret}")*/ String stripeSecretKey) {
        this.customerRespository = customerRespository;
        this.stripeSecretKey = stripeSecretKey;
        Stripe.apiKey=stripeSecretKey;
    }

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

        String email=purchase.getCustomer().getEmail();
        Customer existingCustomer=customerRespository.findByEmail(email);
Customer customer=new Customer();
       if(existingCustomer!=null){
           customer=existingCustomer;
       }
       else {
           customer = purchase.getCustomer();
       }

        customer.add(order);

        System.out.println(customer.getFirstName());
        customerRespository.save(customer);

        customerRespository.flush();


        return new PurchaseResponse(trackingNumber);
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfoDTO paymentInfoDTO) throws StripeException {
        List<String>  paymentMethodTypes=new ArrayList<>();
        Map<String,Object> params= new Hashtable<>();
        params.put("amount", paymentInfoDTO.getAmount());
        params.put("currency",paymentInfoDTO.getCurrency());
        params.put("payment_method_types",paymentMethodTypes);
        return PaymentIntent.create(params);
    }

    private String generateTrackingNumber() {

        return UUID.randomUUID().toString();
    }

}
