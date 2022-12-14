package com.group50.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tb_parkinglot")
public class Parkinglot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parkinglot_id")
    private Integer parkinglotId;

    @Column(name = "parkinglot_location")
    private String parkinglotLocation;

    @Column(name = "parkinglot_capacity")
    private Integer parkinglotCapacity;

    @Column(name = "parkinglot_currentFlow")
    private Integer parkinglotCurrentFlow;
}
