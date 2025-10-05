package co.edu.uniquindio.comandera.domain.repository;

import co.edu.uniquindio.comandera.domain.model.Product;

import java.util.Optional;


public interface ProductRepository
{
    public void create(Product product);

    Optional<Product> findById(Long productId);
}
