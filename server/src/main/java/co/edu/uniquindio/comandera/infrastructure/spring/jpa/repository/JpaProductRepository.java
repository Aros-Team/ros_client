package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.domain.model.enums.Area;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.AreaEntity;

@Repository
public interface AreaRepository extends CrudRepository<AreaEntity, Long> {
    
    List<AreaEntity> findByType(Area type);
    
}