package com.group50.controller;

import com.group50.common.Result;
import com.group50.utils.ScheduleUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Control timer start and stop, click the button to start timer insert visitor data
 */
@RestController
@RequestMapping("/schedulers")
public class SchedulerController {

    @Autowired
    private ScheduleUtil scheduleUtil;

    /**
     * GET，address http://localhost:8080/5619/schedulers/stop
     *
     * @return The timer is successfully shut down. 200 Return code is displayed. Unknown exception returns 100 code.
     */
    @GetMapping(value = "/stop")
    public Result stopSchedule() {
        scheduleUtil.setPause(true);
        return Result.success();
    }

    /**
     * GET，address: http://localhost:8080/5619/schedulers/start
     *
     * @return The timer is successfully started. 200 Return code is displayed. Unknown exception returns 100 code.
     */
    @GetMapping(value = "/start")
    public Result startSchedule() {
        scheduleUtil.setPause(false);
        return Result.success();
    }
}
