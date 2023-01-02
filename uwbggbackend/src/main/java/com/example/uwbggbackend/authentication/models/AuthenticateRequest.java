package com.example.uwbggbackend.authentication.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
public class AuthenticateRequest {
    @NotBlank
    private String nick;
    @NotBlank
    private String password;
}
