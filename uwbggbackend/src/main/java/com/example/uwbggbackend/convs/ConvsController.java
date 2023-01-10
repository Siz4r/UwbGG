package com.example.uwbggbackend.convs;

import com.example.uwbggbackend.convs.models.ConvChatDTO;
import com.example.uwbggbackend.convs.models.ConvCreateDTO;
import com.example.uwbggbackend.convs.models.ConvListDTO;
import com.example.uwbggbackend.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/convs")
public class ConvsController {
    private final ConvsService convsService;
    private final AuthenticationFacade authenticationFacade;
    @GetMapping
    public List<ConvListDTO> getConvsByUser() {
        return convsService.getConvs(authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @GetMapping("{id}")
    public ConvChatDTO getChatData(@PathVariable("id") UUID id) {
        return convsService.getConvChatData(id, authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @PostMapping
    public UUID createConv(@RequestBody ConvCreateDTO dto) {
        return convsService.createConv(dto, authenticationFacade.getCurrentAuthenticatedUserId());
    }

    @DeleteMapping(params = {"convId"})
    public void deleteConv(@RequestParam("convId") UUID convId) {
        convsService.deleteConv(convId, authenticationFacade.getCurrentAuthenticatedUserId());
    }
}
