package com.group50.service.Impl;

import com.alibaba.fastjson.JSON;
import com.group50.dto.HistoryVisitRecord;
import com.group50.entity.Visit;
import com.group50.entity.Visitor;
import com.group50.repository.VenueRepository;
import com.group50.repository.VisitRepository;
import com.group50.service.VisitService;
import com.group50.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class VisitServiceImpl implements VisitService {

    @Autowired
    private VisitRepository visitRepository;

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private VisitorService visitorService;

    @Override
    public void testThread() {

        try {
            Thread.sleep(40000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Service current thread is " + Thread.currentThread().getName());
    }

    /**
     * SELECT count(*) FROM `tb_visit`
     * where  visit_status = 0 and date(visit_date) = curdate()
     * GROUP BY visit_venueId
     * @throws InterruptedException thread exception
     */
    @Override
    public void visitorsAccessSimulation() throws InterruptedException {
        int venue1Capacity = venueRepository.findVenueByVenueIdEquals(1).getVenueCapacity();
        int venue2Capacity = venueRepository.findVenueByVenueIdEquals(2).getVenueCapacity();
        int venue3Capacity = venueRepository.findVenueByVenueIdEquals(3).getVenueCapacity();
        int venue1CurrentFlow = 20;
        int venue2CurrentFlow = 20;
        int venue3CurrentFlow = 20;
        int totalCapacity = venue1Capacity + venue2Capacity + venue3Capacity;
        int totalCurrentFlow = venue1CurrentFlow + venue2CurrentFlow + venue3CurrentFlow;

        //A combination of three venues, one of the 13, one of the 23
        int[] case1 = {2, 3};
        int[] case2 = {1, 3};
        int[] case3 = {1, 2};

        //1.Add 1-20 pieces of visitor data (plus judgment, stop inserting when the number of visitors reaches the upper limit)
        ArrayList<Visitor> visitors = visitorService.newFakeVisitors();

        //2.Add so many access records, randomly enter a venue 1-3 (plus judgment, the number of people to reach a venue, will no longer enter, enter other venues)
        ArrayList<Visit> firstAccess = new ArrayList<Visit>();

        for (Visitor visitor : visitors) {

            Visit visit = new Visit();
            visit.setVisitVisitorId(visitor.getVisitorId());

            //Add judgement, THE number of people to reach the line will no longer enter this venue, enter the other two venues, here first random
            visit.setVisitVenueId((int) (Math.random() * 3 + 1));
            visit.setVisitDate(new Date());
            visit.setVisitDuration(20);
            visit.setVisitStatus(1);
            firstAccess.add(visit);
        }

        List<Visit> visits = visitRepository.saveAll(firstAccess);

        //3.Wait for 20s(Leave the venue, the status of visitor is set to 0)
        Thread.sleep(20000);

        for (Visit visit : visits) {
            visit.setVisitStatus(0);
        }

        List<Visit> visitsFirst = visitRepository.saveAll(visits);

        //4.These visitors enter another venue (plus the judgement that when the number of people reaches the maximum of one venue, they will not enter and enter another venue)
        ArrayList<Visit> secondAccess = new ArrayList<Visit>();

        for (Visit temp : visitsFirst) {

            //Data recorded for the first access
            Visit visitSecond = new Visit();
            visitSecond.setVisitVisitorId(temp.getVisitVisitorId());

            //Decide which venue to enter, enter a different venue than before
            if (temp.getVisitVenueId() == 1) {
                visitSecond.setVisitVenueId(case1[(int) (Math.random() * 2)]);
            } else if (temp.getVisitVenueId() == 2) {
                visitSecond.setVisitVenueId(case2[(int) (Math.random() * 2)]);
            } else if (temp.getVisitVenueId() == 3) {
                visitSecond.setVisitVenueId(case3[(int) (Math.random() * 2)]);
            } else {
                //After an error, set it to 9999
                visitSecond.setVisitVenueId(9999);
            }

            visitSecond.setVisitDate(new Date());
            visitSecond.setVisitDuration(20);
            visitSecond.setVisitStatus(1);
            secondAccess.add(visitSecond);
        }

        List<Visit> visitsSecond = visitRepository.saveAll(secondAccess);

        //5.Wait for 20s(Leave the venue, the status of visitor logs is set to 0)
        Thread.sleep(20000);

        for (Visit visit : visitsSecond) {
            visit.setVisitStatus(0);
        }

        visitRepository.saveAll(visitsSecond);
    }

    /* Query the total museum traffic within 7 days */
    @Override
    public List<HistoryVisitRecord> findSevenDaysFlow() {
        List<Map<String, String>> sevenDaysFlow = visitRepository.findSevenDaysFlow();
        String s = JSON.toJSONString(sevenDaysFlow);
        return JSON.parseArray(s, HistoryVisitRecord.class);
    }

    /* Query the venue traffic within 7 days */
    @Override
    public List<HistoryVisitRecord> findSevenDaysFlowVenue(int venueId) {
        List<Map<String, String>> sevenDaysFlow = visitRepository.findSevenDaysFlowVenue(venueId);
        String s = JSON.toJSONString(sevenDaysFlow);
        return JSON.parseArray(s, HistoryVisitRecord.class);
    }

    /* Query the museum's real-time traffic */
    @Override
    public int findMuseumRealtimeFlow(){
        return visitRepository.findAllByVisitStatusAndVisitDate();
    }

    /* Query the real-time traffic of each venue */
    @Override
    public List<HistoryVisitRecord> findEachVenueFlow(){
        List<Map<String, String>> venuesFlow = visitRepository.findRealtimePeopleInEachVenue();
        String s = JSON.toJSONString(venuesFlow);
        return JSON.parseArray(s, HistoryVisitRecord.class);
    }

    /* Query the total flow of the museum on that day */
    @Override
    public int searchMuseumTotalFlow() {
        return visitRepository.findTodayTotalFlow();
    }

    @Override
    public List<HistoryVisitRecord> searchTotalFlowInEachVenue() {
        List<Map<String, String>> venuesFlow = visitRepository.findTotalFlowPeopleInEachVenue();
        String s = JSON.toJSONString(venuesFlow);
        return JSON.parseArray(s, HistoryVisitRecord.class);
    }

    @Override
    public int searchAllDaysFlowInMuseum() {
        return visitRepository.findAllDaysFlowInMuseum();
    }

    @Override
    public List<HistoryVisitRecord> searchAllDaysFlowInEachVenue() {
        List<Map<String, String>> venuesFlow = visitRepository.findAllDaysFlowInEachVenue();
        String s = JSON.toJSONString(venuesFlow);
        return JSON.parseArray(s, HistoryVisitRecord.class);
    }

    @Override
    public int searchMuseumCapacity() {
        int venue1Capacity = venueRepository.findVenueByVenueIdEquals(1).getVenueCapacity();
        int venue2Capacity = venueRepository.findVenueByVenueIdEquals(2).getVenueCapacity();
        int venue3Capacity = venueRepository.findVenueByVenueIdEquals(3).getVenueCapacity();
        return venue1Capacity+venue2Capacity+venue3Capacity;
    }

    @Override
    public int searchMuseumCapacityInWhichVenue(int venueId) {
        return venueRepository.findVenueByVenueIdEquals(venueId).getVenueCapacity();
    }

    @Override
    public List<HistoryVisitRecord> searchVenueRecord(int venueId, String startTime, String endTime) {

        List<Map<String, String>> sevenDaysFlow = visitRepository.findVenueRecordByTime(venueId, startTime, endTime);
        String s = JSON.toJSONString(sevenDaysFlow);
        return JSON.parseArray(s, HistoryVisitRecord.class);
    }

}
