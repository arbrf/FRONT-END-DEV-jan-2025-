package com.luv2code.ecomm.Entity;

import com.luv2code.ecomm.Entity.State;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.Data;

import java.util.Set;
import jakarta.persistence.OneToMany;

@Entity
@Table(name = "country")
@Data
public class Country {
   @Id
   private int id;

   private String code;
   private String name;

   @OneToMany(mappedBy = "country")
   private Set<State> states;
}
