package com.luv2code.ecomm.Entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "state")
@Data
public class State {


    public State(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    @JsonBackReference
    private Country country;
}
