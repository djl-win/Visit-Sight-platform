package com.group50.handler;

import com.group50.common.AdminThread;
import com.group50.common.ResultInfo;
import com.group50.exception.CustomException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * intercept user login operations
 */
@Component
public class SpringHandlerLogin implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("intercept login");

        HttpSession session = request.getSession();

        Object adminId = session.getAttribute("adminId");

        if(adminId == null){
            //Successful interception returns an error message or a redirect
//            response.sendRedirect(request.getContextPath()+"/pages/mIndex.html");
            throw new CustomException(ResultInfo.NON_LOGIN_CODE,ResultInfo.NON_LOGIN_MSG);
        }
        //Load the administrator id to the thread
//        AdminThread.setCurrentId((Long)adminId);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
