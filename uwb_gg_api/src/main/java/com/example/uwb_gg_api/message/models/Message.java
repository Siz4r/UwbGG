package com.example.uwb_gg_api.message.models;

import com.example.uwb_gg_api.convs.models.Conv;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
public class Message {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private UUID id;
    private String content;
    private UUID ownerId;
    private String nick;
    private Timestamp sendTime;
    @ManyToOne
    private Conv conv;
}
