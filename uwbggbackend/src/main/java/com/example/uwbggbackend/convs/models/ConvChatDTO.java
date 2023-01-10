package com.example.uwbggbackend.convs.models;

import com.example.uwbggbackend.message.MessageConvDTO;
import com.example.uwbggbackend.message.models.Message;
import com.example.uwbggbackend.participants.models.Participant;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ConvChatDTO {
    private UUID id;
    private String name;
    private List<MessageConvDTO> messages;
    private List<Participant> participants;

}
