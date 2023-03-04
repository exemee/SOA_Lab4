package soa.lab.endpoint;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import soa.lab.filter.FilterOrgsByEmployeesCountRequest;
import soa.lab.filter.FilterOrgsByEmployeesCountResponse;
import soa.lab.filter.FilterOrgsByTypeRequest;
import soa.lab.filter.FilterOrgsByTypeResponse;
import soa.lab.service.FilterService;

@Slf4j
@Endpoint
public class FilterEndpoint {
    private static final String NAMESPACE_URI = "http://soa/lab/filter";
    private final FilterService filterService;

    @Autowired
    public FilterEndpoint(FilterService filterService) {
        this.filterService = filterService;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "filterOrgsByTypeRequest")
    @ResponsePayload
    public FilterOrgsByTypeResponse filterOrgsByTurnover(@RequestPayload FilterOrgsByTypeRequest request) {
        FilterOrgsByTypeResponse response = new FilterOrgsByTypeResponse();
        log.info("Request to get orgs by type {}", request.getType());
        response.getOrgs().addAll(filterService.filterOrgsByType(request.getType()));
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "filterOrgsByEmployeesCountRequest")
    @ResponsePayload
    public FilterOrgsByEmployeesCountResponse filterOrgsByEmployeesCount(@RequestPayload FilterOrgsByEmployeesCountRequest request) {
        FilterOrgsByEmployeesCountResponse response = new FilterOrgsByEmployeesCountResponse();
        log.info("Request to get orgs between {} and {} employees count values", request.getMinEmployeesCount(), request.getMaxEmployeesCount());
        response.getOrgs().addAll(filterService.filterOrgsByEmployeesCount(request.getMinEmployeesCount(), request.getMaxEmployeesCount()));
        return response;
    }
}