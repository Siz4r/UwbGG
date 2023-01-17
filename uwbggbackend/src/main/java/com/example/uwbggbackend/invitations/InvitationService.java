package com.example.uwbggbackend.invitations;

import com.example.uwbggbackend.friends.FriendsService;
import com.example.uwbggbackend.friends.models.FriendListDTO;
import com.example.uwbggbackend.invitations.models.InvStatus;
import com.example.uwbggbackend.invitations.models.Invitation;
import com.example.uwbggbackend.invitations.models.InvitationListDTO;
import com.example.uwbggbackend.user.UserServiceImpl;
import com.example.uwbggbackend.user.models.User;
import com.example.uwbggbackend.util.exceptions.ForbiddenException;
import com.example.uwbggbackend.util.exceptions.IncorrectIdInputException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class InvitationService {
    private final ModelMapper modelMapper;
    private final UserServiceImpl userService;
    private final InvitationRepository invitationRepository;
    private final FriendsService friendsService;
    public UUID sendInvitation(UUID toId, User requester) {
        var addressed = userService.getUser(toId);
        checkInvitationValidity(toId, requester, addressed);

        var id = UUID.randomUUID();

        var inv = Invitation.builder()
                .id(id)
                .senderNick(requester.getNick())
                .senderFirstName(requester.getFirstName())
                .senderLastName(requester.getLastName())
                .senderId(requester.getId())
                .sendDate(new Timestamp(System.currentTimeMillis()))
                .status(InvStatus.PENDING)
                .to(addressed).build();
        invitationRepository.save(inv);

        return id;
    }

    public void checkInvitationValidity(UUID toId, User requester, User addressed) {
        if (friendsService.getFriends(requester.getId()).stream()
                .anyMatch(friendListDTO -> friendListDTO.getId().equals(toId))) {
            throw new ForbiddenException();
        }

        if (addressed.getInvitations().stream()
                .filter(invitation -> invitation.getStatus().equals(InvStatus.PENDING))
                .anyMatch(invitation -> invitation.getSenderId().equals(requester.getId()))) {
            throw new IllegalArgumentException("You have already send invitation to this user!");
        }
    }

    public FriendListDTO acceptInvitaion(UUID invID, UUID userId) {
        return friendsService.addFriend(setStatusInv(invID, userId, InvStatus.ACCEPTED).getSenderId(), userId);
    }

    public void rejectInvitation(UUID invID, UUID userId) {
       setStatusInv(invID, userId, InvStatus.REJECTED);
    }

    public List<InvitationListDTO> getInvs(UUID userID) {
        return userService.getUser(userID).getInvitations().stream()
                .filter(inv -> inv.getStatus().equals(InvStatus.PENDING))
                .map(inv -> modelMapper.map(inv, InvitationListDTO.class))
                .collect(Collectors.toList());
    }

    private Invitation setStatusInv(UUID invID, UUID userId, InvStatus status) {
        var inv = invitationRepository.findById(invID).orElseThrow(() -> new IncorrectIdInputException("There is no such invitation!"));

        if (!userId.equals(inv.getTo().getId())) {
            throw new ForbiddenException();
        }

        inv.setStatus(status);
        return invitationRepository.save(inv);
    }
}
