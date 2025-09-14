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
public class Livestock {
    @Id
    private Long livestockId;
    private String livestockName;
    private Long quantity;
}
