package com.example.bookstore.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com.example.bookstore.backend",    // Backend module
        "com.example.bookstore.service",    // Service module
        "com.example.bookstore.domain"      // Domain module
})
@EntityScan(basePackages = "com.example.bookstore.domain.model") // Explicitly scan JPA entities
@EnableJpaRepositories(basePackages = "com.example.bookstore.domain.repository") // Scan repositories
public class BookstoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookstoreApplication.class, args);
    }
}
