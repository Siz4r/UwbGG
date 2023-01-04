package com.example.uwbggbackend.invitations.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class InvitationListDTO {
    private String senderNick;
    private String senderFirstName;
    private String senderLastName;
    private LocalDate sendDate;
}
