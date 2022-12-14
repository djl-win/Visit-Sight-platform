package com.group50.service;

import com.group50.dto.HistoryVisitRecord;

import java.util.List;

//@Transactional(timeout = -1, rollbackFor = {Exception.class, CustomException.class})
public interface VisitService {

    void testThread();

    /**
     * Simulate the visitor's visit operation
     */
    void visitorsAccessSimulation() throws InterruptedException;

    /**
     * Query the traffic within the last 7 days
     * @return Return data list（2022-02-02 38）
     */
    List<HistoryVisitRecord> findSevenDaysFlow();

    /**
     * Query the venue's traffic within 7 days
     * @return Return data list（2022-02-02 38）
     */
    List<HistoryVisitRecord> findSevenDaysFlowVenue(int venueId);

    /**
     * Query the real-time number of people in the museum
     * @return Return real-time number of people
     */
    int findMuseumRealtimeFlow();

    /**
     * Query the real-time number of people in the three venues
     * @return List(venue, number of persons)
     */
    List<HistoryVisitRecord> findEachVenueFlow();

    /**
     * Query the total number of museum visitors on that day
     * @return Returns total number of visitors for the day
     */
    int searchMuseumTotalFlow();

    /**
     * To query the total number of visitors to the museum on that day
     * @return List(venue, number of persons)
     */
    List<HistoryVisitRecord> searchTotalFlowInEachVenue();

    /**
     * Query the total number of historical museum visitors
     * @return Returns the historical total number of visitors
     */
    int searchAllDaysFlowInMuseum();

    /**
     * Query the total number of historical visitors of each venue
     * @return List(venue, number of persons)
     */
    List<HistoryVisitRecord> searchAllDaysFlowInEachVenue();

    /**
     * Querying Museum Capacity
     * @return capacity
     */
    int searchMuseumCapacity();

    /**
     * Query the capacity of museums
     * @return capacity
     */
    int searchMuseumCapacityInWhichVenue(int venueId);

    /**
     *
     * @param venueId
     * @param startTime
     * @param endTime
     * @return
     */
    List<HistoryVisitRecord> searchVenueRecord(int venueId, String startTime, String endTime);
}
