package com.luv2code.ecomm.Dao;

import com.luv2code.ecomm.Entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productcategory",path = "product-category")
public interface ProductCategoryRepository  extends JpaRepository<ProductCategory,Long> {
}
