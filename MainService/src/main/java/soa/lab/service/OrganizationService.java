package soa.lab.service;

import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import soa.lab.entity.Organization;
import soa.lab.entity.OrganizationType;
import soa.lab.exception.DataNotFoundException;
import soa.lab.repository.OrganizationRepository;
import soa.lab.rsql.CustomRsqlVisitor;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    @Autowired
    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public List<Organization> getOrgs(Integer page, Integer size, String filter, String sort) {
        if (filter == null || filter.isEmpty()) {
            if (page == null || size == null) {
                if (sort == null || sort.isEmpty())
                    return organizationRepository.findAll();
                List<Sort.Order> sortParameters = getSortParameters(sort);
                return organizationRepository.findAll(Sort.by(sortParameters));
            }
            if (sort == null || sort.isEmpty())
                return organizationRepository.findAll(PageRequest.of(page, size)).toList();
            List<Sort.Order> sortParameters = getSortParameters(sort);
            return organizationRepository.findAll(PageRequest.of(page, size, Sort.by(sortParameters))).toList();
        }
        Node rootNode = new RSQLParser().parse(filter);
        Specification<Organization> spec = rootNode.accept(new CustomRsqlVisitor<>());
        if (page == null || size == null) {
            if (sort == null || sort.isEmpty()) return organizationRepository.findAll(spec);
            List<Sort.Order> sortParameters = getSortParameters(sort);
            return organizationRepository.findAll(spec, Sort.by(sortParameters));
        }
        if (sort == null || sort.isEmpty())
            return organizationRepository.findAll(spec, PageRequest.of(page, size)).toList();
        List<Sort.Order> sortParameters = getSortParameters(sort);
        return organizationRepository.findAll(spec, PageRequest.of(page, size, Sort.by(sortParameters))).toList();
    }

    private List<Sort.Order> getSortParameters(String sort) {
        return Arrays.stream(sort.split(";"))
                .map(x -> new Sort.Order(Sort.Direction.valueOf(x.split(",")[1].toUpperCase()), x.split(",")[0]))
                .collect(Collectors.toList());
    }

    public Organization getOrgById(Long id) {
        return organizationRepository.findById(id).orElseThrow(() -> new DataNotFoundException(String.format("Organization with id %d not found", id)));
    }

    public Organization addOrg(Organization org) {
        return organizationRepository.save(org);
    }

    public Organization updateOrg(Long id, Organization orgUpd) {
        return organizationRepository.findById(id)
                .map(org -> {
                    org.setName(orgUpd.getName());
                    org.getCoordinates().setX(orgUpd.getCoordinates().getX());
                    org.getCoordinates().setY(orgUpd.getCoordinates().getY());
                    org.setCreationDate(orgUpd.getCreationDate());
                    org.setAnnualTurnover(orgUpd.getAnnualTurnover());
                    org.setEmployeesCount(orgUpd.getEmployeesCount());
                    org.setType(orgUpd.getType());
                    org.getPostalAddress().getTown().setX(orgUpd.getPostalAddress().getTown().getX());
                    org.getPostalAddress().getTown().setY(orgUpd.getPostalAddress().getTown().getY());
                    org.getPostalAddress().getTown().setZ(orgUpd.getPostalAddress().getTown().getZ());
                    org.getPostalAddress().setStreet(orgUpd.getPostalAddress().getStreet());
                    return organizationRepository.save(org);
                })
                .orElseGet(() -> {
                    orgUpd.setId(id);
                    return organizationRepository.save(orgUpd);
                });
    }

    public Organization deleteOrgById(Long id) {
        Organization organization = getOrgById(id);
        organizationRepository.deleteById(id);
        return organization;
    }



    public double getSumOfOrganizationsByAnnualTurnover(){
        return organizationRepository.getSumOfOrganizationsByAnnualTurnover();
    }

    @Transactional
    public List<Organization> deleteOrganizationsByAnnualTurnover(double annualTurnover) {
        List<Organization> organizations = organizationRepository.deleteOrganizationsByAnnualTurnoverEquals(annualTurnover);
        if (organizations.isEmpty()) throw new DataNotFoundException("Organization not found");
        return organizations;
    }

    public Organization getTopByCreationDate() {
        return organizationRepository.getTopByCreationDate().orElseThrow(() -> new DataNotFoundException("Organization not found"));
    }
}
