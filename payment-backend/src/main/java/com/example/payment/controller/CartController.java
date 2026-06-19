package com.example.payment.controller;

import com.example.payment.model.ShoppingCart;
import com.example.payment.service.ShoppingCartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final ShoppingCartService cartService;

    public CartController(ShoppingCartService cs) { this.cartService = cs; }

    // GET /api/cart/{userName} — returns all carts for this user
    @GetMapping("/{userName}")
    public ResponseEntity<List<ShoppingCart>> getCart(@PathVariable String userName) {
        return ResponseEntity.ok(cartService.getCartsByUser(userName));
    }

    // POST /api/cart/create  body: { "userName": "Alice" }
    @PostMapping("/create")
    public ResponseEntity<ShoppingCart> createCart(@RequestBody Map<String,String> body) {
        return ResponseEntity.ok(cartService.createCart(body.get("userName")));
    }

    // POST /api/cart/{cartId}/item
    // body: { "itemName": "Laptop", "price": 999.99, "quantity": 1 }
    @PostMapping("/{cartId}/item")
    public ResponseEntity<ShoppingCart> addItem(
            @PathVariable Long cartId, @RequestBody Map<String,Object> body) {
        ShoppingCart cart = cartService.findById(cartId);
        return ResponseEntity.ok(cartService.addItem(cart,
                (String)  body.get("itemName"),
                ((Number) body.get("price")).doubleValue(),
                ((Number) body.get("quantity")).intValue()));
    }
}
