package com.example.uwbggbackend.convs;

import com.example.uwbggbackend.convs.models.*;
import com.example.uwbggbackend.message.MessageConvDTO;
import com.example.uwbggbackend.message.models.LastMessageDTO;
import com.example.uwbggbackend.participants.ParticipationService;
import com.example.uwbggbackend.participants.models.Participant;
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

        conv.setParticipants(
                data.getParticipations().stream()
                        .map(participation -> {
                            var participant = mapper.map(participation.getId().getUser(), Participant.class);
                            participant.setRole(participation.getParticipationType());
                            return participant;
                        })
                        .collect(Collectors.toList())
        );

        conv.setMessages(data.getMessages().stream()
                .map(message -> {
                    var mappedMessage = mapper.map(message, MessageConvDTO.class);
                    mappedMessage.setNick(userService.getNick(mappedMessage.getOwnerId()));
                    return mappedMessage;
                })
                .collect(Collectors.toList()));

        return conv;
    }

    public ConvCreateResponse createConv(ConvCreateDTO dto) {
        var conv = Conv.builder()
                        .name(dto.getName())
                .participations(new ArrayList<>())
                .build();

        var convDTO = mapper.map(convsRepository.save(conv), ConvCreateResponse.class);

        dto.getParticipants().forEach(participant ->
                participationService.createParticipation(participant, convDTO.getId(),
                        ParticipationType.NORMAL));

        participationService.createParticipation(dto.getUserID(), convDTO.getId(),
                ParticipationType.ADMIN);
        var participants = dto.getParticipants();
        participants.add(dto.getUserID());
        convDTO.setParticipants(participants);
        return convDTO;
    }

    public void deleteConv(UUID convId, UUID userID) {
        if (participationService.ifUserHasAdminParticipation(userID, convId)) {
            convsRepository.deleteById(convId);
        } else {
            throw new ForbiddenException();
        }
    }

    public void deleteFromConv(UUID convID, UUID currentAuthenticatedUserId) {
        participationService.deleteFromConv(convID, currentAuthenticatedUserId);
    }

    public void deleteUserFromConv(UUID convID, UUID userID, UUID currentUser) {
        participationService.deleteUserFromConv(convID, userID, currentUser);
    }
}
