package com.backend.Backend.Controllers;

import com.backend.Backend.Entities.Product;
import com.backend.Backend.Entities.User;
import com.backend.Backend.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;
    private boolean loggedin = false;
    private User loggedInUser = null;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.register(user);
            return ResponseEntity.ok(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        User loggedInUser = userService.login(username, password);
        if (loggedInUser != null) {
            this.loggedin = true;
            this.loggedInUser = loggedInUser;
            return loggedInUser;
        } else {
            return null;
        }
    }

    @GetMapping("/isLoggedIn")
    public ResponseEntity<Boolean> isLoggedIn(HttpServletRequest request) {
        return ResponseEntity.ok(loggedin);
    }

    @GetMapping("/userInfo")
    public ResponseEntity<User> getUserInfo() {
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.notFound().build(); // User not found, return 404
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        this.loggedin = false;
        this.loggedInUser = null;
        return ResponseEntity.ok("Logged out successfully");
    }

    @PutMapping("/updateProfile")
    public ResponseEntity<User> updateProfile(@RequestBody User updatedUser) {
        User updatedUserProfile = userService.updateProfile(updatedUser);

        if (updatedUserProfile != null) {
            return ResponseEntity.ok(updatedUserProfile);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update")
    public User updateProduct(@RequestBody User user){
        return userService.updateUser(user);
    }

    @GetMapping("/user/{idUser}")
    public User getUserById(@PathVariable("idUser") Long idUser){
        return userService.getUserById(idUser);
    }

}
