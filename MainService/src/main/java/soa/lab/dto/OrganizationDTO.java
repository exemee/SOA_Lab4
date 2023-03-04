package soa.lab.dto;

import lombok.Data;

@Data
public class OrganizationDTO {
    private long id;
    private String name;
    private long employeesCount;
    private CoordinatesDTO coordinates;
    private java.time.ZonedDateTime creationDate;
    private double annualTurnover;
    private String type;
    private AddressDTO postalAddress;
}
