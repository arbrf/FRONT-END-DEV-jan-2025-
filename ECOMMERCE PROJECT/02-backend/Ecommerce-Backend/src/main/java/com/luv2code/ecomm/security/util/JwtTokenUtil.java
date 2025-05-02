package com.luv2code.ecomm.security.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenUtil {

    private String secretKey = "secret";  // Use a stronger secret key in production
    private long expirationTime = 86400000;  // 1 day

    // Method to generate the JWT token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Method to extract username from the JWT
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Method to extract claims (like expiration time, subject, etc.)
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    // Method to check if the token is expired
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Method to extract expiration date from the token
    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    // New method to validate the token
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails.getUsername());
    }
}
