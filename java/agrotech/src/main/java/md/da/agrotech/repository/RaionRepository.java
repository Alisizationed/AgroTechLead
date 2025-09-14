package md.da.agrotech.repository;

import md.da.agrotech.entity.Raion;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RaionRepository extends ReactiveCrudRepository<Raion, Long> {
}
