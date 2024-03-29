package com.example.uwbggbackend.message.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class ActivationMessage {
    private boolean isActive;
    private UUID convID;
}
