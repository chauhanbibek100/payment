//package com.example.payment.model;
//
//import jakarta.persistence.*;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Table(name = "shopping_cart")
//public class ShoppingCart {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "user_name")
//    private String userName;
//
//    @Column(name = "created_at")
//    private LocalDateTime createdAt = LocalDateTime.now();
//
//    // One cart has MANY items
//    // cascade = save/delete items when cart is saved/deleted
//    // fetch EAGER = load items immediately when cart is loaded
//    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    private List<CartItem> items = new ArrayList<>();
//
//    public ShoppingCart() {}
//    public ShoppingCart(String userName) { this.userName = userName; }
//
//    // Business method: link item to this cart then add to list
//    public void addItem(CartItem item) {
//        item.setCart(this);  // item needs to know which cart it belongs to
//        items.add(item);
//    }
//
//    // Calculates cart total
//    public double getTotal() {
//        return items.stream()
//                .mapToDouble(i -> i.getPrice() * i.getQuantity())
//                .sum();
//    }
//
//    public Long getId()               { return id; }
//    public String getUserName()       { return userName; }
//    public void setUserName(String u) { this.userName = u; }
//    public List<CartItem> getItems()  { return items; }
//    public LocalDateTime getCreatedAt() { return createdAt; }
//}
//




// sir send new wala


package com.example.payment.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "shopping_cart")
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // One cart has MANY items
    // cascade = save/delete items when cart is saved/deleted
    // fetch EAGER = load items immediately when cart is loaded
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> items = new ArrayList<>();

    public ShoppingCart() {}
    public ShoppingCart(String userName) { this.userName = userName; }

    // Business method: link item to this cart then add to list
    public void addItem(CartItem item) {
        item.setCart(this);  // item needs to know which cart it belongs to
        items.add(item);
    }

    // Calculates cart total
    public double getTotal() {
        return items.stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();
    }

    public Long getId()               { return id; }
    public String getUserName()       { return userName; }
    public void setUserName(String u) { this.userName = u; }
    public List<CartItem> getItems()  { return items; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}