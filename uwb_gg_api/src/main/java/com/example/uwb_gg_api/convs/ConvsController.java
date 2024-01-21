package com.example.uwb_gg_api.convs;

import com.example.uwb_gg_api.convs.models.ConvChatDTO;
import com.example.uwb_gg_api.convs.models.ConvCreateDTO;
import com.example.uwb_gg_api.convs.models.ConvDetailsDTO;
import com.example.uwb_gg_api.convs.models.ConvListDTO;
import com.example.uwb_gg_api.participants.models.Participant;
import com.example.uwb_gg_api.security.AuthenticationFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/convs")
@Slf4j
public class ConvsController {
    private final ConvsService convsService;
    private final AuthenticationFacade authenticationFacade;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ConvsJsonReader convsJsonReader;

    @GetMapping
    public List<ConvListDTO> getConvsByUser() {
        return convsJsonReader.getConvs();
    }

    @GetMapping("{id}")
    public ConvDetailsDTO getChatData(@PathVariable("id") UUID id) {
        return convsJsonReader.getConvDetails(id);
//        return convsService.getConvChatData(id, authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @MessageMapping("/conversations/")
    @PostMapping(consumes={MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
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

    @DeleteMapping("{convID}/user/{userID}")
    public void deleteUserFromConv(@PathVariable("convID") UUID convID, @PathVariable("userID") UUID userID) {
        convsService.deleteUserFromConv(convID, userID);
    }

    @PostMapping(path = "addParticipant")
    public Participant addParticipant(@RequestParam("convID") UUID convID,
                                      @RequestParam("userID") UUID userID) {
        return convsService.addParticipantToConv(convID, userID, authenticationFacade.getCurrentAuthenticatedUserId());
    }
}
