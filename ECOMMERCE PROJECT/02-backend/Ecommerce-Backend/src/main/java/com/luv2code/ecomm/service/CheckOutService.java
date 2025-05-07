package com.luv2code.ecomm.service;

import com.luv2code.ecomm.dto.PaymentInfoDTO;
import com.luv2code.ecomm.dto.Purchase;
import com.luv2code.ecomm.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckOutService {

    public PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfoDTO paymentInfoDTO) throws StripeException;

}
