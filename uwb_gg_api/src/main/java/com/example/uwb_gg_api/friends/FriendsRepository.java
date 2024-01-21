package com.example.uwb_gg_api.friends;

import com.example.uwb_gg_api.friends.models.FriendRelationship;
import com.example.uwb_gg_api.friends.models.FriendRelationshipKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendsRepository extends JpaRepository<FriendRelationship, FriendRelationshipKey> {
}
