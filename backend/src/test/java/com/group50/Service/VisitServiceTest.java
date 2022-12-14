package com.group50.Service;

import com.group50.dto.HistoryVisitRecord;
import com.group50.service.VisitService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
//@Transactional
public class VisitServiceTest {

    @Autowired
    private VisitService visitService;

    @Test
    public void testVisitorsAccessSimulation() throws InterruptedException {
//        visitService.visitorsAccessSimulation();
    }

    @Test
    public void testFindSevenDaysFlowVenue(){
        List<HistoryVisitRecord> sevenDaysFlowVenue = visitService.findSevenDaysFlowVenue(1);
        System.out.println(sevenDaysFlowVenue);

    }
}
