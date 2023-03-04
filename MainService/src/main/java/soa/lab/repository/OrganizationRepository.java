package soa.lab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import soa.lab.entity.Organization;
import soa.lab.entity.OrganizationType;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long>, JpaSpecificationExecutor<Organization> {

    @Query("select sum(o.annualTurnover) from Organization as o")
    Double getSumOfOrganizationsByAnnualTurnover();

    @Query("select o from Organization as o where o.creationDate = (select max(o.creationDate) from Organization as o)")
    Optional<Organization> getTopByCreationDate();

    List<Organization> deleteOrganizationsByAnnualTurnoverEquals(double annualTurnover);
}
