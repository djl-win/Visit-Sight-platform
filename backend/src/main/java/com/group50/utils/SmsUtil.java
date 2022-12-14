package com.group50.utils;

import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

@Component
public class SmsUtil {
    private final String[] match = {"000000","000000","0000","000","00","0",""};

    /**
     * If an error is reported, check to see if the user has detailed personal information, such as a cell phone number
     * @param tel user phone number
     * @return user verification code
     */
    public String generateCode(String tel){
        int hashcode = tel.hashCode();
        int encryptNumber = 47685460;
        long encryptResultFirstTime = hashcode ^ encryptNumber;
        long currentTime = System.currentTimeMillis();
        encryptResultFirstTime = encryptResultFirstTime ^ currentTime;
        long finalResult = encryptResultFirstTime % 1000000;
        finalResult = finalResult < 0 ? -finalResult : finalResult;
        String code = finalResult + "";
        int len = code.length();
        return match[len] + code;
    }

    /**
     * need to load to spring container
     * return null if not have relative value
     */
    @Cacheable(value = "SmsCodeSpace", key = "#telephone")
    public String getSmsCodeFromCache(String telephone){

        return null;
    }

    //Put the data in the cache and don't take it out (if there is a value in the space with key #tel, put it in or take it out)
    @CachePut(value = "SmsCodeSpace", key = "#telephone")
    public String makeCode(String telephone) {
        return generateCode(telephone);
    }

}
