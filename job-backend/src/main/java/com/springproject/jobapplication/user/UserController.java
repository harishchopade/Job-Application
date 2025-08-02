package com.springproject.jobapplication.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
 
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<Users> getUsers(){
        return userService.getUsers();
    }

    @PostMapping("/register")
    public Users register(@RequestBody Users user){
        return userService.register(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest){

        try {

            LoginResponse response = userService.signin(loginRequest);
            return ResponseEntity.ok(response);

        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("Message", "Bad Credentials");
            map.put("Status", "False");

            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserProfile(){       // <?> because we dont know what is the type of response it can be string if error otherwise Users so that`s the reason

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();

        Users user = userService.findByUsername(currentUserName);

        if(user == null)
            return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);

        user.setPassword(null);

        return ResponseEntity.ok(user);
    }

}
