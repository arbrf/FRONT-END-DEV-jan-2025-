package com.luv2code.ecomm.Dao;

import com.luv2code.ecomm.Entity.Order;
import com.luv2code.ecomm.projection.CountryProjection;
import com.luv2code.ecomm.projection.OrderProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "order", path = "order",excerptProjection = OrderProjection.class)
public interface OrderRepository extends JpaRepository<Order, Long> {


    Page<Order> findByCustomerEmailOrderByDateCreatedDesc(@Param("email") String email, Pageable pageable);


}
