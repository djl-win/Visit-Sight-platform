package com.group50.repository;

import com.group50.entity.Venue;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Integer> {

    @Cacheable(value = "VenueCapacitySpace", key = "#venueId")
    Venue findVenueByVenueIdEquals(int venueId);

}
