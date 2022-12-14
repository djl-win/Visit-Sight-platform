package com.group50.service;

import com.group50.dto.SmsMessage;
import com.group50.entity.Admin;
import com.group50.entity.Parkinglot;
import com.group50.exception.CustomException;
import org.springframework.transaction.annotation.Transactional;

@Transactional(timeout = -1, rollbackFor = {Exception.class, CustomException.class})
public interface ParkinglotService {

    /**
     * Query car Park information
     * @return Parking Lot Information
     */
    Parkinglot findParkinglot();

    /**
     * Modifying car park capacity
     *
     */
    void modifyCapacity(int capacity);
}
