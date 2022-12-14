package com.group50.service.Impl;

import com.alibaba.fastjson.JSON;
import com.group50.common.AdminThread;
import com.group50.common.ResultInfo;
import com.group50.dto.SmsMessage;
import com.group50.entity.Admin;
import com.group50.entity.People;
import com.group50.exception.CustomException;
import com.group50.repository.AdminRepository;
import com.group50.repository.PeopleRepository;
import com.group50.service.AdminService;
import com.group50.utils.SmsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private SmsUtil smsUtil;

    @Override
    public SmsMessage findAdmin(Admin admin) {

        //1.Accept incoming information from the front end (username, password)
        String username = admin.getAdminUsername();
        String password = admin.getAdminPassword();

        //2.validate
        Admin adminResult = adminRepository.findByAdminUsernameAndAdminPassword(username,password);

        //3.If incorrect return
        if(adminResult == null){
            throw new CustomException(ResultInfo.NON_EXIST_USER_CODE, ResultInfo.NON_EXIST_USER_MSG);
        }

        //4.If correct, return the captcha to the front end
        //4.1 Query a user's mobile number
        People peopleResult = peopleRepository.findPeopleByPeopleIdEquals(adminResult.getAdminPeopleId());
        String peoplePhone = peopleResult.getPeoplePhone();

        //4.2 Help it send the verification code
        //4.3 Return values are passed to the front end
        SmsMessage smsMessage = new SmsMessage();
        smsMessage.setCode(smsUtil.makeCode(peoplePhone));

        //4.4 Return the user that I found, and then store it in session for the next method call
        smsMessage.setPeople(peopleResult);

        return smsMessage;
    }

    @Override
    public int checkCode(SmsMessage smsMessage) {

        //1.Obtain the user verification code from the cache
        String codeFromCache = smsUtil.getSmsCodeFromCache(smsMessage.getPeople().getPeoplePhone());

        //2.Verify that the verification code is correct
        boolean equals = smsMessage.getCode().equals(codeFromCache);

        //3.Login failure returns 402 return code with error message
        if(!equals){
            throw new CustomException(ResultInfo.WRONG_PHONE_VERIFICATION_CODE,ResultInfo.WRONG_PHONE_VERIFICATION_MSG);
        }

        //4.The login succeeds, the user is stored in session, and the interceptor is set. Go to the interceptor handler and set its user id to the thread.
        Admin admin = adminRepository.findAdminByAdminPeopleIdEquals(smsMessage.getPeople().getPeopleId());

        //5.Returns the administrator's id to the controller layer, where it is loaded into the session
        return admin.getAdminId();

    }

    @Override
    public String registerAdmin(String registerDetail) {

        Admin admin = JSON.parseObject(registerDetail, Admin.class);
        People people = JSON.parseObject(registerDetail, People.class);
        
        //1.Query tb_admin. If username exists, returne 404
        Admin tempAdmin = adminRepository.findAdminByAdminUsernameEquals(admin.getAdminUsername());
        if(tempAdmin != null){
            throw new CustomException(ResultInfo.EXIST_USERNAME_CODE, ResultInfo.EXIST_USERNAME_MSG);
        }

        //2.Query tb_people. If Phone exists, return 405
        People tempPeopleOne = peopleRepository.findPeopleByPeoplePhoneEquals(people.getPeoplePhone());
        if(tempPeopleOne != null){
            throw new CustomException(ResultInfo.EXIST_PHONE_CODE, ResultInfo.EXIST_PHONE_MSG);
        }

        //3.Query tb_people. If the Email store exists, return 406
        People tempPeopleTwo = peopleRepository.findPeopleByPeopleEmailEquals(people.getPeopleEmail());
        if(tempPeopleTwo != null){
            throw new CustomException(ResultInfo.EXIST_EMAIL_CODE, ResultInfo.EXIST_EMAIL_MSG);
        }

        //4.new people record
        People newPeople = peopleRepository.save(people);

        //5.Get the id of the new people as a foreign key for admin
        int newPeopleId = newPeople.getPeopleId();
        admin.setAdminPeopleId(newPeopleId);

        //6.Add an admin record
        Admin newAdmin = adminRepository.save(admin);

        return "register successful";
    }

    @Override
    public People searchAdminInfo(int adminId) {
        Admin admin = adminRepository.findAdminByAdminIdEquals(adminId);
        return peopleRepository.findPeopleByPeopleIdEquals(admin.getAdminPeopleId());
    }


    @Override
    public String updateAdmin(String updateDetail) {
        Admin admin = JSON.parseObject(updateDetail, Admin.class);
        People people = JSON.parseObject(updateDetail, People.class);

        

        //check see if the new name is same as old name, return 407 if yes 
        Admin tempAdmin = adminRepository.findAdminByAdminPeopleIdEquals(admin.getAdminPeopleId());
        
        String adminUsername = tempAdmin.getAdminUsername();
        
        System.out.println(adminUsername);
        //get the people ID for target user
        Integer peopleID = tempAdmin.getAdminPeopleId();
        if(adminUsername.equals(admin.getAdminUsername())){
            throw new CustomException(ResultInfo.SAME_NAME_CODE, ResultInfo.SAME_USERNAME_MSG);
        }

        //check see if the phone is same as old phone number, return 408 if yes 
        People tempPeople = peopleRepository.findPeopleByPeopleIdEquals(peopleID);
        String peoplePhone = tempPeople.getPeoplePhone();
        if(peoplePhone.equals(people.getPeoplePhone())){
            throw new CustomException(ResultInfo.SAME_PHONE_CODE, ResultInfo.SAME_PHONE_MSG);
        }
        //check see if the email is same as old email address, return 409 if yes
        String peopleEmail = tempPeople.getPeopleEmail();
        if(peopleEmail.equals(people.getPeopleEmail())){
            throw new CustomException(ResultInfo.SAME_EMAIL_CODE, ResultInfo.SAME_EMAIL_MSG);
        }

        //check see if the password is same as old password, return 410 if yes
        String peoplePass = tempAdmin.getAdminPassword();
        if(peoplePass.equals(admin.getAdminPassword())){
            throw new CustomException(ResultInfo.SAME_PASS_CODE, ResultInfo.SAME_PASS_MSG);
        }

        //update user name
        tempAdmin.setAdminUsername(admin.getAdminUsername());
        tempAdmin.setAdminPassword(admin.getAdminPassword());

        Admin updateAdmin = adminRepository.save(tempAdmin);

        //update profile
        tempPeople.setPeoplePhone(people.getPeoplePhone());
        tempPeople.setPeopleEmail(people.getPeopleEmail());

        People updatePeople  = peopleRepository.save(tempPeople);

        return "update successful";
    }


}
