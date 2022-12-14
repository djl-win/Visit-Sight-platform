package com.group50.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "tb_visit")
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visit_id")
    private Integer visitId;

    @Column(name = "visit_visitorId")
    private int visitVisitorId;

    @Column(name = "visit_venueId")
    private int visitVenueId;

    @Column(name = "visit_date")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date visitDate;

    @Column(name = "visit_duration")
    private int visitDuration;

    @Column(name = "visit_status")
    private int visitStatus;
}
