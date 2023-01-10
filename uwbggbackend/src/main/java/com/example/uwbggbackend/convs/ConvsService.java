package com.example.uwbggbackend.convs;

import com.example.uwbggbackend.convs.models.Conv;
import com.example.uwbggbackend.convs.models.ConvChatDTO;
import com.example.uwbggbackend.convs.models.ConvCreateDTO;
import com.example.uwbggbackend.convs.models.ConvListDTO;
import com.example.uwbggbackend.message.MessageConvDTO;
import com.example.uwbggbackend.message.models.LastMessageDTO;
import com.example.uwbggbackend.participants.ParticipationService;
import com.example.uwbggbackend.participants.models.ParticipationType;
import com.example.uwbggbackend.user.UserServiceImpl;
import com.example.uwbggbackend.util.exceptions.ForbiddenException;
import com.example.uwbggbackend.util.exceptions.IncorrectIdInputException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConvsService {
    private final ConvsRepository convsRepository;
    private final ParticipationService participationService;
    private final UserServiceImpl userService;
    private final ModelMapper mapper;
    public List<ConvListDTO> getConvs(UUID userID) {
        return userService.getUser(userID).getParticipations()
                .stream()
                .map(participation -> {
                    var data = participation.getId().getConv();
                    var conv = mapper.map(data, ConvListDTO.class);
                    var lastMessage = data.getMessages().stream().findFirst().orElse(null);
                    conv.setLastMessage(lastMessage != null ? LastMessageDTO.builder()
                            .content(lastMessage.getContent())
                            .sendTime(lastMessage.getSendTime())
                            .nick(userService.getNick(lastMessage.getOwnerId())).build() : null);

                    return conv;
                })
                .collect(Collectors.toList());
    }

    public ConvChatDTO getConvChatData(UUID convID, UUID userID) {
        var data = convsRepository.findById(convID).orElseThrow(() -> new IncorrectIdInputException("No resource with such id!"));
        var conv = mapper.map(data, ConvChatDTO.class);

        if (data.getParticipations().stream()
                .noneMatch(participant -> participant.getId().getUser().getId().equals(userID))) {
            throw new ForbiddenException();
        }

        conv.setMessages(data.getMessages().stream()
                .map(message -> {
                    var mappedMessage = mapper.map(message, MessageConvDTO.class);
                    mappedMessage.setNick(userService.getNick(mappedMessage.getOwnerId()));
                    return mappedMessage;
                })
                .collect(Collectors.toList()));

        return conv;
    }

    public UUID createConv(ConvCreateDTO dto, UUID userID) {
        var conv = Conv.builder()
                        .name(dto.getName())
                .participations(new ArrayList<>())
                .build();

        var convId = convsRepository.save(conv).getId();

        dto.getParticipants().forEach(participant ->
                participationService.createParticipation(participant, convId
                , ParticipationType.NORMAL));

        participationService.createParticipation(userID, convId, ParticipationType.ADMIN);
        return convId;
    }

    public void deleteConv(UUID convId, UUID userID) {
        if (participationService.ifUserHasAdminParticipation(userID, convId)) {
            convsRepository.deleteById(convId);
        } else {
            throw new ForbiddenException();
        }
    }
}
