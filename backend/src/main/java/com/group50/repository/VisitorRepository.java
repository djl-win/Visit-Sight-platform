package com.group50.repository;

import org.springframework.data.jpa.repository.Query;
import com.group50.dto.VisitorRecord;
import com.group50.entity.Visitor;
import java.util.Map;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Integer> {

    @Query(value ="select people_id as id, people_name as name, people_gender as gender, people_age as age, people_email as email, people_phone as phone, DATE_FORMAT( visit_date, '%Y-%m-%d' ) as date \n" +
    "FROM ( select * from tb_visit LEFT JOIN tb_visitor on tb_visitor.visitor_id = tb_visit.visit_visitorId) as S \n" +
    "LEFT JOIN tb_people on S.visitor_peopleId = tb_people.people_id",nativeQuery = true)
    List<Map<String,String>> findAllVisitor();
}
