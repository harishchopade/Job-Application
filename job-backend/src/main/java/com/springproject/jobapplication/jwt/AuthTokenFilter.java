package com.springproject.jobapplication.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthTokenFilter extends OncePerRequestFilter{

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    UserDetailsService userDetailsService;

    private final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        logger.debug("AuthTokenFilter called from URI : {}",request.getRequestURI());

        try {
            String jwt = parseJwt(request);

            if(jwt!=null && jwtUtils.validateJwtToken(jwt)){
                String username =jwtUtils.getUsernameFromJwtToken(jwt);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                                                        userDetails, 
                                                                        null, 
                                                                        userDetails.getAuthorities());
                
                logger.debug("Roles from JWT : "+userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                
            }
        } catch (Exception e) {
            logger.error("Cannot set user Authentication" + e);
        }
       
        // We are creating a custom filter, so we must let Spring Security continue processing the remaining filters in the chain.
        // This line passes the request and response to the next filter in the security filter chain.
        
        filterChain.doFilter(request, response);        
    }

    private String parseJwt(HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromHeader(request);
        logger.debug("jwt token from AuthTokenFilter : {}"+jwt);
        return jwt;
    }
    
}
