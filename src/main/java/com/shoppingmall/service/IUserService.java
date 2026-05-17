// User - T140100337_Malla Ashish
package com.shoppingmall.service;

import com.shoppingmall.entity.User;

public interface IUserService {
    User addNewUser(User user);
    User updateUser(User user);
    User login(User user);
    boolean logOut();
    Iterable<User> getAllUsers();
    User searchUser(Integer id);
}
