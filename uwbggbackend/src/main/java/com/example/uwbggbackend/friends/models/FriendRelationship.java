package com.example.uwbggbackend.friends.models;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor @AllArgsConstructor
public class FriendRelationship {
    @EmbeddedId
    private FriendRelationshipKey id;
}
