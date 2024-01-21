package com.example.uwb_gg_api.friends;

import com.example.uwb_gg_api.friends.models.FriendListDTO;
import com.example.uwb_gg_api.security.AuthenticationFacade;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("friends")
public class FriendShipController {
    private final AuthenticationFacade authenticationFacade;
    private final FriendsService friendsService;
    @GetMapping
    public List<FriendListDTO> getFriends() {
        return friendsService.getFriends(authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @DeleteMapping
    public void deleteFriends(@RequestBody @Valid @Size(min = 1) List<UUID> ids) {
        friendsService.deleteFriends(ids, authenticationFacade.getCurrentAuthenticatedUser());
    }
}
