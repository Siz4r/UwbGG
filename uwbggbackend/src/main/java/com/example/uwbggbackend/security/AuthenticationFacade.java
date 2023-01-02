package com.example.uwbggbackend.security;

import com.example.uwbggbackend.user.models.User;

import java.util.List;
import java.util.UUID;

public interface AuthenticationFacade {
    User getCurrentAuthenticatedUser();
    List<String> getCurrentAuthenticatedUserAuthorities();
    Boolean checkIfCurrentAuthenticatedUserAnOwnerOfThisProject();
    UUID getCurrentAuthenticatedUserId();
}
