package com.group50.service.Impl;

import com.group50.entity.Parkinglot;
import com.group50.repository.ParkingLotRepository;
import com.group50.service.ParkinglotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParkinglotServiceImpl implements ParkinglotService {

    @Autowired
    private ParkingLotRepository parkingLotRepository;

    @Override
    public Parkinglot findParkinglot() {
        Optional<Parkinglot> byId = parkingLotRepository.findById(1);
        return byId.get();
    }

    @Override
    public void modifyCapacity(int capacity) {
        Optional<Parkinglot> byId = parkingLotRepository.findById(1);
        if(byId.isPresent()){
            Parkinglot parkinglot = byId.get();
            parkinglot.setParkinglotCapacity(capacity);
            parkingLotRepository.save(parkinglot);
        }
    }
}
