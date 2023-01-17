package com.example.uwbggbackend.security;

import com.example.uwbggbackend.user.models.User;

import java.util.UUID;

public interface AuthenticationFacade {
    User getCurrentAuthenticatedUser();

    UUID getCurrentAuthenticatedUserId();
}
