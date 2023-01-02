package com.example.uwbggbackend.user.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterDTO {
    @Email
    private String email;
    @Size(min = 4, message = "Nick must have at least 4 characters")
    private String nick;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @Size(min = 8, message = "Password must have at least 4 characters")
    private String password;
}
