package com.luv2code.ecomm.service;

import com.luv2code.ecomm.dto.Purchase;
import com.luv2code.ecomm.dto.PurchaseResponse;

public interface CheckOutService {
    public PurchaseResponse placeOrder(Purchase purchase);

}
