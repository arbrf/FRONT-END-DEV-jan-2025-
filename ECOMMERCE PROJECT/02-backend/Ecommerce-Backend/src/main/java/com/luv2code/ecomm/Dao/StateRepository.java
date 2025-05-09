package com.luv2code.ecomm.Dao;

import com.luv2code.ecomm.Entity.State;
import com.luv2code.ecomm.projection.StateProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "states", path = "states",excerptProjection = StateProjection.class)

public interface StateRepository extends JpaRepository<State, Integer> {


    List<State> findByCountryCode(@Param("code") String code);
}
