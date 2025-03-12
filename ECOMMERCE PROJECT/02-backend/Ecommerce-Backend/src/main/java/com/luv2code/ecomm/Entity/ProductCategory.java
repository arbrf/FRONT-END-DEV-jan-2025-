package com.luv2code.ecomm.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Set;

@Entity
@Table(name="product_category")
@Getter
@Setter
public class ProductCategory {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name="id")
     @RestResource(exported = true)
     private Long id;

     @Column(name="category_name")
     @RestResource(exported = true)
     private String categoryName;


    /*@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Product> products;

*/
    public Long getId() {
        return id;
    }

    public String getCategoryName() {
        return categoryName;
    }


}
