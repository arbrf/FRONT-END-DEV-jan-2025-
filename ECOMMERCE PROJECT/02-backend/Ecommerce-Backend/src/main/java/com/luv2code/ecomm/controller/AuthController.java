package com.luv2code.ecomm.controller;

import com.luv2code.ecomm.dto.AuthRequest;
import com.luv2code.ecomm.dto.AuthResponse;
import com.luv2code.ecomm.security.service.AuthenticationService;
import com.luv2code.ecomm.security.util.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/authenticate")
    public AuthResponse createAuthToken(@RequestBody AuthRequest authRequest) {
        String token = authenticationService.authenticate(authRequest.getUsername(), authRequest.getPassword());
        return new AuthResponse(token);
    }
}



