package com.group50.service.Impl;

import com.alibaba.fastjson.JSON;
import com.group50.dto.CommentRecord;
import com.group50.dto.HistoryVisitRecord;
import com.group50.repository.CommentRepository;
import com.group50.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<CommentRecord> searchAllComment() {
        List<Map<String, String>> allComments = commentRepository.findAllComments();
        String s = JSON.toJSONString(allComments);

        return JSON.parseArray(s, CommentRecord.class);
    }
}
