package com.example.uwbggbackend.invitations;

import com.example.uwbggbackend.invitations.models.Invitation;
import com.example.uwbggbackend.invitations.models.InvitationListDTO;
import com.example.uwbggbackend.user.UserRepository;
import com.example.uwbggbackend.user.UserServiceImpl;
import com.example.uwbggbackend.user.models.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class InvitationService {
    private final ModelMapper modelMapper;
    private final UserServiceImpl userService;
    private final InvitationRepository invitationRepository;
    public UUID sendInvitation(UUID toId, User requester) {
        var addressed = userService.getUser(toId);
        var id = UUID.randomUUID();

        addressed.getInvitations().add(Invitation.builder()
                        .id(id)
                        .senderNick(requester.getNick())
                        .senderFirstName(requester.getFirstName())
                        .senderLastName(requester.getLastName())
                        .sendDate(new Date(System.currentTimeMillis()))
                .to(addressed).build());

        userService.saveUser(addressed);

        return id;
    }

    public void acceptInvitaion(UUID invID, UUID userId) {

    }

    public void rejectInvitation(UUID invID, UUID userId) {

    }

    public List<InvitationListDTO> getInvs(UUID userID) {
        return userService.getUser(userID).getInvitations().stream()
                .map(inv -> modelMapper.map(inv, InvitationListDTO.class))
                .collect(Collectors.toList());
    }
}
