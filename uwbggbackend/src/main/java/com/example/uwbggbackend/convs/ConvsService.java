package com.example.uwbggbackend.convs;

import com.example.uwbggbackend.activationTracker.ActivationTracker;
import com.example.uwbggbackend.convs.models.*;
import com.example.uwbggbackend.friends.models.FriendListDTO;
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
    private final ActivationTracker activationTracker;
    private final ModelMapper mapper;
    public List<ConvListDTO> getConvs(UUID userID) {
        return userService.getUser(userID)
                .getParticipations()
                .stream()
                .map(participation -> {
                    var data = participation.getId().getConv();
                    var conv = mapper.map(data, ConvListDTO.class);
                    var particiapnts = data.getParticipations().stream()
                            .map(participation1 -> participation1.getId().getUser().getId())
                            .toList();
                    conv.setActive(activationTracker.getActiveFriends(userID)
                            .stream()
                            .map(FriendListDTO::getId)
                            .anyMatch(particiapnts::contains));

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
        var participants = dto.getParticipants();

        var convDTO = mapper.map(convsRepository.save(conv), ConvCreateResponse.class);

        participants.forEach(participant ->
                participationService.createParticipation(participant, convDTO.getId(),
                        ParticipationType.NORMAL));

        participationService.createParticipation(dto.getUserID(), convDTO.getId(),
                ParticipationType.ADMIN);

        participants.add(dto.getUserID());
        convDTO.setParticipants(participants);

        convDTO.setActive(activationTracker.getActiveFriends(dto.getUserID())
                .stream()
                .map(FriendListDTO::getId)
                .anyMatch(participants::contains));

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

    public void deleteUserFromConv(UUID convID, UUID userID) {
        participationService.deleteUserFromConv(convID, userID);
    }

    public Participant addParticipantToConv(UUID convID, UUID userID, UUID currentAuthenticatedUserId) {
        if (!participationService.ifUserHasAdminParticipation(currentAuthenticatedUserId, convID)) {
            throw new ForbiddenException();
        }
        var key = participationService.createParticipationKey(userID, convID);
        var participant = mapper.map(key.getUser(), Participant.class);
        participant.setRole(ParticipationType.NORMAL);
        participationService.createParticipation(userID, convID, ParticipationType.NORMAL);

        return participant;
    }
}
