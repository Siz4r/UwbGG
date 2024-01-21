package com.example.uwb_gg_api.invitations.models;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class InvitationListDTO {
    private String id;
    private String senderNick;
    private String senderFirstName;
    private String senderLastName;
    private Timestamp sendDate;
}
