package com.group50.controller;

import com.group50.dto.SmsMessage;
import com.group50.entity.Admin;
import com.group50.entity.People;
import com.group50.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    /**
     * PUT，address: http://localhost:8080/5619/admins/login
     * {
     *    "adminUsername" : "admin",
     *    "adminPassword" : "admin"
     * }
     * @param admin For the json format of the username and password, see the interface documentation
     * @return If user verification is correct, 200 return code and login verification code are returned. Username error returns 401 code. Unknown exception returns 100 code.
     */
    @PutMapping("/login")
    public String adminLogin(@RequestBody Admin admin, HttpServletRequest httpServletRequest){
        SmsMessage smsMessage = adminService.findAdmin(admin);
        //store phone to session
        HttpSession session = httpServletRequest.getSession();
        session.setAttribute("people", smsMessage.getPeople());
        return smsMessage.getCode();
    }

    /**
     * Get，address http://localhost:8080/5619/admins/login/verify/#
     * @param  code Verification code entered by the user
     * @return If the user enters a correct verification code, 200 is returned. If the verification code fails to be entered, code 402 is returned. Unknown exception returns 100 code.
     */
    @GetMapping("/login/verify/{code}")
    public Boolean adminLoginVerify(@PathVariable String code, HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        //get the phone in session
        People admin = (People) session.getAttribute("people");
        SmsMessage smsMessage = new SmsMessage();
        smsMessage.setPeople(admin);
        smsMessage.setCode(code);
        int adminId = adminService.checkCode(smsMessage);
        //After the login is successful, the user information is saved into the session, and the interceptor checks whether the attribute exists. If the attribute exists, the user id is saved into the thread, but not intercepted
        session.setAttribute("adminId",adminId);

        return true;
    }

    /**
     *
     * Post，address: http://localhost:8080/5619/admins/register
     * {
     *     "adminUsername" : "dongjiale",
     *     "adminPassword" : "dongjiale",
     *     "peopleName" : "dongjiale",
     *     "peopleGender" : 1,
     *     "peopleAge" : 23,
     *     "peopleEmail" : "395763745@qq.com",
     *     "peoplePhone" : "15542449708"
     * }
     * @param registerDetail User registration information in json format
     * @return 200 code is returned on successful registration. A 404 code is returned if the username already exists. Phone number already exists return 405 code. Mailbox already exists returns 406 code. Unknown exception returns 100 code.
     */
    @PostMapping("/register")
    public String adminRegister(@RequestBody String registerDetail){
        return adminService.registerAdmin(registerDetail);
    }

    /**
     * Get，address http://localhost:8080/5619/admins/adminInfo
     * @param httpServletRequest ###
     * @return Returns the personal information of the current login administrator, in the people table
     */
    @GetMapping("/adminInfo")
    public People adminSearch(HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        //get id from session
        int adminId = (int) session.getAttribute("adminId");
        return adminService.searchAdminInfo(adminId);
    }

    /**
     * 
     * Post，address: http://localhost:8080/5619/admins/update
     * {
     *     "adminUsername" : "dongjiale",
     *     "peopleEmail" : "395763745@qq.com",
     *     "peoplePhone" : "15542449708"     
     *     "adminPassword" : "dongjiale",
     * }
     * @param updateDetail User registration information in json format
     * @return update returns 200 code on success. Unknown exception returns 100 code.
     */
    @PostMapping("/update")
    public String adminUpdate(@RequestBody String updateDetail){
        return adminService.updateAdmin(updateDetail);
    }


}
