package md.da.agrotech.DTO;

import java.time.LocalDateTime;

public record CadastruLivestockDTO(
        Long cadastruId,
        String userId,
        Long raionId,
        Long hectare,
        Double longitude,
        Double latitude,
        String livestockName,
        Integer quantity,
        Double contaminated,
        LocalDateTime dataProduced
) {}
