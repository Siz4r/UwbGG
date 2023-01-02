package com.example.uwbggbackend.participants;

import com.example.uwbggbackend.participants.models.Participation;
import com.example.uwbggbackend.participants.models.ParticipationKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ParticipationRepository extends JpaRepository<Participation, ParticipationKey> {
}
