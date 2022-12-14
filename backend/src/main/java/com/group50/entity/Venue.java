package com.group50.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tb_venue")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venue_id")
    private Integer venueId;

    @Column(name = "venue_name")
    private String venueName;

    @Column(name = "venue_location")
    private String venueLocation;

    @Column(name = "venue_description")
    private String venueDescription;

    @Column(name = "venue_capacity")
    private int venueCapacity;

}
