package com.example.uwbggbackend.security;

import com.example.uwbggbackend.user.UserServiceImpl;
import com.example.uwbggbackend.user.models.User;
import com.example.uwbggbackend.util.exceptions.ForbiddenException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthenticationFacadeImpl implements AuthenticationFacade {
    private final UserServiceImpl userService;

    @Override
    public User getCurrentAuthenticatedUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new ForbiddenException();
        }

        return userService.getUserByUsername(authentication.getName());
    }

    @Override
    public UUID getCurrentAuthenticatedUserId() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if ((authentication instanceof AnonymousAuthenticationToken)) {
            throw new ForbiddenException();
        }

        return userService.getUserByUsername(authentication.getName()).getId();
    }


}
