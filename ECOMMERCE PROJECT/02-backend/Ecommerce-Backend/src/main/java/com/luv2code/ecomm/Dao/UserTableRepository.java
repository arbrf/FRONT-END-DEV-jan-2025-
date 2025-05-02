package com.luv2code.ecomm.Dao;

import com.luv2code.ecomm.Entity.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTableRepository extends JpaRepository<UserDTO,Long> {
    UserDTO findByEmail(String email);
}
