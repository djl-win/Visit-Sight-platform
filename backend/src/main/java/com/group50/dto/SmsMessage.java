package com.group50.dto;

import com.group50.entity.People;
import lombok.Data;

/**
 * Class for user login information
 */
@Data
public class SmsMessage {

    private People people;

    private String code;
}
