package com.group50.controller;
import com.group50.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/people")
public class PeopleController {
    @Autowired
    private PeopleService peopleService;

    /**
     * Query for gender-specific user profiles of visitors
     * Get，address: http://localhost:8080/5619/people/genderPortrait/all
     * {
     * "data": [
     *  （boy）2345,
     *  （girl） 2248
     *  ],
     * "code": 200,
     * "msg": "Success"
     }
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/genderPortrait/all")
    public int[] genderDistributionAll(){
        return peopleService.peopleGenderDistributionAll();
    }

    /**
     * Query gender-specific profiles of visitors within 7 days
     * Get，address: http://localhost:8080/5619/people/genderPortrait/all
     * {
     * "data": [
     *  （boy）364,
     *  （girl）363
     *  ],
     * "code": 200,
     * "msg": "Success"
     }
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/genderPortrait/sevendays")
    public int[] genderDistributionSevenday(){
        return peopleService.peopleGenderDistributionSevenDays();
    }

    /**
     * Query the user profile related to the visitor's age
     * Get，address: http://localhost:8080/5619/people/genderPortrait/all
     * {
     * "data": [
     *  （0-18）1055,
     *  （19-35）965，
     *  （36-59）1360，
     *  （60+）1213
     *  ],
     * "code": 200,
     * "msg": "Success"
     }
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping("/agePortrait")
    public int[] ageDistribution(){
        return peopleService.peopleAgeDistribution();
    }
}
