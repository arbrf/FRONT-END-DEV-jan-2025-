package com.luv2code.ecomm.Dao;

import com.luv2code.ecomm.Entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin("http://localhost:4200/")
@RepositoryRestResource(excerptProjection = ProductProjection.class)
@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);

    Optional<Product> findById(@Param("id") Long id);


}
