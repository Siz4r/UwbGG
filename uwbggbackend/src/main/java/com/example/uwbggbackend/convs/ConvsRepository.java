package com.example.uwbggbackend.convs;

import com.example.uwbggbackend.convs.models.Conv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConvsRepository extends JpaRepository<Conv, UUID> {
}
