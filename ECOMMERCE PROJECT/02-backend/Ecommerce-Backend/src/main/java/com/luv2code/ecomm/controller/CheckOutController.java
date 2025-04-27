package com.luv2code.ecomm.controller;

import com.luv2code.ecomm.dto.Purchase;
import com.luv2code.ecomm.dto.PurchaseResponse;
import com.luv2code.ecomm.service.CheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api/checkout")
public class CheckOutController {
    @Autowired
    private CheckOutService checkOutService;

    @PostMapping(value = "/purchase",
            consumes = "application/json",
            produces = "application/json")
    public ResponseEntity<PurchaseResponse> placeOrder(@RequestBody Purchase purchase) {
        System.out.println(purchase);
        PurchaseResponse response = checkOutService.placeOrder(purchase);
        return ResponseEntity.ok(response);
    }



}
