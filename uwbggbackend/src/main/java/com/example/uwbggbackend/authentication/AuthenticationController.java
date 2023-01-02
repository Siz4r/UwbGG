package com.example.uwbggbackend.authentication;

import com.example.uwbggbackend.authentication.models.AuthenticateRequest;
import com.example.uwbggbackend.authentication.models.AuthenticationDto;
import com.example.uwbggbackend.authentication.models.ExpiredTokenException;
import com.example.uwbggbackend.user.UserServiceImpl;
import com.example.uwbggbackend.user.models.User;
import com.example.uwbggbackend.user.models.UserRegisterDTO;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final JwtUtil jwtTokenUtil;
    private final UserServiceImpl userService;

    @PostMapping("/login")
    @ResponseStatus(value = HttpStatus.OK)
    public ResponseEntity<AuthenticationDto> login(@RequestBody @Valid AuthenticateRequest authenticateRequest,
                                                   HttpServletResponse response) {
        try {
            System.out.println(authenticateRequest.getNick());


        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Wrong login or password!");
        }
        System.out.println(authenticateRequest.getPassword());

        final var userDetails = userService
                .loadUserByUsername(authenticateRequest.getNick());
        final String accessToken = jwtTokenUtil.generateToken(userDetails, 1000 * 60 * 15);
        final String refreshToken = jwtTokenUtil.generateToken(userDetails, 1000 * 60 * 60 * 24 * 7);

        User user = userService.getUserByUsername(authenticateRequest.getNick());

        Cookie cookie = new Cookie("RefreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        // @TODO: change to production domain
        cookie.setDomain("localhost");
//        cookie.setSecure(true);
        cookie.setMaxAge(1000 * 60 * 60 * 24 * 7);
        response.addCookie(cookie);

        return ResponseEntity.ok(
                AuthenticationDto.builder()
                        .accessToken(accessToken)
                        .user(user)
                        .build()
        );
    }

    @PostMapping("/register")
    @ResponseStatus(value = HttpStatus.CREATED, reason = "User created successfully")
    public UUID registerAnUser(@Valid @RequestBody UserRegisterDTO registerDTO) {
        return userService.addUser(registerDTO);
    }


    @PostMapping("/refresh_token")
    public ResponseEntity<AuthenticationDto> refreshtoken(@CookieValue("RefreshToken") String refreshToken) {
        var username = userService.getNick(UUID.fromString(jwtTokenUtil.extractId(refreshToken)));
        if (!jwtTokenUtil.isTokenExpired(refreshToken)) {
            var accessToken = jwtTokenUtil.generateToken(userService.loadUserByUsername(username), 1000 * 60 * 15);
            User user = userService.getUserByUsername(username);
            return ResponseEntity.ok(
                    AuthenticationDto.builder()
                            .accessToken(accessToken)
                            .user(user)
                            .build()
            );
        } else {
            throw new ExpiredTokenException("Token has expired!");
        }
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(value = HttpStatus.OK)
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("RefreshToken", null);
        cookie.setPath("/");
        cookie.setDomain("localhost");
        cookie.setMaxAge(0);
        cookie.setSecure(true);
        response.addCookie(cookie);
        return ResponseEntity.ok(true);
    }
}
