package com.luv2code.ecomm.security.service;

import com.luv2code.ecomm.security.util.JwtTokenUtil;
import com.luv2code.ecomm.security.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public String authenticate(String email, String password) {
        // Authenticate using the email and password
        UserDetails userDetails = myUserDetailsService.loadUserByUsername(email);

        // Use the passwordEncoder to compare the raw password with the stored password
        System.out.println(userDetails.getPassword()+"------"+passwordEncoder.encode(userDetails.getPassword()));
        if (passwordEncoder.matches(password, userDetails.getPassword())) {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());

            authenticationManager.authenticate(authenticationToken);

            // Generate JWT token after successful authentication
            return jwtTokenUtil.generateToken(userDetails);
        } else {
            throw new BadCredentialsException("Invalid credentials");
        }
    }
}
