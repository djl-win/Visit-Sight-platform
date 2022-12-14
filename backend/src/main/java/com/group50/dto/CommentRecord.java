package com.group50.dto;

import lombok.Data;

@Data
public class CommentRecord {

    private Integer commentId;
    private String peopleName;
    private Integer commentRank;
    private String commentDate;
    private String commentContent;

}
