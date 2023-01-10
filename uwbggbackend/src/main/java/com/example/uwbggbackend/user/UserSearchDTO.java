package com.example.uwbggbackend.user;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserSearchDTO {
    private String nick;
    private UUID id;
}
