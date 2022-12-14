package com.group50.Repository;

import com.group50.entity.Admin;
import com.group50.repository.AdminRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
@SpringBootTest
//@Transactional
public class AdminRepositoryTest {
    @Autowired
    private AdminRepository adminRepository;

    @Test
    public void testInsert(){
        Admin admin = new Admin();
        admin.setAdminUsername("admin");
        admin.setAdminPassword("admin");
        admin.setAdminPeopleId(1);
        adminRepository.save(admin);
//        adminRepository.deleteById(1);
    }
}
