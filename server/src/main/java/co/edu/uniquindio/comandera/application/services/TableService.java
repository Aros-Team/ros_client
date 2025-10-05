package co.edu.uniquindio.comandera.application.services;

import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.model.Table;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.TableEntity;
import co.edu.uniquindio.comandera.infrastructure.spring.jpa.repository.TableRepository;
import co.edu.uniquindio.comandera.infrastructure.spring.mappers.TableJpaMapper;

@Service
public class TableService {
    @Autowired
    private TableRepository repository;

    public Table createTable() {

        int nextNum = getNextTableNumber();

        TableEntity toSave = new TableEntity(String.valueOf(nextNum), Boolean.TRUE);

        TableEntity saved = repository.save(toSave);

        return TableJpaMapper.toDomain(saved);
    }

    public List<Table> createTables(int count) {
        if (count <= 0) throw new IllegalArgumentException("count must be greater than 0");

        int start = getNextTableNumber();

        List<TableEntity> toSave = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            int num = start + i;
            toSave.add(new TableEntity(String.valueOf(num), Boolean.TRUE));
        }

        Iterable<TableEntity> savedIter = repository.saveAll(toSave);

        List<Table> result = new ArrayList<>();
        for (TableEntity e : savedIter) {
            result.add(TableJpaMapper.toDomain(e));
        }

        return result;
    }

    private int getNextTableNumber() {
        Iterable<TableEntity> all = repository.findAll();
        int max = 0;
        for (TableEntity e : all) {
            String name = e.getName();
            if (name == null) continue;
            try {
                int v = Integer.parseInt(name);
                if (v > max) max = v;
            } catch (NumberFormatException ex) {
                // ignore non-numeric table names
            }
        }
        return max + 1;
    }
}
