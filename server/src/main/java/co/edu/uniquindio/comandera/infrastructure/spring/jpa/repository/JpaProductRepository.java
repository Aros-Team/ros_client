package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.AreaEntity;

@Repository
public interface JpaProductRepository extends CrudRepository<AreaEntity, Long> {

    List<AreaEntity> findByType(String type);

}