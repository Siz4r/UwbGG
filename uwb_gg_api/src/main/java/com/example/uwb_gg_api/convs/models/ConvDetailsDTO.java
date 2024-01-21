package com.example.uwb_gg_api.convs.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter @Setter
@Data
public class ConvDetailsDTO {
    private String id;
    private String name;
    private Date createdAt;
    private Boolean isSilenced;
    private String chatPhoto;
    private List<String> nicks;
    private String theme;
    private Boolean isFavourite;
    private List<ConvMessage> messages;
    private List<Participant> participants;

    @Getter @Setter
    public static class ConvMessage {
        private String id;
        private String nick;
        private String content;
        private Date sendTime;
    }

    @Getter @Setter
    private static class Participant {
        private String id;
        private String nick;
    }
}
