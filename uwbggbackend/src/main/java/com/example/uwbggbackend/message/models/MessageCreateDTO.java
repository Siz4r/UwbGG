package com.example.uwbggbackend.message.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class MessageCreateDTO {
    private String content;
    private UUID convID;
    private UUID userID;
    private List<Integer> imageRawData;
}
