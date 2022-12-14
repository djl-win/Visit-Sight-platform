package com.group50.repository;

import com.group50.entity.People;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface PeopleRepository extends JpaRepository<People, Integer> {

    /**
     * Query detailed information about people using the id of people
     * @param id peopleid
     * @return user info
     */
    People findPeopleByPeopleIdEquals(int id);

    /**
     * Use the people phone to query details about people
     * @param peoplePhone user phone number
     * @return user info
     */
    People findPeopleByPeoplePhoneEquals(String peoplePhone);

    /**
     * people email to query people details
     * @param peopleEmail user email
     * @return user info
     */
    People findPeopleByPeopleEmailEquals(String peopleEmail);

    /**
     * Query the gender distribution of visitors
     * @return Array [number of men, number of women]
     */
    @Query(value="select count(*), people_gender \n" +
            "from tb_people \n" +
            "group by people_gender\n" +
            "order by people_gender asc",nativeQuery = true)
    int[] findNumberByPeopleGenderAll();

    /**
     * Query the gender distribution of visitors within 7 days
     * @return Array [number of men, number of women]
     */
    @Query(value ="\n" +
            "select count(DISTINCT visit_visitorId) AS peopleNumber, people_gender from \n" +
            "(select visit_visitorId,visitor_peopleId, people_gender, visit_date\n" +
            "From tb_people a, tb_visitor b, tb_visit c\n" +
            "where c.visit_visitorId=b.visitor_id and a.people_id=b.visitor_peopleId\n" +
            "And DATE_SUB( CURDATE( ), INTERVAL 7 DAY ) <= date(c.visit_date)) as total\n" +
            "group by people_gender\n" +
            "order by people_gender asc" ,nativeQuery = true)
    int[] findNumberByPeopleGenderSevenDays();

    /**
     * Query the age distribution of visitors
     * @return Set (age group, number)
     */
    @Query(value="SELECT\n" +
            "\tCASE\n" +
            "WHEN people_age IS NULL THEN\n" +
            "\t'Unknown'\n" +
            "WHEN people_age < 19 THEN\n" +
            "\t'0-18'\n" +
            "WHEN people_age >= 19\n" +
            "AND people_age < 36 THEN\n" +
            "\t'19-36'\n" +
            "WHEN people_age >= 36\n" +
            "AND people_age < 60 THEN\n" +
            "\t'36-59'\n" +
            "WHEN people_age >= 60 THEN\n" +
            "\t'60+'\n" +
            "END AS AgeGroup,\n" +
            " count(*) AS AgeGroupPeople\n" +
            "FROM\n" +
            "\ttb_people\n" +
            "GROUP BY\n" +
            "\tCASE\n" +
            "WHEN people_age IS NULL THEN\n" +
            "\t'Unknown'\n" +
            "WHEN people_age < 19 THEN\n" +
            "\t'0-18'\n" +
            "WHEN people_age >= 19\n" +
            "AND people_age < 36 THEN\n" +
            "\t'19-36'\n" +
            "WHEN people_age >= 36\n" +
            "AND people_age < 60 THEN\n" +
            "\t'36-59'\n" +
            "WHEN people_age >= 60 THEN\n" +
            "\t'60+'\n" +
            "END;",nativeQuery = true)
    List<Map<String,Integer>> findNumberByAgeGroups();

}
