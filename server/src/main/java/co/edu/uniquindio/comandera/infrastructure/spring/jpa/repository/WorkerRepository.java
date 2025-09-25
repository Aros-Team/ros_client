package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.WorkerEntity;

@Repository
public interface WorkerRepository extends CrudRepository<WorkerEntity, String> {
    // 
}
