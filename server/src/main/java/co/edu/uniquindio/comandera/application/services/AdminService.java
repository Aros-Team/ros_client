package co.edu.uniquindio.comandera.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.model.enums.Area;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.AreaEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.ProductEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.AdminRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.AreaRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class AdminService {
    @Autowired
    private AdminRepository repository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AreaRepository areaRepository;


    public void assignPreparationAreaToProduct(Long productId, Area area) {
        ProductEntity product = productRepository.findById(productId)
            .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + productId));

        AreaEntity areaEntity = areaRepository.findByType(area)
            .stream()
            .findFirst()
            .orElseGet(() -> {
                AreaEntity newArea = new AreaEntity("Area " + area.name(), area);
                return areaRepository.save(newArea);
            });

        product.setPreparationArea(areaEntity);
        
        productRepository.save(product);
    }
}
