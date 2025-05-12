package com.luv2code.ecomm.Entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;

@Entity
@Table(name = "country")
@Data
public class Country {

 public  Country(){

 }

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private int id;

 private String code;
 private String name;

 @OneToMany(mappedBy = "country", cascade = CascadeType.ALL, orphanRemoval = true)
 @JsonManagedReference
 private List<State> states = new CopyOnWriteArrayList<>();

 // Optional: helper method to add a state
 public void addState(State state) {
  states.add(state);
  state.setCountry(this);
 }
}
