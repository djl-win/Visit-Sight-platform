package com.group50.utils;

import com.group50.entity.Parkinglot;
import com.group50.repository.ParkingLotRepository;
import com.group50.service.VisitService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Regularly add visitors to the database tool class, provide access to information
 * Eight threads, each thread executes 40s, 6 seconds to start a thread
 */
@Component
@EnableScheduling
@EnableAsync
@Data
public class ScheduleUtil {

    @Autowired
    private VisitService visitService;

    @Autowired
    private ParkingLotRepository parkingLotRepository;

    //Control timer start or close, this is not a very good design, because these threads are always occupied
    private boolean pause = true;

    @Async
    @Scheduled(fixedDelay = 6000)
    public void test(){

        if(pause) return;

        try {

            visitService.visitorsAccessSimulation();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    /**
     * Simulated car entry
     */
    @Scheduled(fixedDelay = 10000)
    public void vehicleSimulate(){
        Optional<Parkinglot> byId = parkingLotRepository.findById(1);
        boolean present = byId.isPresent();

        if(present){
            int flagA = (int) (Math.random() * 2 + 1);

//            System.out.println(flagA);

            Parkinglot parkinglot = byId.get();

            if(parkinglot.getParkinglotCurrentFlow() <= parkinglot.getParkinglotCapacity() && parkinglot.getParkinglotCurrentFlow() >=0) {
                if(flagA == 1){
                    parkinglot.setParkinglotCurrentFlow(parkinglot.getParkinglotCurrentFlow() + (int) (Math.random() * 5 + 1));
                }else{
                    int temp = parkinglot.getParkinglotCurrentFlow() - (int) (Math.random() * 5 + 1);
                    if (temp >= 0) {
                        parkinglot.setParkinglotCurrentFlow(temp);
                    }
                }
            }
            parkingLotRepository.save(parkinglot);
        }

//        System.out.println(byId);
    }

}
