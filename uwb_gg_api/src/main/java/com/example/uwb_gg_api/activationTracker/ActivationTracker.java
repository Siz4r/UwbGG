package com.example.uwb_gg_api.activationTracker;

import com.example.uwb_gg_api.convs.models.Conv;
import com.example.uwb_gg_api.friends.FriendsService;
import com.example.uwb_gg_api.friends.models.FriendListDTO;
import com.example.uwb_gg_api.message.models.ActivationMessage;
import com.example.uwb_gg_api.message.models.MessageResponseDTO;
import com.example.uwb_gg_api.security.AuthenticationFacade;
import com.example.uwb_gg_api.user.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ActivationTracker {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final SessionRegistry sessionRegistry;
    private final FriendsService friendsService;
    private final AuthenticationFacade authenticationFacade;
    private final UserServiceImpl userService;
    public List<FriendListDTO> getActiveFriends(UUID userID) {
        final var allPrincipals = sessionRegistry.getAllPrincipals();
        var allUsernames = new ArrayList<String>();
        for (final Object principal : allPrincipals) {
            if (principal instanceof final User user) {
                //Make sure the session is not expired --------------------------------------------------▼
                var activeUserSessions = sessionRegistry.getAllSessions(principal, false);
                if (!activeUserSessions.isEmpty()) {
                    allUsernames.add(user.getUsername());
                }
            }
        }

        return friendsService.getFriends(userID)
                .stream()
                .filter(friendListDTO -> allUsernames.contains(friendListDTO.getNick()))
                .toList();
    }

    public void onLogout() {
        final var allPrincipals = sessionRegistry.getAllPrincipals();
        final var username = authenticationFacade.getCurrentAuthenticatedUser().getNick();
        for (final Object principal: allPrincipals) {
            if (principal instanceof final org.springframework.security.core.userdetails.User user) {
                //Make sure the session is not expired --------------------------------------------------▼
                var activeUserSessions = sessionRegistry.getAllSessions(principal, false);
                if (!activeUserSessions.isEmpty() && username.equals(user.getUsername())) {
                    for (SessionInformation session:
                         activeUserSessions) {
                         session.expireNow();
                         sessionRegistry.removeSessionInformation(session.getSessionId());
                    }
                }
            }
        }

        updateConvStatus(username, false);
    }


    public void updateConvStatus(String username,
                                 boolean login) {
        var userConvs = userService.getUserByUsername(username).getParticipations().stream()
                .map(participation -> participation.getId().getConv())
                .toList();
        var userDetails = userService.loadUserByUsername(username);

        if (login) {
            sessionRegistry.registerNewSession(UUID.randomUUID().toString(),
                    userDetails);
        }

        for (Conv conv :
                userConvs) {
            var isActive = conv.getParticipations().stream()
                    .map(participation -> participation.getId().getUser().getNick())
                    .filter(nick -> !sessionRegistry.getAllSessions(userDetails, false).isEmpty()).count() >= 2;


                var inActive = MessageResponseDTO.builder()
                                .isSimpleMessage(false)
                                        .activationMessage(new ActivationMessage(isActive, conv.getId()))
                                                .build();
                simpMessagingTemplate.convertAndSendToUser(conv.getId().toString(), "/private", inActive);

        }
    }

    public void onLogin(String username) {
        updateConvStatus(username,true);
    }
}
