package com.example.uwb_gg_api.invitations;

import com.example.uwb_gg_api.invitations.models.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {
}
