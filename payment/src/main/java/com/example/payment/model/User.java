package com.example.payment.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // AUTO_INCREMENT
    private Long id;

    @Column(unique = true)  // no two users can have the same username
    private String username;

    private String password;   // stored as BCrypt hash — NEVER plain text
    private String role = "ROLE_USER";  // default role

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Long getId()               { return id; }
    public String getUsername()       { return username; }
    public void setUsername(String u) { this.username = u; }
    public String getPassword()       { return password; }
    public void setPassword(String p) { this.password = p; }
    public String getRole()           { return role; }
    public void setRole(String r)     { this.role = r; }
}
