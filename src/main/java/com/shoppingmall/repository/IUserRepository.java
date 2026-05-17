// User - T140100337_Malla Ashish
package com.shoppingmall.repository;

import com.shoppingmall.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    // All CRUD operations are provided by JpaRepository
}
