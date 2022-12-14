package com.group50.repository;

import com.group50.dto.HistoryVisitRecord;
import com.group50.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface VisitRepository  extends JpaRepository<Visit, Integer>, JpaSpecificationExecutor<Visit> {

    /**
     * Query the data of the last 7 days
     * @return List (data, date)
     */
    @Query(value ="SELECT DATE_FORMAT( b.visit_date, '%Y-%m-%d' ) as date, count(DISTINCT b.visit_visitorId) as visitorNumber\n" +
            "\n" +
            "FROM\n" +
            "\n" +
            "( SELECT  * FROM tb_visit a\n" +
            "\n" +
            "WHERE DATE_SUB( CURDATE( ), INTERVAL 7 DAY ) <= date(a.visit_date)\n" +
            "\n" +
            ") b\n" +
            "\n" +
            "GROUP BY\n" +
            "\n" +
            "date;",nativeQuery = true)
    List<Map<String,String>> findSevenDaysFlow();

    /**
     * Query venue data within 7 days
     * @return List (data, date)
     */
    @Query(value ="SELECT DATE_FORMAT( b.visit_date, '%Y-%m-%d' ) as date, count(DISTINCT b.visit_visitorId) as visitorNumber\n" +
            "\n" +
            "FROM\n" +
            "\n" +
            "( SELECT  * FROM tb_visit a\n" +
            "\n" +
            "WHERE a.visit_venueid = :venueId and DATE_SUB( CURDATE( ), INTERVAL 7 DAY ) <= date(a.visit_date)\n" +
            "\n" +
            ") b\n" +
            "\n" +
            "GROUP BY\n" +
            "\n" +
            "date;",nativeQuery = true)
    List<Map<String,String>> findSevenDaysFlowVenue(@Param("venueId")int venueId);


    /**
     * Query the real-time number of people in the museum
     * @return Return real-time number of people
     */
    @Query(value ="SELECT count(*)  FROM `tb_visit`\n" +
            "where visit_status = 1 and date(visit_date) = curdate()",nativeQuery = true)
    int findAllByVisitStatusAndVisitDate();

    /**
     * Query the real-time number of people in the three venues
     * @return List (venue, number of persons)
     */
    @Query(value="SELECT count(*) as visitorNumber, visit_venueId as venueId FROM `tb_visit`\n" +
            "where  visit_status = 1 and date(visit_date) = curdate()\n" +
            "GROUP BY visit_venueId",nativeQuery = true)
    List<Map<String,String>> findRealtimePeopleInEachVenue();

    /**
     * Query the total number of museum visitors on that day
     * @return Returns total number of visitors for the day
     */
    @Query(value = "SELECT count(DISTINCT visit_visitorId) FROM `tb_visit`\n" +
            "where date(visit_date) = curdate()\n", nativeQuery = true)
    int findTodayTotalFlow();

    /**
     * Check today's total attendance at the three venues
     * @return List (venue, number of persons)
     */
    @Query(value="SELECT count(DISTINCT visit_visitorId) as visitorNumber,visit_venueId as venueId FROM tb_visit\n" +
            "where date(visit_date) = curdate()\n" +
            "GROUP BY visit_venueId",nativeQuery = true)
    List<Map<String,String>> findTotalFlowPeopleInEachVenue();

    /**
     * Query the total number of historical museum visitors
     * @return Returns the historical total number of visitors
     */
    @Query(value = "SELECT count(DISTINCT visit_visitorId)\n" +
            "FROM tb_visit\n",nativeQuery = true)
    int findAllDaysFlowInMuseum();

    /**
     * Query the total number of historical visitors of each venue
     * @return List (venue, number of persons)
     */
    @Query(value="SELECT count(DISTINCT visit_visitorId) as visitorNumber, visit_venueId as venueId\n" +
            "FROM tb_visit\n" +
            "GROUP BY visit_venueId\n",nativeQuery = true)
    List<Map<String,String>> findAllDaysFlowInEachVenue();

    /**
     *
     * @param venueId
     * @param startTime
     * @param endTime
     * @return
     */
    @Query(value ="SELECT DATE_FORMAT( b.visit_date, '%Y-%m-%d' ) as date, count(DISTINCT b.visit_visitorId) as visitorNumber\n" +
            "\n" +
            "FROM\n" +
            "\n" +
            "( SELECT  * FROM tb_visit a\n" +
            "\n" +
            "WHERE a.visit_venueid = :venueId " +
            "and date(a.visit_date) >= date(:startTime) and date(a.visit_date) <= date(:endTime)\n" +
            "\n" +
            ") b\n" +
            "\n" +
            "GROUP BY\n" +
            "\n" +
            "date;",nativeQuery = true)
    List<Map<String, String>> findVenueRecordByTime(@Param("venueId")int venueId, @Param("startTime")String startTime, @Param("endTime")String endTime);
}
