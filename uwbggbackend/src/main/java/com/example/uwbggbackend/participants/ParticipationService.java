package com.example.uwbggbackend.participants;

import com.example.uwbggbackend.convs.ConvsRepository;
import com.example.uwbggbackend.participants.models.Participation;
import com.example.uwbggbackend.participants.models.ParticipationKey;
import com.example.uwbggbackend.participants.models.ParticipationType;
import com.example.uwbggbackend.user.UserServiceImpl;
import com.example.uwbggbackend.util.exceptions.ForbiddenException;
import com.example.uwbggbackend.util.exceptions.IncorrectIdInputException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ParticipationService {
    private final UserServiceImpl userService;
    private final ConvsRepository convsRepository;
    private final ParticipationRepository participationRepository;

    public void createParticipation(UUID userId, UUID convId, ParticipationType type) {
        participationRepository.save(
                Participation.builder()
                        .participationType(type)
                        .id(createParticipationKey(userId, convId))
                        .build()
        );
    }

    public ParticipationKey createParticipationKey(UUID userId, UUID convId) {
        var user = userService.getUser(userId);
        var conv = convsRepository.findById(convId).orElseThrow(() -> new IncorrectIdInputException("No conv with such id!"));
        return new ParticipationKey(conv, user);
    }

    public boolean ifUserHasAdminParticipation(UUID userId, UUID convId) {
        var participation = participationRepository.findById(createParticipationKey(userId, convId))
                .orElseThrow(ForbiddenException::new);

        return participation.getParticipationType().equals(ParticipationType.ADMIN);
    }

    public void deleteFromConv(UUID convID, UUID userID) {
        participationRepository.deleteById(createParticipationKey(userID, convID));
    }

    public void deleteUserFromConv(UUID convID, UUID userID) {
        participationRepository.deleteById(createParticipationKey(userID, convID));
    }
}
