package com.example.uwbggbackend.authentication.models;

import com.example.uwbggbackend.user.models.User;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class AuthenticationDto extends PublicTokenDto{
    private User user;
}
