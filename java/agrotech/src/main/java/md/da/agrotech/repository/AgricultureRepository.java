package md.da.agrotech.repository;

import lombok.RequiredArgsConstructor;
import md.da.agrotech.DTO.CadastruCropDTO;
import md.da.agrotech.DTO.CadastruLivestockDTO;
import md.da.agrotech.DTO.CropDTO;
import md.da.agrotech.DTO.LivestockDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Repository
public class AgricultureRepository {
    @Autowired
    private DatabaseClient databaseClient;

    public Flux<CropDTO> findByCadastruId(Long cadastruId) {
        return databaseClient.sql("""
                            SELECT cr.crop_id, cr.crop_name,
                                   cc.quantity, cc.pesticide, cc.data_produced
                            FROM crop cr
                            JOIN cadastru_crop cc ON cr.crop_id = cc.crop_id
                            WHERE cc.cadastru_id = $1
                        """)
                .bind(0, cadastruId)
                .map((row, meta) -> new CropDTO(
                        row.get("crop_id", Long.class),
                        row.get("crop_name", String.class),
                        row.get("quantity", Integer.class),
                        row.get("pesticide", Double.class),
                        row.get("data_produced", LocalDateTime.class)
                ))
                .all();
    }

    public Flux<LivestockDTO> findLivestockByCadastruId(Long cadastruId) {
        return databaseClient.sql("""
                        SELECT l.livestock_id, l.livestock_name,
                               cl.quantity, cl.contaminated, cl.data_produced
                        FROM livestock l
                        JOIN cadastru_livestock cl ON l.livestock_id = cl.livestock_id
                        WHERE cl.cadastru_id = $1
                    """)
                .bind(0, cadastruId)
                .map((row, meta) -> new LivestockDTO(
                        row.get("livestock_id", Long.class),
                        row.get("livestock_name", String.class),
                        row.get("quantity", Integer.class),
                        row.get("contaminated", Double.class),
                        row.get("data_produced", LocalDateTime.class)
                ))
                .all();
    }


    public Flux<CadastruCropDTO> findByCropName(String cropName) {
        String sql = """
                SELECT 
                    c.cadastru_id,
                    c.user_id,
                    c.raion_id,
                    c.hectare,
                    c.longitude,
                    c.latitude,
                    cr.crop_name,
                    cc.quantity,
                    cc.pesticide,
                    cc.data_produced
                FROM cadastru c
                JOIN cadastru_crop cc ON c.cadastru_id = cc.cadastru_id
                JOIN crop cr ON cr.crop_id = cc.crop_id
                WHERE cr.crop_name = $1
            """;

        return databaseClient.sql(sql)
                .bind(0, cropName)
                .map((row, metadata) -> new CadastruCropDTO(
                        row.get("cadastru_id", Long.class),
                        row.get("user_id", String.class),
                        row.get("raion_id", Long.class),
                        row.get("hectare", Long.class),
                        row.get("longitude", Double.class),
                        row.get("latitude", Double.class),
                        row.get("crop_name", String.class),
                        row.get("quantity", Integer.class),
                        row.get("pesticide", Double.class),
                        row.get("data_produced", LocalDateTime.class)
                ))
                .all();
    }


    public Flux<CadastruLivestockDTO> findByLivestockName(String livestockName) {
        String sql = """
        SELECT
            c.cadastru_id   AS cadastru_id,
            c.user_id       AS user_id,
            c.raion_id      AS raion_id,
            c.hectare       AS hectare,
            c.longitude     AS longitude,
            c.latitude      AS latitude,
            l.livestock_name AS livestock_name,
            cl.quantity     AS quantity,
            cl.contaminated AS contaminated,
            cl.data_produced AS data_produced
        FROM cadastru c
        JOIN cadastru_livestock cl ON c.cadastru_id = cl.cadastru_id
        JOIN livestock l ON l.livestock_id = cl.livestock_id
        WHERE l.livestock_name = $1
    """;

        return databaseClient.sql(sql)
                .bind(0, livestockName)
                .map((row, metadata) -> {
                    // Debug: see exactly what column names are visible
                    metadata.getColumnMetadatas()
                            .forEach(cm -> System.out.println("col: " + cm.getName()));

                    return new CadastruLivestockDTO(
                            row.get("cadastru_id", Long.class),
                            row.get("user_id", String.class),
                            row.get("raion_id", Long.class),
                            row.get("hectare", Long.class),
                            row.get("longitude", Double.class),
                            row.get("latitude", Double.class),
                            row.get("livestock_name", String.class),
                            row.get("quantity", Integer.class),
                            row.get("contaminated", Double.class),
                            row.get("data_produced", java.time.LocalDateTime.class)
                    );
                })
                .all();
    }


}
