package com.example.uwbggbackend.friends;

import com.example.uwbggbackend.friends.models.FriendRelationship;
import com.example.uwbggbackend.friends.models.FriendRelationshipKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendsRepository extends JpaRepository<FriendRelationship, FriendRelationshipKey> {
}
