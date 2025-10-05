package co.edu.uniquindio.comandera.application.usecases.product;

import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.model.Product;
import co.edu.uniquindio.comandera.domain.repository.AdminRepository;
import co.edu.uniquindio.comandera.domain.repository.AreaRepository;

import co.edu.uniquindio.comandera.domain.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;

public class AssignPreparationAreaToProductUseCase {
    private AdminRepository repository;
    private ProductRepository productRepository;
    private AreaRepository areaRepository;


    public void assignPreparationAreaToProduct(Long productId, Area area) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + productId));

        area = areaRepository.findByType(area.getType())
            .stream()
            .findFirst()
            .orElseGet(() -> {
                System.out.println("no encontrato e; coso");
                return null;
            });

        product.setPreparationArea(area);

        productRepository.create(product);
    }
}
