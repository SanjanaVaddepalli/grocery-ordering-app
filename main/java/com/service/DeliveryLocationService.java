package com.service;

import com.model.DeliveryLocation;
import com.repository.DeliveryLocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryLocationService {
    private final DeliveryLocationRepository repository;

    public DeliveryLocationService(DeliveryLocationRepository repository) {
        this.repository = repository;
    }

    public DeliveryLocation save(DeliveryLocation location) {
        return repository.save(location);
    }

    public List<DeliveryLocation> getAll() {
        return repository.findAll();
    }

    public DeliveryLocation getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public DeliveryLocation getByOrderId(Long orderId) {
        return repository.findAll()
                .stream()
                .filter(loc -> loc.getOrder() != null && loc.getOrder().getId().equals(orderId))
                .findFirst()
                .orElse(null);
    }
}
