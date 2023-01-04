package com.example.uwbggbackend.message;

import com.example.uwbggbackend.message.models.MessageCreateDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MessageService {
    public UUID addMessage(MessageCreateDTO dto, UUID convID, UUID currentAuthenticatedUserId) {
        return null;
    }

    public List<MessageConvDTO> getMessages(UUID convId, UUID userId) {
        return null;
    }
}
