package com.example.uwbggbackend.message.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MessageResponseDTO {
    private boolean isSimpleMessage;
    private SimpleMessageDTO data;
    private ActivationMessage activationMessage;
}
