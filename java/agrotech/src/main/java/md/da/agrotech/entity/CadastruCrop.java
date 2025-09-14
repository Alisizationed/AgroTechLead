package md.da.agrotech.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CadastruCrop {
    @Id
    private Long cadastruCropId;
    private Long cadastruId;
    @Column("crop_id")
    private Long cropId;
    @Column("quantity")
    private Long quantity;
    @Column("pesticide")
    private Double pesticide;
    @Column("data_produced")
    private LocalDateTime dataProduced;
}
