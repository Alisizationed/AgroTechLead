package md.da.agrotech.repository;
import md.da.agrotech.entity.CadastruCrop;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;

@Repository
public interface CadastruCropRepository extends ReactiveCrudRepository<CadastruCrop, Long> {

    Flux<CadastruCrop> findByCadastruId(Integer cadastruId);

    Flux<CadastruCrop> findByCropId(Integer cropId);

    Flux<CadastruCrop> findByCadastruIdAndCropId(Integer cadastruId, Integer cropId);

    Flux<CadastruCrop> findByDataProducedBetween(LocalDateTime start, LocalDateTime end);

    Flux<CadastruCrop> findByQuantityGreaterThan(Integer quantity);
}
