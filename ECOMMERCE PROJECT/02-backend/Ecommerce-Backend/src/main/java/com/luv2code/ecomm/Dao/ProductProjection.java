package com.luv2code.ecomm.Dao;

import org.springframework.data.rest.core.config.Projection;
import com.luv2code.ecomm.Entity.Product;
import java.math.BigDecimal;

@Projection(name = "productDetail", types = { Product.class })
public interface ProductProjection {
    Long getId();
    String getSku();
    String getName();
    String getDescription();
    BigDecimal getUnitPrice();
    String getImageUrl();
    boolean isActive();
    int getUnitsInStock();
}
