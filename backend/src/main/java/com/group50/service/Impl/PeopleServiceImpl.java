package com.group50.service.Impl;

import com.alibaba.fastjson.JSON;
import com.group50.repository.PeopleRepository;
import com.group50.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PeopleServiceImpl implements PeopleService {

    @Autowired
    private PeopleRepository peopleRepository;

    /* Query the number of people in different age ranges */
    @Override
    public int[] peopleAgeDistribution(){
        int[] ageGroup= new int[4];
        List<Map<String,Integer>> ageDistribution=peopleRepository.findNumberByAgeGroups();
        for (int i=0;i<ageDistribution.size();i++)
        {
            ageGroup[i]=Integer.valueOf(JSON.toJSONString(ageDistribution.get(i).get("AgeGroupPeople")));
        }
        return ageGroup;
    }

    /* Query the number of different genders on the 7th day */
    @Override
    public int[] peopleGenderDistributionSevenDays(){
        return peopleRepository.findNumberByPeopleGenderSevenDays();
    }

    /* Query all persons of different genders */
    @Override
    public int[] peopleGenderDistributionAll(){
        return peopleRepository.findNumberByPeopleGenderAll();
    }
}
