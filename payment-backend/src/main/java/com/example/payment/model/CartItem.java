//package com.example.payment.model;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "cart_item")
//public class CartItem {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "item_name")
//    private String itemName;
//
//    @Column(name = "price")
//    private double price;
//
//    @Column(name = "quantity")
//    private int quantity;
//
//    // Many items belong to ONE cart — cart_id is the FK column
//    @ManyToOne
//    @JoinColumn(name = "cart_id")
//    private ShoppingCart cart;
//
//    public CartItem() {}
//
//    public CartItem(String itemName, double price, int quantity) {
//        this.itemName = itemName;
//        this.price    = price;
//        this.quantity = quantity;
//    }
//
//    public Long getId()                { return id; }
//    public String getItemName()        { return itemName; }
//    public double getPrice()           { return price; }
//    public int getQuantity()           { return quantity; }
//    public ShoppingCart getCart()      { return cart; }
//    public void setCart(ShoppingCart c){ this.cart = c; }
//
//    @Override
//    public String toString() {
//        return itemName + " x" + quantity + " @ $" + price;
//    }
//}




// sir send new wala

package com.example.payment.model;

import jakarta.persistence.*;

//Added
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cart_item")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "price")
    private double price;

    @Column(name = "quantity")
    private int quantity;

    // Many items belong to ONE cart — cart_id is the FK column
    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private ShoppingCart cart;

    public CartItem() {}

    public CartItem(String itemName, double price, int quantity) {
        this.itemName = itemName;
        this.price    = price;
        this.quantity = quantity;
    }

    public Long getId()                { return id; }
    public String getItemName()        { return itemName; }
    public double getPrice()           { return price; }
    public int getQuantity()           { return quantity; }
    public ShoppingCart getCart()      { return cart; }
    public void setCart(ShoppingCart c){ this.cart = c; }

    @Override
    public String toString() {
        return itemName + " x" + quantity + " @ $" + price;
    }
}