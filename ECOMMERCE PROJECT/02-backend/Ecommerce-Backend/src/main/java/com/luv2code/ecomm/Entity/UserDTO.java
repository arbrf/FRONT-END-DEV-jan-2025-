package com.luv2code.ecomm.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_table")
public class UserDTO {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    public String email;
    public String password;

    public UserDTO(){

    }

    public UserDTO(long id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
