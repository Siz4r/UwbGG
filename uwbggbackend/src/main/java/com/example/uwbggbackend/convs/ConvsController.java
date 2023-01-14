package com.example.uwbggbackend.convs;

import com.example.uwbggbackend.convs.models.ConvChatDTO;
import com.example.uwbggbackend.convs.models.ConvCreateDTO;
import com.example.uwbggbackend.convs.models.ConvListDTO;
import com.example.uwbggbackend.security.AuthenticationFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/convs")
public class ConvsController {
    private final ConvsService convsService;
    private final AuthenticationFacade authenticationFacade;
    private final SimpMessagingTemplate simpMessagingTemplate;
    @GetMapping
    public List<ConvListDTO> getConvsByUser() {
        return convsService.getConvs(authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @GetMapping("{id}")
    public ConvChatDTO getChatData(@PathVariable("id") UUID id) {
        return convsService.getConvChatData(id, authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @MessageMapping("/conversations/")
    @PostMapping
    public UUID createConv(@RequestBody @Valid ConvCreateDTO dto) {
        var conv = convsService.createConv(dto);
        for (var u:
                conv.getParticipants()) {
            simpMessagingTemplate.convertAndSendToUser(u.toString(),"/new",conv);
        }

        return conv.getId();
    }

    @DeleteMapping(params = {"convId"})
    public void deleteConv(@RequestParam("convId") UUID convId) {
        convsService.deleteConv(convId, authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @DeleteMapping("{convID}")
    public void deleteFromConv(@PathVariable("convID") UUID convID) {
        convsService.deleteFromConv(convID, authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @DeleteMapping("{convID}/{userID}")
    public void deleteUserFromConv(@PathVariable("convID") UUID convID, @PathVariable("userID") UUID userID) {
        convsService.deleteUserFromConv(convID, userID, authenticationFacade.getCurrentAuthenticatedUserId());
    }
}
