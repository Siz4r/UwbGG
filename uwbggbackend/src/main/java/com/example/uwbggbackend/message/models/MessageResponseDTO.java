package com.example.uwbggbackend.message.models;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class MessageResponseDTO {
    private String content;
    private UUID ownerId;
    private String nick;
    private Timestamp sendTime;
    private List<Integer> imageRawData;
    private UUID id;
}
