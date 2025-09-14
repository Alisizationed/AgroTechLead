package md.da.agrotech.repository;

import md.da.agrotech.entity.Cadastru;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface CadastruRepository extends ReactiveCrudRepository<Cadastru, Long> {

    Flux<Cadastru> findByUserId(String userId);

    Flux<Cadastru> findByRaionId(Integer raionId);

    Flux<Cadastru> findByUserIdAndRaionId(String userId, Integer raionId);

    Flux<Cadastru> findByHectareGreaterThan(Integer hectare);
}
