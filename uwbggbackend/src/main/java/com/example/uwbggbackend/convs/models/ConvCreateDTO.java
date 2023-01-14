package com.example.uwbggbackend.convs.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class ConvCreateDTO {
    @Size(min = 5)
    private final String name;
    @NotNull
    private final UUID userID;
    @NotEmpty
    private final List<@NotNull UUID> participants;
}
