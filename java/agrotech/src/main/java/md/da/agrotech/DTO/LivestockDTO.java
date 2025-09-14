package md.da.agrotech.DTO;

import java.time.LocalDateTime;

public record LivestockDTO(
    Long livestockId,
    String livestockName,
    Integer quantity,
    Double contaminated,
    LocalDateTime dataProduced
) {}
