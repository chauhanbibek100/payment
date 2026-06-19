package com.example.payment.repository;

import com.example.payment.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<ShoppingCart, Long> {

    // Spring generates: SELECT * FROM shopping_cart WHERE user_name = ?
    List<ShoppingCart> findByUserName(String userName);
}
