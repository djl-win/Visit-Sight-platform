package com.group50.config;

import com.group50.handler.SpringHandlerLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Handling operations such as interceptors (which are written in handler)
 */
@Configuration
public class SpringMvcSupport implements WebMvcConfigurer {

    @Autowired
    private SpringHandlerLogin springHandlerLogin;


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(springHandlerLogin)
//                .addPathPatterns("/**")
//                .excludePathPatterns("/pages/index.html");
    }


}
