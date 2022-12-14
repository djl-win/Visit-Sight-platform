package com.group50.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tb_people")
public class People {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "people_id")
    private Integer peopleId;

    @Column(name = "people_name")
    private String peopleName;

    @Column(name = "people_gender")
    private int peopleGender;

    @Column(name = "people_age")
    private int peopleAge;

    @Column(name = "people_email")
    private String peopleEmail;

    @Column(name = "people_phone")
    private String peoplePhone;

}
