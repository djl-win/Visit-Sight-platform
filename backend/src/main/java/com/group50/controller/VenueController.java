package com.group50.controller;

import com.group50.entity.Venue;
import com.group50.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/venues")
public class VenueController {

    @Autowired
    private VenueService venueService;

    /**
     * PUT，address http://localhost:8080/5619/venues/modifyVenueCapacity
     * {
     *    "venueId" : "1",
     *    "venueCapacity" : "30"
     * }
     * @param venue Venue json format, see interface documentation
     * @return Correct return 200 return code. Unknown exception returns 100 code.
     */
    @PutMapping("/modifyVenueCapacity")
    private String modifyVenueCapacity(@RequestBody Venue venue){
       venueService.updateCapacity(venue,venue.getVenueId());
       return "Ok";
    }


}
