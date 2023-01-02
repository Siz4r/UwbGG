package com.example.uwbggbackend.convs.models;

import com.example.uwbggbackend.participants.models.Participant;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor @NoArgsConstructor
public class ConvListDTO {
    private String name;
    private List<Participant> participants;
}
