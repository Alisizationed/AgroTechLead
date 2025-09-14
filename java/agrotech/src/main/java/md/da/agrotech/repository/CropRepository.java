package md.da.agrotech.repository;
import md.da.agrotech.DTO.CropDTO;
import md.da.agrotech.entity.Crop;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface CropRepository extends ReactiveCrudRepository<Crop, Integer> {

    Mono<Crop> findByCropName(String cropName);

    @Query("SELECT cr.crop_id AS cropId, cr.crop_name AS cropName, " +
            "cc.quantity AS quantity, cc.pesticide AS pesticide, cc.data_produced AS dataProduced " +
            "FROM Crop cr " +
            "JOIN cadastru_crop cc ON cr.crop_id = cc.crop_id " +
            "WHERE cc.cadastru_id = :cadastruId")
    Flux<CropDTO> findByCadastruId(Long cadastruId);
}