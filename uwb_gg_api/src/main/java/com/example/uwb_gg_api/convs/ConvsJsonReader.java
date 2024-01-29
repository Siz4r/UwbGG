package com.example.uwb_gg_api.convs;

import com.example.uwb_gg_api.convs.models.ConvDetailsDTO;
import com.example.uwb_gg_api.convs.models.ConvListDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class ConvsJsonReader {

    public ConvDetailsDTO getConvDetails(UUID id) {
        var mapper = new ObjectMapper();
        var typeReference = new TypeReference<List<ConvDetailsDTO>>(){};
        var inputStream = TypeReference.class.getResourceAsStream("/convs_details.json");

        try {
            var convs = mapper.readValue(inputStream, typeReference);
            return convs.stream().filter(c -> c.getId().equals(id.toString())).findFirst().orElse(null);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<ConvListDTO> getConvs() {
        var mapper = new ObjectMapper();
        var typeReference = new TypeReference<List<ConvListDTO>>(){};
        var inputStream = TypeReference.class.getResourceAsStream("/convs.json");

        try {
            return mapper.readValue(inputStream, typeReference);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
