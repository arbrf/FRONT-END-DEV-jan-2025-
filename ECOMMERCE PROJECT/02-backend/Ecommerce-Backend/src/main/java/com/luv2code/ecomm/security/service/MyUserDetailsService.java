package com.luv2code.ecomm.security.service;

import com.luv2code.ecomm.Dao.CustomerRespository;
import com.luv2code.ecomm.Dao.UserTableRepository;
import com.luv2code.ecomm.Entity.Customer;
import com.luv2code.ecomm.Entity.UserDTO;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserTableRepository userTableRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDTO user = userTableRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("Email not found: " + email);
        }

        // Encrypt password before returning User
        String givePassword = user.getPassword();

        System.out.println("Given Passworod"+ givePassword);

        return new User(user.getEmail(), givePassword,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
