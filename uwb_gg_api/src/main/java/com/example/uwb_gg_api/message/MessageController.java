package com.example.uwb_gg_api.message;

import com.example.uwb_gg_api.message.models.MessageCreateDTO;
import com.example.uwb_gg_api.message.models.MessageResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/sendMessage/")
    public MessageResponseDTO addMessage(@Payload MessageCreateDTO dto) {
        var output = messageService.addMessage(dto);
        output.setImageRawData(dto.getImageRawData());

        var response = MessageResponseDTO.builder()
                .isSimpleMessage(true)
                .data(output)
                .build();

        simpMessagingTemplate.convertAndSendToUser(dto.getConvID().toString(), "/private", response);
        return response;
    }

}
