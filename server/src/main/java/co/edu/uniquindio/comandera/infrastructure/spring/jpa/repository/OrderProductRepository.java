package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.OrderProductEntity;

@Repository
public interface OrderProductRepository extends CrudRepository<OrderProductEntity, Long> {
    // 
}
