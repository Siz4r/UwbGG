package com.example.uwb_gg_api.user.models;

import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserNewPasswordDTO {
    @Size(min = 8, message = "Password should have at least 8 characters")
    private String currentPassword;
    @Size(min = 8, message = "Password should have at least 8 characters")
    private String newPassword;
}
