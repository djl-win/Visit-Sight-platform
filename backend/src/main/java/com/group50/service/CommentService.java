package com.group50.service;

import com.group50.dto.CommentRecord;
import com.group50.exception.CustomException;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Transactional(timeout = -1, rollbackFor = {Exception.class, CustomException.class})
public interface CommentService {
    /**
     * Query all comments
     * @return A collection of reviews
     */
    List<CommentRecord> searchAllComment();
}
