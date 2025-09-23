package co.edu.uniquindio.comandera.api.controller;

import co.edu.uniquindio.comandera.api.dto.WorkerRequestDTO;
import co.edu.uniquindio.comandera.api.dto.WorkerResponseDTO;
import co.edu.uniquindio.comandera.application.services.WorkerService;
import co.edu.uniquindio.comandera.domain.model.Worker;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/worker")
public class workerController {

    @Autowired
    private WorkerService workerService;

    @PostMapping
    public ResponseEntity<?> createWorker(@Valid @RequestBody WorkerRequestDTO workerDTO) {
        try {
            WorkerResponseDTO createdWorker = workerService.createWorker(workerDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdWorker);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
