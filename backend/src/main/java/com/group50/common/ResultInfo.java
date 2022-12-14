package com.group50.common;

public class ResultInfo {
    public static final Integer UNKNOWN_CODE = 100;
    public static final Integer SUCCESS_CODE = 200;
    public static final Integer FAIL_CODE = 400;
    public static final Integer NON_EXIST_USER_CODE = 401;
    public static final Integer WRONG_PHONE_VERIFICATION_CODE = 402;
    public static final Integer NON_LOGIN_CODE = 403;
    public static final Integer EXIST_USERNAME_CODE = 404;
    public static final Integer EXIST_PHONE_CODE = 405;
    public static final Integer EXIST_EMAIL_CODE = 406;
    public static final Integer SAME_NAME_CODE = 407;
    public static final Integer SAME_PHONE_CODE = 408;
    public static final Integer SAME_EMAIL_CODE = 409;
    public static final Integer SAME_PASS_CODE = 410;

    public static final String UNKNOWN_MSG = "Unknown exception, contact jiale";
    public static final String SUCCESS_MSG = "Success";
    public static final String FAIL_MSG = "Fail";
    public static final String NON_EXIST_USER_MSG = "This user does not exist, please check your username or password first";
    public static final String WRONG_PHONE_VERIFICATION_MSG = "Wrong verification code, please enter again";
    public static final String NON_LOGIN_MSG = "You should first login";
    public static final String EXIST_USERNAME_MSG = "The username already exists. Please enter a new one";
    public static final String EXIST_PHONE_MSG = "The phone already exists. Please enter a new one";
    public static final String EXIST_EMAIL_MSG = "The E-mail already exists. Please enter a new one";
    public static final String SAME_USERNAME_MSG = "The username same as before, choose another one";
    public static final String SAME_PHONE_MSG = "The phone same as before, choose another one";
    public static final String SAME_EMAIL_MSG = "The E-mail same as before, choose another one";
    public static final String SAME_PASS_MSG = "The password same as before, choose another one";
}
