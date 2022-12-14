package com.group50.controller;

import com.group50.entity.Parkinglot;
import com.group50.service.ParkinglotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/parkinglots")
public class ParkinglotController {

    @Autowired
    private ParkinglotService parkinglotService;

    /**
     * Query car Park information
     * Get，address: http://localhost:8080/5619/parkinglots
     *  {
     *    "data": {
     *       "parkinglotId": 1,
     *       "parkinglotLocation": "Maar Street",
     *       "parkinglotCapacity": 200,
     *       "parkinglotCurrentFlow": 32
     *     },
     *    "code": 200,
     *    "msg": "Success"
     *   }
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @GetMapping
    public Parkinglot findParkingLot(){
        return parkinglotService.findParkinglot();
    }

    /**
     * put，address: http://localhost:8080/5619/parkinglots/modifyCapacity/#
     * Modifying Parking lot Capacity Parking lot information
     * @param capacity The capacity to modify
     * @return 200 Return code is displayed if the query is successful. Unknown exception returns 100 code.
     */
    @PutMapping("/modifyCapacity/{capacity}")
    public String modifyCapacity(@PathVariable int capacity){
        parkinglotService.modifyCapacity(capacity);
        return "Ok";
    }

}
