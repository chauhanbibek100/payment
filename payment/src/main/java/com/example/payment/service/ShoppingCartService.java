package com.example.payment.service;


import com.example.payment.model.CartItem;
import com.example.payment.model.ShoppingCart;
import com.example.payment.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ShoppingCartService {

    private final CartRepository cartRepository;

    @Autowired
    public ShoppingCartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // Creates a new empty cart and saves to MySQL
    public ShoppingCart createCart(String userName) {
        ShoppingCart cart = new ShoppingCart(userName);
        return cartRepository.save(cart);  // INSERT INTO shopping_cart
    }

    // Adds a new item to an existing cart
    public ShoppingCart addItem(ShoppingCart cart, String name, double price, int qty) {
        CartItem item = new CartItem(name, price, qty);
        cart.addItem(item);                 // links item to cart
        return cartRepository.save(cart);  // INSERT INTO cart_item (via cascade)
    }

    // Returns all carts for one user from MySQL
    public List<ShoppingCart> getCartsByUser(String userName) {
        return cartRepository.findByUserName(userName);
    }

    // Returns one cart by its ID
    public ShoppingCart findById(Long id) {
        return cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found: " + id));
    }

    public List<ShoppingCart> getAllCarts() {
        return cartRepository.findAll();
    }
}
