package com.group50.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tb_visitor")
public class Visitor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visitor_id")
    private Integer visitorId;

    @Column(name = "visitor_visitTimes")
    private int visitorVisitTimes;

    @Column(name = "visitor_peopleId")
    private int visitorPeopleId;



}
