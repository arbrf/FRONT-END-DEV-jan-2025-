package com.luv2code.ecomm.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity

@Table(name="address")
public class Address {

    public  Address(){

    }

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

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;

    public Address(Long id, String street, String city, String country, String zipcode, Order order) {
        this.id = id;
        this.street = street;
        this.city = city;
        this.country = country;
        this.zipcode = zipcode;
        this.order = order;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
