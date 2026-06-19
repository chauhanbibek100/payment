package com.example.payment.repository;


import com.example.payment.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // All CRUD methods are inherited from JpaRepository
    // Items save automatically when their parent cart is saved (CascadeType.ALL)
}
