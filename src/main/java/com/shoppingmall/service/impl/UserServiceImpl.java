// User - T140100337_Malla Ashish
package com.shoppingmall.service.impl;

import com.shoppingmall.entity.User;
import com.shoppingmall.repository.IUserRepository;
import com.shoppingmall.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public User addNewUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User login(User user) {
        User existingUser = userRepository.findById(user.getId()).orElse(null);
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return existingUser;
        }
        return null;
    }

    @Override
    public boolean logOut() {
        return true;
    }

    @Override
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User searchUser(Integer id) {
        return userRepository.findById(id).orElse(null);
    }
}
