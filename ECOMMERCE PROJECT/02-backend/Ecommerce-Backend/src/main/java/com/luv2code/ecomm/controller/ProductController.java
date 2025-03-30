package com.luv2code.ecomm.controller;

import com.luv2code.ecomm.Dao.ProductRepository;
import com.luv2code.ecomm.Entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private  ProductRepository productRepository;



    // Endpoint to retrieve a product by its ID
    @GetMapping("/search/findById/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id){
        ResponseEntity<Product> productResponseEntity = productRepository.findById(id)
                .map(product -> new ResponseEntity<>(product, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        System.out.println(productResponseEntity);
        return productResponseEntity;
    }
}
