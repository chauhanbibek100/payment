package com.example.payment.service;

import com.example.payment.model.PaymentRequest;
import org.springframework.stereotype.Service;

@Service("SQUARE")   // bean name = map key
public class SquarePaymentService implements PaymentService {
    @Override
    public void process(PaymentRequest request) {
        System.out.println("Processing via Square: $" + request.getAmount());
    }
}
