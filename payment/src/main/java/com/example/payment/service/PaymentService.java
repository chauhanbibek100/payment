package com.example.payment.service;

import com.example.payment.model.PaymentRequest;

public interface PaymentService {
    void process(PaymentRequest request);
}
