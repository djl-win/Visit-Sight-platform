package com.group50.dto;

import java.util.Date;

import lombok.Data;

@Data
public class VisitorRecord {
    private Integer id;
    private String name;
    private Integer gender;
    private Integer age;
    private String email;
    private String phone;
    private String date;

}
