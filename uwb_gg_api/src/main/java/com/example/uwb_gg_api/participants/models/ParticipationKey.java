package com.example.uwb_gg_api.participants.models;

import com.example.uwb_gg_api.convs.models.Conv;
import com.example.uwb_gg_api.user.models.User;
import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ParticipationKey implements Serializable {
    @ManyToOne
    private Conv conv;
    @ManyToOne
    private User user;
}
