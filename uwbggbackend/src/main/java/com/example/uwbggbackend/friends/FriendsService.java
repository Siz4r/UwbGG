package com.example.uwbggbackend.friends;

import com.example.uwbggbackend.friends.models.FriendListDTO;
import com.example.uwbggbackend.friends.models.FriendRelationship;
import com.example.uwbggbackend.friends.models.FriendRelationshipKey;
import com.example.uwbggbackend.user.UserServiceImpl;
import com.example.uwbggbackend.user.models.User;
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

    public void addFriend(UUID requesterID, UUID addresedID) {
        friendsRepository.save(FriendRelationship.builder()
                .id(new FriendRelationshipKey(userService.getUser(requesterID), userService.getUser(addresedID))).build());
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
