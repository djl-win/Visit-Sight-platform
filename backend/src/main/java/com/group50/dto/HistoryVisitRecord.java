package com.group50.dto;

import lombok.Data;

import java.util.Date;


@Data
public class HistoryVisitRecord {
    private String date;
    private int visitorNumber;
    private String venueId;
}
