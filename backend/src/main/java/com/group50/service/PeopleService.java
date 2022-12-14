package com.group50.service;

public interface PeopleService {

    /**
     * Query the age distribution of visitors
     * @return Array [Number of people aged 0-18, number of people aged 19-35, number of people aged 36-60, number of people aged 60+]
     */
    int[] peopleAgeDistribution();
    /**
     * Query the gender distribution of visitors within 7 days
     * @return Array [number of men, number of women]
     */
    int[] peopleGenderDistributionSevenDays();
    /**
     * Query the gender distribution of visitors
     * @return Array [number of men, number of women]
     */
    int[] peopleGenderDistributionAll();
}
