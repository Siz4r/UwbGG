package com.example.uwbggbackend.user.models;

import com.example.uwbggbackend.friends.models.FriendRelationship;
import com.example.uwbggbackend.invitations.models.Invitation;
import com.example.uwbggbackend.participants.models.Participation;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Entity(name = "UserData")
public class User {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private UUID id;
    private String email;
    private String nick;
    private String firstName;
    private String password;
    private String lastName;
    @JsonBackReference
    @OneToMany(mappedBy = "id.user")
    private List<Participation> participations;
    @JsonBackReference
    @OneToMany(mappedBy = "to")
    private List<Invitation> invitations;

    @JsonBackReference
    @OneToMany(mappedBy = "id.requester")
    private List<FriendRelationship> requested;

    @JsonBackReference
    @OneToMany(mappedBy = "id.addressed")
    private List<FriendRelationship> addressed;
}
