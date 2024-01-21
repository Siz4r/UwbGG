package com.example.uwb_gg_api.security;

import com.example.uwb_gg_api.user.models.User;

import java.util.UUID;

public interface AuthenticationFacade {
    User getCurrentAuthenticatedUser();

    UUID getCurrentAuthenticatedUserId();
}
