package com.example.uwbggbackend.message;

import com.example.uwbggbackend.message.models.MessageCreateDTO;
import com.example.uwbggbackend.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;
    private final AuthenticationFacade authenticationFacade;
    @GetMapping(params = { "convID" })
    public List<MessageConvDTO> getMessages(@RequestParam("convID") UUID convId) {
        return messageService.getMessages(convId, authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @PostMapping(params = { "convID" })
    public UUID addMessage(@RequestBody MessageCreateDTO dto,
                           @RequestParam UUID convID) {
        return messageService.addMessage(dto, convID,
                authenticationFacade.getCurrentAuthenticatedUserId());
    }
}
