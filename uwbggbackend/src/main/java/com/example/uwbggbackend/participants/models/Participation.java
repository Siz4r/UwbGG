package com.example.uwbggbackend.participants.models;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor @AllArgsConstructor
public class Participation {
    @EmbeddedId
    private ParticipationKey id;
    @Column(nullable = false)
    private ParticipationType participationType;
}
