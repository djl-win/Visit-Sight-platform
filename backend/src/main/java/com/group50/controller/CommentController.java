package com.group50.controller;

import com.group50.dto.CommentRecord;
import com.group50.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    /**
     * Query all comments
     *
     *  {
     *           "commentId": 1,
     *            "peopleName": "Adam Heaney",
     *            "commentRank": 2,
     *            "commentDate": "2022-10-13 22:20:46",
     *            "commentContent": "I like this place and willingly could waste my time in it."
     *   },
     *   {
     *           "commentId": 2,
     *            "peopleName": "Violet Monahan",
     *            "commentRank": 2,
     *            "commentDate": "2022-10-13 22:20:46",
     *            "commentContent": "Blow, blow, thou winter wind! Thou art not so unkind as man's ingratitude."
     *   },
     * Get，address http://localhost:8080/5619/comments/allComments
     * @return If the user enters a correct verification code, 200 is returned. Unknown exception returns 100 code.
     */
    @GetMapping("/allComments")
    public List<CommentRecord> allComments(){
        return commentService.searchAllComment();
    }
}
