package eCommerce.interfaces.product;

import eCommerce.entities.Demographic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemographicRepository extends JpaRepository<Demographic, Integer> {
}
