package com.shoppingmall.service;

import com.shoppingmall.entity.User;
import com.shoppingmall.repository.IUserRepository;
import com.shoppingmall.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private IUserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void testAddNewUser_Success() {
        User user = new User();
        user.setId(1);
        user.setName("Test User");
        user.setPassword("password123");
        
        when(userRepository.save(any(User.class))).thenReturn(user);
        
        User result = userService.addNewUser(user);
        
        assertNotNull(result);
        assertEquals("Test User", result.getName());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUpdateUser_Success() {
        User user = new User();
        user.setId(1);
        user.setName("Updated User");
        user.setPassword("newpassword");
        
        when(userRepository.save(any(User.class))).thenReturn(user);
        
        User result = userService.updateUser(user);
        
        assertNotNull(result);
        assertEquals("Updated User", result.getName());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testLogin_ValidCredentials() {
        User user = new User();
        user.setId(1);
        user.setPassword("password123");
        
        User existingUser = new User();
        existingUser.setId(1);
        existingUser.setName("Test User");
        existingUser.setPassword("password123");
        
        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));
        
        User result = userService.login(user);
        
        assertNotNull(result);
        assertEquals("Test User", result.getName());
        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void testLogin_InvalidCredentials() {
        User user = new User();
        user.setId(1);
        user.setPassword("wrongpassword");
        
        User existingUser = new User();
        existingUser.setId(1);
        existingUser.setName("Test User");
        existingUser.setPassword("password123");
        
        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));
        
        User result = userService.login(user);
        
        assertNull(result);
        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void testLogin_UserNotFound() {
        User user = new User();
        user.setId(1);
        user.setPassword("password123");
        
        when(userRepository.findById(1)).thenReturn(Optional.empty());
        
        User result = userService.login(user);
        
        assertNull(result);
        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void testLogOut_Success() {
        boolean result = userService.logOut();
        assertTrue(result);
    }
}
