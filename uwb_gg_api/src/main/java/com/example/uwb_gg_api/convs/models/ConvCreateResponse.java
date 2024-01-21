package com.example.uwb_gg_api.convs.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ConvCreateResponse {
    private String name;
    private UUID id;
    private List<UUID> participants;
    private boolean isActive;
}
