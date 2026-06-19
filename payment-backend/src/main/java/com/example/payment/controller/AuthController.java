package com.example.payment.controller;

import com.example.payment.model.AuthRequest;
import com.example.payment.model.AuthResponse;
import com.example.payment.model.User;
import com.example.payment.repository.UserRepository;
import com.example.payment.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserRepository        userRepository;
    private final PasswordEncoder       passwordEncoder;
    private final JwtUtil               jwtUtil;

    public AuthController(AuthenticationManager am, UserRepository ur,
                          PasswordEncoder pe, JwtUtil ju) {
        this.authManager = am; this.userRepository = ur;
        this.passwordEncoder = pe; this.jwtUtil = ju;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthRequest req) {
        if (userRepository.findByUsername(req.getUsername()) != null)
            return ResponseEntity.badRequest().body("Username already taken");
        User user = new User(req.getUsername(),
                passwordEncoder.encode(req.getPassword())); // BCrypt
        userRepository.save(user);
        return ResponseEntity.ok("Registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest req) {
        // Spring validates password with BCrypt internally — throws if wrong
        authManager.authenticate(new UsernamePasswordAuthenticationToken(
                req.getUsername(), req.getPassword()));  // raw password
        String token = jwtUtil.generateToken(req.getUsername());
        return ResponseEntity.ok(new AuthResponse(token, req.getUsername()));
    }
}
