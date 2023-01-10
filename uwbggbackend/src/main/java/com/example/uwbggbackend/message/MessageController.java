package com.example.uwbggbackend.message;

import com.example.uwbggbackend.message.models.MessageCreateDTO;
import com.example.uwbggbackend.message.models.MessageResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/sendMessage/")
    public MessageResponseDTO addMessage(@Payload MessageCreateDTO dto) {
        var output = messageService.addMessage(dto);
        simpMessagingTemplate.convertAndSendToUser(dto.getConvID().toString(), "/private", output);
        return output;
    }
}
