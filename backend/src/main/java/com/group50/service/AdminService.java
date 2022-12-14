package com.group50.service;

import com.group50.dto.SmsMessage;
import com.group50.entity.Admin;
import com.group50.entity.People;
import com.group50.exception.CustomException;
import org.springframework.transaction.annotation.Transactional;

@Transactional(timeout = -1, rollbackFor = {Exception.class, CustomException.class})
public interface AdminService {

    /**
     * Check whether the user exists and send the verification code
     * @param admin admin info
     * @return Mobile verification code and mobile number
     */
    SmsMessage findAdmin(Admin admin);

    /**
     * Verify that the verification code entered by the user is correct
     * @param smsMessage User mobile phone number and verification code
     * @return id of the administrator
     */
     int checkCode(SmsMessage smsMessage);

    /**
     * There are two new operations, and if an exception is thrown after adding one in the same transaction, it will be rolled back.
     *
     * Register the administrator and check whether the user name, mobile phone number and email address exist
     * @param registerDetail User registration details
     * @return Registration success Information
     */
    String registerAdmin(String registerDetail);

    /**
     * Query the administrator in the current thread and return it to the front end
     * @param adminId id of the administrator
     * @return Details about the administrator
     */
    People searchAdminInfo(int adminId);

    /**
     *
     * Update the administrator's information and check whether the user name, mobile phone number and email address exist
     * @param updateDetail update detail
     * @return update success info
     */
    String updateAdmin(String updateDetail);
}
