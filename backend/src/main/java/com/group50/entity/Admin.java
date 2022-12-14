package com.group50.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tb_admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Integer adminId;

    @Column(name = "admin_username")
    private String adminUsername;

    @Column(name = "admin_password")
    private String adminPassword;

    @Column(name = "admin_peopleId")
    private Integer adminPeopleId;

}
