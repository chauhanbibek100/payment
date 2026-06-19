package com.example.payment.component;

import com.example.payment.model.PaymentRequest;
import com.example.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class PaymentProcessor {

    // Spring injects: { 'PAYPAL' -> PayPalPaymentService,
    //                   'STRIPE' -> StripePaymentService,
    //                   'SQUARE' -> SquarePaymentService }
    private final Map<String, PaymentService> paymentServices;

    @Autowired
    public PaymentProcessor(Map<String, PaymentService> paymentServices) {
        this.paymentServices = paymentServices;
    }

    public void processPayment(String gateway, PaymentRequest request) {
        PaymentService service = paymentServices.get(gateway);
        if (service == null) {
            throw new IllegalArgumentException("Unknown gateway: " + gateway);
        }
        service.process(request);
    }
}
