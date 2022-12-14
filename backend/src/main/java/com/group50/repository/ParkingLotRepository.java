package com.group50.repository;


import com.group50.entity.Parkinglot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingLotRepository extends JpaRepository<Parkinglot, Integer> {

}
