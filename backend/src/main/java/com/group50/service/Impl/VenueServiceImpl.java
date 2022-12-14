package com.group50.service.Impl;

import com.group50.entity.Venue;
import com.group50.repository.VenueRepository;
import com.group50.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class VenueServiceImpl implements VenueService {

    @Autowired
    private VenueRepository venueRepository;

    @Override
    @CachePut(value = "VenueCapacitySpace", key = "#venueId")
    public Venue updateCapacity(Venue venue,int venueId) {
        Venue venueByVenueIdEquals = venueRepository.findVenueByVenueIdEquals(venue.getVenueId());
        venueByVenueIdEquals.setVenueCapacity(venue.getVenueCapacity());
        return venueRepository.save(venueByVenueIdEquals);
    }


}
