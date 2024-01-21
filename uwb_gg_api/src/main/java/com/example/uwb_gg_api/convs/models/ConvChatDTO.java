package com.example.uwb_gg_api.convs.models;

import com.example.uwb_gg_api.message.MessageConvDTO;
import com.example.uwb_gg_api.participants.models.Participant;
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
