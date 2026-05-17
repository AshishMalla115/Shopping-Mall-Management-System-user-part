package com.shoppingmall.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.annotation.PostConstruct;

@Configuration
public class ApplicationConfig {

    @Autowired
    private Environment environment;

    @PostConstruct
    public void initializeApplication() {
        System.out.println("User Management Application Started Successfully!");
        System.out.println("Database configuration loaded from application.properties");
    }
}
