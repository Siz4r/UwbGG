package com.example.uwbggbackend.convs.models;

import com.example.uwbggbackend.message.models.LastMessageDTO;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor @NoArgsConstructor
public class ConvListDTO {
    private UUID id;
    private String name;
    private boolean isActive;
    private LastMessageDTO lastMessage;
}
