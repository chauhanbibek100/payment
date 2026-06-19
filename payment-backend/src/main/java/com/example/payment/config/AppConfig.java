package com.example.payment.config;

import com.example.payment.component.PaymentProcessor;
import com.example.payment.service.PaymentService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Map;

// @Configuration tells Spring: this class is a factory for beans
// Spring creates ONE instance of AppConfig internally — you never call new AppConfig()
@Configuration
public class AppConfig {

    @Bean
    public PaymentProcessor paymentProcessor(Map<String, PaymentService> services) {
        // Spring calls this method and stores the returned object as a managed bean
        return new PaymentProcessor(services);
    }
}
