package com.example.uwb_gg_api.authentication.models;

import com.example.uwb_gg_api.user.models.User;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class AuthenticationDto extends PublicTokenDto{
    private User user;
}
