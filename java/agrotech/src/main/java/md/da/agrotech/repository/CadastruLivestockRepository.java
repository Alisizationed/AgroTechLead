package md.da.agrotech.repository;
import md.da.agrotech.entity.CadastruLivestock;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;

@Repository
public interface CadastruLivestockRepository extends ReactiveCrudRepository<CadastruLivestock, Long> {

    Flux<CadastruLivestock> findByCadastruId(Integer cadastruId);

    Flux<CadastruLivestock> findByLivestockId(Integer livestockId);

    Flux<CadastruLivestock> findByCadastruIdAndLivestockId(Integer cadastruId, Integer livestockId);

    Flux<CadastruLivestock> findByDataProducedBetween(LocalDateTime start, LocalDateTime end);

    Flux<CadastruLivestock> findByContaminatedGreaterThan(Float contaminated);
}
