package soa.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import soa.lab.dto.CoordinatesDTO;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

@Data
@Entity
@NoArgsConstructor
public class Coordinates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonIgnore
    private long id;

    @Column(name = "x")
    private float x;

    @Column(name = "y", nullable = false)
    @DecimalMin(value = "-247", inclusive = false)
    @NotNull
    private long y;

    public Coordinates(CoordinatesDTO coordinatesDTO) {
        this.x = coordinatesDTO.getX();
        this.y = coordinatesDTO.getY();
    }
}
