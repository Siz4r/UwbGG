package com.example.uwbggbackend.message.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class LastMessageDTO {
    private String nick;
    private String content;
    private Timestamp sendTime;
}
