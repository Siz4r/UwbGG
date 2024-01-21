package com.example.uwb_gg_api.friends;

import com.example.uwb_gg_api.friends.models.FriendListDTO;
import com.example.uwb_gg_api.friends.models.FriendRelationship;
import com.example.uwb_gg_api.friends.models.FriendRelationshipKey;
import com.example.uwb_gg_api.user.UserServiceImpl;
import com.example.uwb_gg_api.user.models.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendsService {
    private final FriendsRepository friendsRepository;
    private final UserServiceImpl userService;
    private final ModelMapper mapper;

    public List<FriendListDTO> getFriends(UUID userId) {
        var friends = userService.getUser(userId).getAddressed()
                .stream()
                .map(addr -> mapper.map(addr.getId().getRequester(), FriendListDTO.class))
                .collect(Collectors.toList());

        friends.addAll(userService.getUser(userId).getRequested()
                .stream()
                .map(req -> mapper.map(req.getId().getAddressed(), FriendListDTO.class))
                .toList());

        return friends;
    }

    public FriendListDTO addFriend(UUID requesterID, UUID addresedID) {
        friendsRepository.save(FriendRelationship.builder()
                .id(new FriendRelationshipKey(userService.getUser(requesterID), userService.getUser(addresedID))).build());
        return mapper.map(userService.getUser(requesterID), FriendListDTO.class);
    }

    public void deleteFriends(List<UUID> ids, User user) {
        ids.forEach(id -> {
            user.getAddressed()
                    .stream()
                    .filter(friendRelationship -> friendRelationship.getId().getRequester().getId().equals(id))
                    .findAny()
                    .ifPresent(friendsRepository::delete);

            user.getRequested()
                    .stream()
                    .filter(friendRelationship -> friendRelationship.getId().getAddressed().getId().equals(id))
                    .findAny()
                    .ifPresent(friendsRepository::delete);
        });
    }
}
