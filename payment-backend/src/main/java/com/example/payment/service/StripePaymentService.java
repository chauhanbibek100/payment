package com.example.payment.service;


import com.example.payment.model.PaymentRequest;
import org.springframework.stereotype.Service;

@Service("STRIPE")   // bean name = map key
public class StripePaymentService implements PaymentService {
    @Override
    public void process(PaymentRequest request) {
        System.out.println("Processing via Stripe: $" + request.getAmount());
    }
}
