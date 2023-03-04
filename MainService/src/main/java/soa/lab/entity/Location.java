package soa.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import soa.lab.dto.LocationDTO;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Entity
@NoArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonIgnore
    private long id;

    @Column(name = "x", nullable = false)
    @NotNull
    private Float x;

    @Column(name = "y", nullable = false)
    @NotNull
    private double y;

    @Column(name = "z", nullable = false)
    @NotNull
    private Integer z;

    public Location(LocationDTO locationDTO) {
        this.x = locationDTO.getX();
        this.y = locationDTO.getY();
        this.z = locationDTO.getZ();
    }
}
