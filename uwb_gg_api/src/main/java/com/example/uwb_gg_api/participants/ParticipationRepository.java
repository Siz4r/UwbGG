package com.example.uwb_gg_api.participants;

import com.example.uwb_gg_api.participants.models.Participation;
import com.example.uwb_gg_api.participants.models.ParticipationKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipationRepository extends JpaRepository<Participation, ParticipationKey> {
}
