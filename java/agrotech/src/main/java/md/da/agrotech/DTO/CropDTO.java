package md.da.agrotech.DTO;

import java.time.LocalDateTime;

public record CropDTO(
    Long cropId,
    String cropName,
    Integer quantity,
    Double pesticide,
    LocalDateTime dataProduced
) {}
