package co.edu.uniquindio.comandera.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.OrderProductRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.OrderRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.ProductRepository;

@Service
public class OrderProductService {
    @Autowired
    private OrderRepository orders;
    
    @Autowired
    private ProductRepository products;

    @Autowired
    private OrderProductRepository repository;
}
