package com.repository;

import com.model.DeliveryLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryLocationRepository extends JpaRepository<DeliveryLocation, Long> {
}
