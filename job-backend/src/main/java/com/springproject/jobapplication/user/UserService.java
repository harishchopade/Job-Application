package com.springproject.jobapplication.user;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springproject.jobapplication.jwt.JwtUtils;

@Service
public class UserService {
 
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;


    public Users register(Users user){
        System.out.println("Before encoding: " + user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("After encoding: " + user.getPassword());
        return userRepo.save(user);
    }

    public List<Users> getUsers(){
        return userRepo.findAll();
    }

    public LoginResponse signin(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                                                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                                                                .map(item -> item.getAuthority())
                                                                .collect(Collectors.toList());

        return new LoginResponse(jwtToken, userDetails.getUsername(), roles);        
    }

    public Users findByUsername(String username){
        return userRepo.findByUsername(username);
    }


}
