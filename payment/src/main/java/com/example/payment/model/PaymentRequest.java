package com.example.payment.model;

public class PaymentRequest {
    private double amount;
    private String currency;
    private String description;

    // Constructor — takes all fields at once
    public PaymentRequest(double amount, String currency, String description) {
        this.amount      = amount;
        this.currency    = currency;
        this.description = description;
    }

    // Getters — Spring / Jackson uses these to read the values
    public double getAmount()       { return amount; }
    public String getCurrency()     { return currency; }
    public String getDescription()  { return description; }
}
