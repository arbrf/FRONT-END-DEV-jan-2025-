package com.luv2code.ecomm.Dao;


import com.luv2code.ecomm.Entity.Country;
import com.luv2code.ecomm.Entity.Customer;
import com.luv2code.ecomm.projection.CountryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "countries", path = "countries",excerptProjection = CountryProjection.class)
public interface CountryRepository extends JpaRepository<Country, Integer> {

}