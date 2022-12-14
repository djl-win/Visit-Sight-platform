package com.group50.repository;

import com.group50.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {


    /**
     * query all comments
     * @return list（comment info）
     */
    @Query(value ="SELECT a.comment_id as commentId, b.people_name as peopleName, a.comment_rank as commentRank,DATE_FORMAT(a.comment_date, '%Y-%m-%d %H:%i:%s' ) as commentDate, a.comment_content as commentContent\n" +
            "from tb_comment as a join tb_people as b on a.comment_peopleId = b.people_id\n" +
            "ORDER BY a.comment_date",nativeQuery = true)
    List<Map<String,String>> findAllComments();

}
