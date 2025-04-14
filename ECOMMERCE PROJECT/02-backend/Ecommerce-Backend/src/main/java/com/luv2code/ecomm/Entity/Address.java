package com.luv2code.ecomm.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="address")
public class Address {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(name = "street")
    private String street;
    @Column(name ="city")
    private String city;
    @Column(name = "country")
    private String country;
    @Column(name="zip_code")
    private String zipcode;
}
