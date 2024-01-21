package com.example.uwb_gg_api.authentication.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@SuperBuilder
@Getter
public class PublicTokenDto {
    private final String accessToken;
    private final String tokenType = "Bearer";
}
