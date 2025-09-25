package com.controller;

import com.model.User;
import com.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;	

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.getByEmail(user.getEmail()) != null) {
            return ResponseEntity
                    .badRequest()
                    .body("Email already exists. Try another one.");
        }
        User savedUser = userService.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        User existingUser = userService.getByEmail(loginData.getEmail());

        if (existingUser == null || 
            !existingUser.getPassword().equals(loginData.getPassword())) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok(existingUser);
    }
}
