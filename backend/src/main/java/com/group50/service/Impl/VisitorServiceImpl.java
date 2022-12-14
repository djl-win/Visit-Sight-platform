package com.group50.service.Impl;

import com.alibaba.fastjson.JSON;
import com.github.javafaker.Faker;
import com.group50.entity.Comment;
import com.group50.entity.People;
import com.group50.entity.Visitor;
import com.group50.repository.CommentRepository;
import com.group50.repository.PeopleRepository;
import com.group50.repository.VisitorRepository;
import com.group50.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.group50.dto.VisitorRecord;
import java.util.Map;

import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.List;

@Service
public class VisitorServiceImpl implements VisitorService {

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public ArrayList<Visitor> newFakeVisitors() {

        //Generate random 1-20 fake user data
        Faker faker = new Faker(new Locale("en-AU"));
        int visitNumbers = (int) (Math.random() * 20 + 1);
        ArrayList<Visitor> visitors = new ArrayList<>();

        for (int i = 0; i < visitNumbers; i++) {

            //1.Generate a random people record and insert it into the database
            People fakePeople = new People();
            fakePeople.setPeopleName(faker.name().name());
            fakePeople.setPeopleGender((int) (Math.random() * 2 + 1)); //The random gender of 1,2
            fakePeople.setPeopleAge((int) (Math.random() * 80 + 1)); //1-80 year
            fakePeople.setPeopleEmail(faker.funnyName().name().replace(" ", "").replace(".", "") + "@gmail.com");
            fakePeople.setPeoplePhone(faker.phoneNumber().phoneNumber());

            //2.Insert the fake data into the database
            People newPeople = peopleRepository.save(fakePeople);

            //3.Get the id of the new people as the foreign key to the visitor
            int newPeopleId = newPeople.getPeopleId();
            Visitor visitor = new Visitor();
            visitor.setVisitorPeopleId(newPeopleId);
            visitor.setVisitorVisitTimes(1);

            Comment fakeComment = new Comment();

            fakeComment.setCommentContent(faker.shakespeare().asYouLikeItQuote());
            fakeComment.setCommentRank((int) (Math.random() * 5 + 1)); //1-5 Random score
            fakeComment.setCommentDate(new Date());
            fakeComment.setCommentPeopleId(newPeopleId);
            commentRepository.save(fakeComment);


            //4.Add a visitor record
            visitors.add(visitorRepository.save(visitor));
        }

        return visitors;
    }

         /*query all visitor record*/
         @Override
         public List<VisitorRecord> searchAllVisitorRecord(){
            List<Map<String, String>> visitorRecord = visitorRepository.findAllVisitor();
            String s = JSON.toJSONString(visitorRecord);
            return JSON.parseArray(s, VisitorRecord.class);
         }
}
