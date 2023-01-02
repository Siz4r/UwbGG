package com.example.uwbggbackend.participants.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Participant {
    private String firstName;
    private String lastName;
    private String nick;
    private ParticipationType role;
}
