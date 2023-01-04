package com.example.uwbggbackend.invitations;

import com.example.uwbggbackend.invitations.models.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {
}
