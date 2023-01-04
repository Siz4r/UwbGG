package com.example.uwbggbackend.friends.models;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@AllArgsConstructor @NoArgsConstructor
public class FriendRelationshipKey implements Serializable {
    private UUID requesterId;
    private UUID addressedId;
}
