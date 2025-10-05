package co.edu.uniquindio.comandera.infrastructure.spring.mappers;

import co.edu.uniquindio.comandera.domain.model.Table;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.TableEntity;

/**
 * Mapper between domain Table and JPA TableEntity.
 * Keep mappings simple and explicit to match other mappers in the project.
 */
public class TableJpaMapper {

    public static Table toDomain(TableEntity entity) {
        if (entity == null) return null;

        return new Table(
            entity.getId() == null ? null : entity.getId().toString(),
            entity.getName(),
            entity.getEnable()
        );
    }

    public static TableEntity toEntity(Table table) {
        if (table == null) return null;

        TableEntity entity = new TableEntity();
        if (table.id() != null) entity.setId(Long.getLong(table.id()));
        entity.setName(table.numTable());
        entity.setEnable(table.isTaken());

        return entity;
    }
}
