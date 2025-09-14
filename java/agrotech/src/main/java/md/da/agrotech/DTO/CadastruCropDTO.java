package md.da.agrotech.DTO;

import java.time.LocalDateTime;

public record CadastruCropDTO (
        Long cadastruId,
        String userId,
        Long raionId,
        Long hectare,
        Double longitude,
        Double latitude,
        String cropName,
        Integer quantity,
        Double pesticide,
        LocalDateTime dataProduced
) {}
