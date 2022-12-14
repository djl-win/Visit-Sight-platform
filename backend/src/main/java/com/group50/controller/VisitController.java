package com.group50.controller;

import com.group50.dto.HistoryVisitRecord;
import com.group50.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Query various information about access records
 */
@RestController
@RequestMapping("/visits")
public class VisitController {

    @Autowired
    private VisitService visitService;

    /**
     * Query information about access records. Query the traffic of the last 7 days
     * Get，address: http://localhost:8080/5619/visits/sevendays
     * {
     *     "date": "2022-10-02",
     *     "visitorNumber": 350,
     *     "venueId": null
     * },
     * {
     *      "date": "2022-10-03",
     *      "visitorNumber": 33,
     *      "venueId": null
     * }
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/sevendays")
    public List<HistoryVisitRecord> sevenDaysFlow(){
        return visitService.findSevenDaysFlow();
    }

    /**
     * Query the traffic of each venue in the last 7 days
     * Get，address: http://localhost:8080/5619/visits/sevendays/venue/#
     * {
     *     "date": "2022-10-02",
     *     "visitorNumber": 350,
     *     "venueId": null
     * },
     * {
     *      "date": "2022-10-03",
     *      "visitorNumber": 33,
     *      "venueId": null
     * }
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/sevendays/venue/{venueId}")
    public List<HistoryVisitRecord> sevenDaysFlowVenue(@PathVariable int venueId){
        return visitService.findSevenDaysFlowVenue(venueId);
    }




    /**
     * Query real-time traffic in the museum on that day
     * Get，address: http://localhost:8080/5619/visits/today/totalrealtimeflow
     * The data in data is the real-time number of people in the museum
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/today/totalrealtimeflow")
    public int todayTotalRealtimeFlow(){
        return visitService.findMuseumRealtimeFlow();
    }

    /**
     * Query the real-time traffic in each venue of the museum on that day
     * Get, address: http://localhost:8080/5619/visits/today/eachvenuerealtimeflow
     * {
     *       "date": null,
     *       "visitorNumber": 12,
     *       "venueId": "1"
     * },
     * {
     *        "date": null,
     *        "visitorNumber": 2,
     *        "venueId": "2"
     * },
     * {
     *         "date": null,
     *         "visitorNumber": 2,
     *         "venueId": "3"
     * }
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/today/eachvenuerealtimeflow")
    public List<HistoryVisitRecord> todayEachVenueRealtimeFlow(){
        return visitService.findEachVenueFlow();
    }



    /**
     * Query the total flow of the museum on that day (not real time, total)
     * Get，address: http://localhost:8080/5619/visits/today/totalflow
     * The data inside is the total number of people in the museum
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/today/totalflow")
    public int todayTotalFlow(){
        return visitService.searchMuseumTotalFlow();
    }

    /**
     * Query the total flow rate of each venue in the museum on that day (not real time, count as total)
     * Get，address: http://localhost:8080/5619/visits/today/eachvenuetotalflow
     * {
     *    "date": null,
     *    "visitorNumber": 127,
     *    "venueId": "1"
     * },
     * {
     *     "date": null,
     *     "visitorNumber": 115,
     *     "venueId": "2"
     *  },
     *  {
     *      "date": null,
     *      "visitorNumber": 116,
     *      "venueId": "3"
     *   }
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/today/eachvenuetotalflow")
    public List<HistoryVisitRecord> todayEachVenueTotalFlow(){
        return visitService.searchTotalFlowInEachVenue();
    }

    /**
     * Query all access traffic in the museum's history
     * Get，address: http://localhost:8080/5619/visits/alldays/museumflow
     * The data in data refers to the total number of visitors to the museum in history
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/alldays/museumflow")
    public int allDaysMuseumFlow(){
        return visitService.searchAllDaysFlowInMuseum();
    }

    /**
     * Query the history of the museum all all access traffic of each venue
     * Get，address: http://localhost:8080/5619/visits/alldays/eachvenueflow
     * {
     *     "date": null,
     *     "visitorNumber": 577,
     *     "venueId": "1"
     *  },
     *  {
     *      "date": null,
     *      "visitorNumber": 549,
     *      "venueId": "2"
     *   },
     *   {
     *       "date": null,
     *       "visitorNumber": 573,
     *       "venueId": "3"
     *    }
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/alldays/eachvenueflow")
    public List<HistoryVisitRecord> allDaysEachVenueFlow(){
        return visitService.searchAllDaysFlowInEachVenue();
    }


    /**
     * Query the museum's capacity
     * Get，address: http://localhost:8080/5619/visits/capacity
     * The data in data is the museum capacity
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/capacity")
    public int museumCapacity(){
        return visitService.searchMuseumCapacity();
    }

    /**
     * Query the capacity of the museum
     * Get，address: http://localhost:8080/5619/visits/capacity/#
     * The data in data refers to the capacity of each venue in the museum
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/capacity/{venueId}")
    public int museumCapacityInVenue(@PathVariable int venueId){
        return visitService.searchMuseumCapacityInWhichVenue(venueId);
    }

    /**
     *
     * @param map
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @RequestMapping("/search/record")
    @ResponseBody
    public List<HistoryVisitRecord> searchRecordByTime(@RequestBody Map<String, String> map)
    {
        int venueId = 1;
        String startTime = "",endTime = "";
        if (map.containsKey("venueId")){
            venueId = Integer.valueOf(map.get("venueId"));
        }
        if (map.containsKey("startTime")){
            startTime = map.get("startTime");
        }
        if (map.containsKey("endTime")){
            endTime = map.get("endTime");
        }

        return visitService.searchVenueRecord(venueId, startTime, endTime);
    }
}
