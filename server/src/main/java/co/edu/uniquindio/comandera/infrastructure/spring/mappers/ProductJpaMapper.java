package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import co.edu.uniquindio.comandera.domain.model.Product;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.ProductEntity;
import java.util.HashSet;


public class ProductJpaMapper {

    public static Product toDomain(ProductEntity entity) {
        if (entity == null) return null;

        return new Product(
            entity.getId() == null ? null : entity.getId().intValue(),
            entity.getName(),
            entity.getDescription(),
            entity.getEstimateTime(),
            entity.getPreparationArea() != null ? entity.getPreparationArea().getType() : null,
            false,
            entity.getStatus(),
            entity.getPrepararationDate(),
            entity.getImage(),
            new HashSet<>()
        );
    }

    public static ProductEntity toEntity(Product product) {
        if (product == null) return null;

        ProductEntity entity = new ProductEntity();
        if (product.id() != null) entity.setId(product.id().longValue());
        entity.setName(product.name());
        entity.setDescription(product.description());
        entity.setEstimateTime(product.estimatedTime());
        entity.setStatus(product.status());
        entity.setPrepararationDate(product.prepararationDate());
        entity.setImage(product.image());
        
        return entity;
    }
}