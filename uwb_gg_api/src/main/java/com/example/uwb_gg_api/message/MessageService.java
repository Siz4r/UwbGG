package com.example.uwb_gg_api.message;

import com.example.uwb_gg_api.convs.ConvsRepository;
import com.example.uwb_gg_api.message.models.Message;
import com.example.uwb_gg_api.message.models.MessageCreateDTO;
import com.example.uwb_gg_api.message.models.SimpleMessageDTO;
import com.example.uwb_gg_api.user.UserServiceImpl;
import com.example.uwb_gg_api.util.exceptions.IncorrectIdInputException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final ConvsRepository convsRepository;
    private final MessageRepository messageRepository;
    private final UserServiceImpl userService;
    private final ModelMapper mapper;
    public SimpleMessageDTO addMessage(MessageCreateDTO dto) {
        var owner = userService.getUser(dto.getUserID());
        var conv = convsRepository.findById(dto.getConvID()).orElseThrow(() -> new IncorrectIdInputException("Found no resource with such id!"));
        var message = Message.builder()
                .id(UUID.randomUUID())
                .content(dto.getContent())
                .ownerId(dto.getUserID())
                .sendTime(new Timestamp(System.currentTimeMillis()))
                .nick(owner.getNick())
                .build();
        message.setConv(conv);
        return mapper.map(messageRepository.save(message), SimpleMessageDTO.class);
    }
}
