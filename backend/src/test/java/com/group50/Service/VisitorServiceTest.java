package com.group50.Service;

import com.group50.service.VisitorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
//@Transactional
public class VisitorServiceTest {

    @Autowired
    private VisitorService visitorService;

    @Test
    public void testNewFakeVisitor(){
        visitorService.newFakeVisitors();
    }
}
