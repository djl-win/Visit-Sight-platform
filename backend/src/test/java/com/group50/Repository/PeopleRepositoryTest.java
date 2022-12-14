package com.group50.Repository;

import com.group50.entity.People;
import com.group50.repository.PeopleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@SpringBootTest
@Transactional
public class PeopleRepositoryTest {

    @Autowired
    private PeopleRepository peopleRepository;

    @Test
    public void testConnection(){
//        People people = new People();
//        people.setPeopleName("Jiale");
//        people.setPeopleGender(1);
//        people.setPeopleAge(23);
//        people.setPeopleEmail("395763745@qq.com");
//        people.setPeoplePhone("0493303279");
//
//        peopleRepository.save(people);

        List<People> all = peopleRepository.findAll();

        all.forEach(System.out::println);

    }
    @Test
    public void testAllPeopleGenderDistribution(){
        int[] genderDistribution;
        genderDistribution=peopleRepository.findNumberByPeopleGenderAll();
        for(int i=0;i<genderDistribution.length;i++)
        {
            System.out.println(genderDistribution[i]);
        }
    }
    @Test
    public void testSevenDaysPeopleGenderDistribution(){
        int[] genderDistribution;
        genderDistribution=peopleRepository.findNumberByPeopleGenderSevenDays();
        for(int i=0;i<genderDistribution.length;i++)
        {
            System.out.println(genderDistribution[i]);
        }
    }
    @Test
    public void testPeopleAgeDistribution(){
        List<Map<String,Integer>> ageDistribution;
        ageDistribution=peopleRepository.findNumberByAgeGroups();
            for (int i=0;i<ageDistribution.size();i++)
            {
                System.out.println(ageDistribution.get(i).get("AgeGroup")+" "+ageDistribution.get(i).get("AgeGroupPeople"));
            }


    }

}
