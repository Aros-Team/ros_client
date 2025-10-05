package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import co.edu.uniquindio.comandera.domain.model.Table;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.TableEntity;

/**
 * Mapper between domain Table and JPA TableEntity.
 * Keep mappings simple and explicit to match other mappers in the project.
 */
public class TableJpaMapper {

    public static Table toDomain(TableEntity entity) {
        if (entity == null) return null;

        Table model = new Table(
            entity.getId() == null ? null : entity.getId().intValue(),
            entity.getName(),
            entity.getEnable()
        );

        return model;
    }

    public static TableEntity toEntity(Table table) {
        if (table == null) return null;

        TableEntity entity = new TableEntity();
        if (table.id() != null) entity.setId(table.id().longValue());
        entity.setName(table.numTable());
        entity.setEnable(table.isTaken());

        return entity;
    }
}
