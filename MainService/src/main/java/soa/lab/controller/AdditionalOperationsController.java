package soa.lab.controller;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soa.lab.entity.Organization;
import soa.lab.service.OrganizationService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/")
public class AdditionalOperationsController {
    private final OrganizationService organizationService;

    @Autowired
    public AdditionalOperationsController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @DeleteMapping("/orgs/annualTurnover")
    public ResponseEntity<List<Organization>> deleteOrgsByAnnualTurnover(@RequestParam Float annualTurnover) {
        return new ResponseEntity<>(organizationService.deleteOrganizationsByAnnualTurnover(annualTurnover), HttpStatus.OK);
    }

    @GetMapping("/orgs/sum-annual-turnover")
    public ResponseEntity<Double> getSumOfOrganizationsByAnnualTurnover(){
        return new ResponseEntity<>(organizationService.getSumOfOrganizationsByAnnualTurnover(),HttpStatus.OK);
    }

    @GetMapping("/orgs/max-creation-date")
    public ResponseEntity<Organization> getTopByCreationDate() {
        return new ResponseEntity<>(organizationService.getTopByCreationDate(),HttpStatus.OK);

    }

}
