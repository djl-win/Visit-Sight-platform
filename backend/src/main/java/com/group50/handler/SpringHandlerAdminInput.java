package com.group50.handler;

import com.group50.entity.Admin;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

/**
 * Checks user input for whitespace and trim it if so
 */
@Component
@Aspect
public class SpringHandlerAdminInput {

    /**
     * All methods pointcut
     */
    @Pointcut("execution(* com.*.service.AdminService.*(..))")
    private void loginPt(){};

    @Around("loginPt()")
    public Object TrimLoginInfo(ProceedingJoinPoint p) throws Throwable {
        Object[] args = p.getArgs();

        for (Object arg : args) {
            if (arg.getClass().equals(Admin.class)) {

                Admin input = (Admin) arg;
//                System.out.println(input.getAdminUsername());
                if (input.getAdminUsername() != null && input.getAdminPassword() != null) {
                    input.setAdminUsername(input.getAdminUsername().trim());
                    input.setAdminPassword(input.getAdminPassword().trim());
                }
//                System.out.println(input.getAdminUsername());
            }


        }

        return p.proceed(args);
    }
}
