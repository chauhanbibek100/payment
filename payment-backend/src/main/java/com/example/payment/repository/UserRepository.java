package com.example.payment.repository;

import com.example.payment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository<Entity, PrimaryKeyType>
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring generates: SELECT * FROM users WHERE username = ?
    User findByUsername(String username);
}
