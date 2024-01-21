package com.example.uwb_gg_api.message;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
public class MessageConvDTO {
    private UUID id;
    private UUID ownerId;
    private String nick;
    private String content;
    private Timestamp sendTime;
}
