package com.example.payment.controller;

import com.example.payment.component.PaymentProcessor;
import com.example.payment.model.PaymentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentProcessor paymentProcessor;

    public PaymentController(PaymentProcessor pp) { this.paymentProcessor = pp; }

    // POST /api/payment
    // body: { "gateway": "PAYPAL", "amount": 150.0, "description": "Order" }
    @PostMapping
    public ResponseEntity<String> pay(@RequestBody Map<String,Object> body) {
        String gateway = (String) body.get("gateway");
        double amount  = ((Number) body.get("amount")).doubleValue();
        String desc    = (String) body.get("description");
        paymentProcessor.processPayment(gateway,
                new PaymentRequest(amount, "USD", desc));
        return ResponseEntity.ok("Payment processed via " + gateway);
    }
}
