package com.example.uwbggbackend.friends.models;

import com.example.uwbggbackend.user.models.User;
import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor @NoArgsConstructor
@Data
public class FriendRelationshipKey implements Serializable {
    @ManyToOne
    private User requester;
    @ManyToOne
    private User addressed;
}
