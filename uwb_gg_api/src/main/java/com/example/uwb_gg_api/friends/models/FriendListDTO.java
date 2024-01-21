package com.example.uwb_gg_api.friends.models;

import lombok.Data;

import java.util.UUID;

@Data
public class FriendListDTO {
    private UUID id;
    private String firstName;
    private String lastName;
    private String nick;
    private String fullName;
}
