package com.group50.dto;

import com.group50.entity.Admin;
import com.group50.entity.People;
import lombok.Data;

@Data
public class RegisterInfo {

    private Admin admin;

    private People people;
}
