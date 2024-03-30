package com.backend.Backend.Services;


import com.backend.Backend.Entities.User;

public interface UserService {
    User register(User user);
    User login(String username, String password);
}
