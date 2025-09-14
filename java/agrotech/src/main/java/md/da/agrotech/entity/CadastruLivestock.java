package md.da.agrotech.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CadastruLivestock {
    @Id
    private Long cadastruLivestockId;
    private Long cadastruId;
    private Long livestockId;
    private Long quantity;
    private Double contaminated;
    private LocalDateTime dataProduced;
}
