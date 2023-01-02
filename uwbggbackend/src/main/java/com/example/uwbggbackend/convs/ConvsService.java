package com.example.uwbggbackend.convs;

import com.example.uwbggbackend.convs.models.Conv;
import com.example.uwbggbackend.convs.models.ConvCreateDTO;
import com.example.uwbggbackend.convs.models.ConvListDTO;
import com.example.uwbggbackend.participants.ParticipationService;
import com.example.uwbggbackend.participants.models.Participant;
import com.example.uwbggbackend.participants.models.ParticipationType;
import com.example.uwbggbackend.user.UserServiceImpl;
import com.example.uwbggbackend.util.exceptions.ForbiddenException;
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
                    var conv = participation.getId().getConv();

                    var convParticipants = conv.getParticipations()
                            .stream()
                            .map(participation1 -> {
                                var convPart = mapper.map(participation1.getId().getUser(), Participant.class);
                                convPart.setRole(participation1.getParticipationType());
                                return convPart;
                            })
                            .collect(Collectors.toList());


                    return ConvListDTO.builder()
                            .name(conv.getName())
                            .participants(convParticipants)
                            .build();
                })
                .collect(Collectors.toList());
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
