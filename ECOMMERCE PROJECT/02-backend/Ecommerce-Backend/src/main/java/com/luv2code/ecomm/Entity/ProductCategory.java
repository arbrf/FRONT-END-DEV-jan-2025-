package com.luv2code.ecomm.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import java.util.Set;

@Entity
@Table(name="product_category")
@Getter
@Setter
public class ProductCategory {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name="id")
    private Long id;
     @Column(name="category_name")
     private String categoryName;


    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Product> products;

}
