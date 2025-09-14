package md.da.agrotech.repository;
import md.da.agrotech.DTO.LivestockDTO;
import md.da.agrotech.entity.Livestock;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface LivestockRepository extends ReactiveCrudRepository<Livestock, Long> {

    Mono<Livestock> findByLivestockName(String livestockName);

    @Query("SELECT l.livestock_id AS livestockId, l.livestock_name AS livestockName, " +
            "cl.quantity AS quantity, cl.contaminated AS contaminated, cl.data_produced AS dataProduced " +
            "FROM Livestock l " +
            "JOIN cadastru_livestock cl ON l.livestock_id = cl.livestock_id " +
            "WHERE cl.cadastru_id = :cadastruId")
    Flux<LivestockDTO> findByCadastruId(Long cadastruId);

}