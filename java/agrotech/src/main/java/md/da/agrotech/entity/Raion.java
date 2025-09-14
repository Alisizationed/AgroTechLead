package md.da.agrotech.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table
public class Raion {
    private Long raionId;
    private String raionName;
    private Long horizonAhDepth;
}
