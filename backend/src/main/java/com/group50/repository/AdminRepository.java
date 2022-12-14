package com.group50.repository;

import com.group50.entity.Admin;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>{

    /**
     * method name must match fields of entities
     * @param username username
     * @param password password
     * @return user info
     */
    Admin findByAdminUsernameAndAdminPassword(String username,String password);

    /**
     * The administrator id is queried through peopleId of the administrator
     * @param id admin's peopleId
     * @return admin's id
     */
    Admin findAdminByAdminPeopleIdEquals(int id);

    /**
     * The value can be queried by the administrator username
     * @param username username
     * @return result
     */
    Admin findAdminByAdminUsernameEquals(String username);

    /**
     * The administrator information is queried through the administrator adminId and stored in the cache to avoid waste
     * @param id admin's dminId
     * @return admin info
     */
    @Cacheable(value = "adminInfoSpace", key = "#id")
    Admin findAdminByAdminIdEquals(int id);
}
