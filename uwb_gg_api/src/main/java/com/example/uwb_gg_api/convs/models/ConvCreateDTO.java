package com.example.uwb_gg_api.convs.models;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConvCreateDTO {
    @Size(min = 5)
    private String name;
    @NotNull
    private UUID userID;
    @NotEmpty
    private List<@NotNull UUID> participants;
}
