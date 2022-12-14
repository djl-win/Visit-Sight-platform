package com.group50.Repository;


import com.group50.entity.Venue;
import com.group50.repository.VenueRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
@Transactional
public class VenueRepositoryTest {

    @Autowired
    private VenueRepository venueRepository;

    @Test
    public void testConnect(){
        Venue venue = venueRepository.findVenueByVenueIdEquals(1);
        System.out.println(venue);

    }
}
