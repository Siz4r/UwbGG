package com.example.uwb_gg_api.security;

import com.example.uwb_gg_api.user.UserServiceImpl;
import com.example.uwb_gg_api.user.models.User;
import com.example.uwb_gg_api.util.exceptions.ForbiddenException;
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
