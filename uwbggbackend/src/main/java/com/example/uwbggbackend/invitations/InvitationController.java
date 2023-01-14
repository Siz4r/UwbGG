package com.example.uwbggbackend.invitations;

import com.example.uwbggbackend.friends.models.FriendListDTO;
import com.example.uwbggbackend.invitations.models.InvitationListDTO;
import com.example.uwbggbackend.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("invitation")
public class InvitationController {
    private final InvitationService invitationService;
    private final AuthenticationFacade authenticationFacade;
    @PostMapping("/{toID}")
    public UUID sendInvitation(@PathVariable("toID") UUID toId) {
        return invitationService.sendInvitation(toId, authenticationFacade.getCurrentAuthenticatedUser());
    }

    @PatchMapping("/accept/{invID}")
    public FriendListDTO acceptInvitation(@PathVariable("invID") UUID invID) {
        return invitationService.acceptInvitaion(invID, authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @PatchMapping("/reject/{invID}")
    public void rejectInvitation(@PathVariable("invID") UUID invID) {
        invitationService.rejectInvitation(invID, authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @GetMapping
    public List<InvitationListDTO> getInvs() {;
        return invitationService.getInvs(authenticationFacade.getCurrentAuthenticatedUserId());
    }
}
