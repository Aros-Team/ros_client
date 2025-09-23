package co.edu.uniquindio.comandera.application.services;

import co.edu.uniquindio.comandera.api.dto.WorkerRequestDTO;
import co.edu.uniquindio.comandera.api.dto.WorkerResponseDTO;
import co.edu.uniquindio.comandera.domain.model.Worker;
import co.edu.uniquindio.comandera.infrastructure.springdata.entity.AreaEntity;
import co.edu.uniquindio.comandera.infrastructure.springdata.entity.WorkerEntity;
import co.edu.uniquindio.comandera.repostories.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import co.edu.uniquindio.comandera.repostories.WorkerRepository;

import java.util.HashSet;
import java.util.Set;

// WorkerService.java
@Service
public class WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private AreaRepository areaRepository;

    public WorkerResponseDTO createWorker(WorkerRequestDTO workerDTO) {

        WorkerEntity worker = new WorkerEntity(
                workerDTO.getIdentification(),
                workerDTO.getName(),
                workerDTO.getPassword(),
                workerDTO.getPhone(),
                workerDTO.getImage(),
                workerDTO.getAddress(),
                workerDTO.getObservations(),
                workerDTO.getEnable() != null ? workerDTO.getEnable() : true
        );

        WorkerEntity savedWorker = workerRepository.save(worker);

        return convertToDTO(savedWorker);
    }

    private WorkerResponseDTO convertToDTO(WorkerEntity worker) {
        WorkerResponseDTO dto = new WorkerResponseDTO();
        dto.setIdentification(worker.getIdentification());
        dto.setIdentification(worker.getIdentification());
        dto.setName(worker.getName());
        dto.setPhone(worker.getPhone());
        dto.setImage(worker.getImage());
        dto.setAddress(worker.getAddress());
        dto.setObservations(worker.getObservations());
        dto.setEnable(worker.getEnable());

        return dto;
    }
}