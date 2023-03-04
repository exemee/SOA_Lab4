package soa.lab.dto;

import lombok.Data;

@Data
public class AddressDTO {
    private String street;
    private LocationDTO town;
}
