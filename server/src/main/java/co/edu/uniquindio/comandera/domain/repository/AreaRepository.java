package co.edu.uniquindio.comandera.domain.repository;

import java.util.List;
import java.util.Optional;

import co.edu.uniquindio.comandera.domain.model.enums.Area;

public interface AreaRepository {
    /**
     * find a area using his id
     * 
     * @param id area's id
     *
     * @return area found
     */
    public Optional<Area> findById(Long id);
    
    /**
     * find areas using type
     * 
     * @param type type for search
     *
     * @return areas with the type
     */
    public List<Area> findByType(Area type);

    /**
     * check if the categories exists
     * 
     * @param ids categories ids
     * 
     * @return all the categories exists
     */
    public boolean exists(Long ...ids);
}
