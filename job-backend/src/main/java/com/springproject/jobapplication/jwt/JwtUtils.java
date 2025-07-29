package com.springproject.jobapplication.jwt;

import java.security.Key;
import io.jsonwebtoken.security.Keys;

import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    // @Value("${spring.app.jwtSecret}")           // Add it in application.propertiess
    private final String jwtSecret = "hashakdshfhsabdflisabdfihbfhshfbsdhfbsklsdfbhashisadfhiashdhfiashdfihhash";

    // @Value("${spring.app.jwtExpirationMs}")     // Add it in application.propertiess
    private final int jwtExpirationMs = 86400000;

    public String getJwtFromHeader(HttpServletRequest httpServletRequest){
        String bearerToken = httpServletRequest.getHeader("Authorization");
        logger.debug("Authorization Token: {}"+bearerToken);

        if(bearerToken != null && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);    // This removes Bearer prefix with space
        }

        return null;
    }

    public String generateTokenFromUsername(UserDetails userDetails){

        String username = userDetails.getUsername();

        return Jwts.builder()
                    .subject(username)
                    .issuedAt(new Date())
                    .expiration(new Date(
                        (new Date()).getTime() + jwtExpirationMs)
                    )
                    .signWith(key())
                    .compact();
        
        // return "problem in generateTokenFromUsername from JwtUtils";
    }

    public String getUsernameFromJwtToken(String token){
        return Jwts.parser()
                    .verifyWith((SecretKey) key())
                    .build().parseSignedClaims(token)
                    .getPayload()
                    .getSubject();

        // return "problem in getUsernameFromJwtToken from JwtUtils";
    }

    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public boolean validateJwtToken(String authToken){

        try {
            System.out.println("Validate");
            Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(authToken);
            
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT Token : "+e.getMessage());
        }
        catch(ExpiredJwtException e){
            logger.error("JWT Token Expired : "+e.getMessage());
        }
        catch(UnsupportedJwtException e){
            logger.error("JWT token not supported : "+e.getMessage());
        }
        catch(IllegalArgumentException e){
            logger.error("JWT token is empty : "+e.getMessage());
        }
        return false;
    }




}
