package com.group50.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "tb_comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;

    @Column(name = "comment_content")
    private String commentContent;

    @Column(name = "comment_rank")
    private Integer commentRank;

    @Column(name = "comment_date")
    private Date commentDate;

    @Column(name = "comment_peopleId")
    private Integer commentPeopleId;

}
