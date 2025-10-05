package co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.AdminEntity;

@Repository
public interface AdminRepository extends CrudRepository<AdminEntity, Long> {
    // 
}