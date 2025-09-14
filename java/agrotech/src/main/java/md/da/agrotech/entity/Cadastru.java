package md.da.agrotech.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cadastru {
    @Id
    private Long cadastruId;
    private String userId;
    private Long raionId;
    private Long hectare;
    private Double longitude;
    private Double latitude;
}
