package com.example.uwb_gg_api.invitations.models;

import com.example.uwb_gg_api.user.models.User;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
@Entity
public class Invitation {
    @Id
    private UUID id;
    private String senderFirstName;
    private String senderLastName;
    private String senderNick;
    private UUID senderId;
    @ManyToOne
    private User to;
    private Timestamp sendDate;
    private InvStatus status;
}
