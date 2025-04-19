package com.luv2code.ecomm.Dao;

import com.luv2code.ecomm.Entity.Customer;
import com.luv2code.ecomm.projection.CountryProjection;
import com.luv2code.ecomm.projection.CustomerProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "customer", path = "customer",excerptProjection = CustomerProjection.class)
@CrossOrigin("http://localhost:4200/")
@Repository
public interface CustomerRespository extends JpaRepository<Customer,Long> {
}
