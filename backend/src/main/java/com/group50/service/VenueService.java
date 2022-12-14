package com.group50.service;

import com.group50.entity.Venue;
import com.group50.exception.CustomException;
import org.springframework.transaction.annotation.Transactional;

@Transactional(timeout = -1, rollbackFor = {Exception.class, CustomException.class})

public interface VenueService {

    /**
     * Modification of venue capacity
     * @param venue Incoming front-end data
     */
    Venue updateCapacity(Venue venue,int venueId);

}
