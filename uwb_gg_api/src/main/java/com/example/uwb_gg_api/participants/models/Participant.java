package com.example.uwb_gg_api.participants.models;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class Participant {
    private UUID id;
    private String firstName;
    private String lastName;
    private String nick;
    private ParticipationType role;
}