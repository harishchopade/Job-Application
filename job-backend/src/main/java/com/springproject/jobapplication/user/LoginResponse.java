package com.springproject.jobapplication.user;

import java.util.List;

public class LoginResponse {
 
    private String jwtToken;
    private String username;
    private List<String> roles;

    // For JWT
    public LoginResponse(String jwtToken, String username, List<String> roles) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.roles = roles;
    }

    // Without JWT for this create password and add getters and setters for that
    // public LoginResponse(String username, String password, List<String> roles) {
    //     this.username = username;
    //     this.password = password;
    //     this.roles = roles;
    // }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
    
}
