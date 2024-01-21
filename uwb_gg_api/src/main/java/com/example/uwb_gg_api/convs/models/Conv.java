package com.example.uwb_gg_api.convs.models;

import com.example.uwb_gg_api.message.models.Message;
import com.example.uwb_gg_api.participants.models.Participation;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor @AllArgsConstructor
public class Conv {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private UUID id;
    private String name;
    @OneToMany(mappedBy = "id.conv",
            cascade = CascadeType.REMOVE)
    private List<Participation> participations;

    @JsonBackReference
    @OneToMany(mappedBy = "conv", cascade = CascadeType.REMOVE)
    private List<Message> messages;
}
