package com.service;

import com.model.User;
import com.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new user
    public User register(User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already registered!");
        }
        return userRepository.save(user);
    }

    // Login a user
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "User not found";
        }
        if (!user.getPassword().equals(password)) {
            return "Invalid password";
        }
        return "Login successful";
    }
}
