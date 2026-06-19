//package com.example.payment.security;
//
//import com.example.payment.model.User;
//import com.example.payment.repository.UserRepository;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.*;
//import org.springframework.stereotype.Service;
//
//import java.util.Collections;
//
//@Service
//public class UserDetailsServiceImpl implements UserDetailsService {
//
//    private final UserRepository userRepository;
//
//    public UserDetailsServiceImpl(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username)
//            throws UsernameNotFoundException {
//
//        User user = userRepository.findByUsername(username);
//
//        if (user == null) {
//            throw new UsernameNotFoundException(
//                    "User not found: " + username);
//        }
//
//        return new org.springframework.security.core.userdetails.User(
//                user.getUsername(),
//                user.getPassword(),
//                Collections.singletonList(
//                        new SimpleGrantedAuthority(user.getRole())
//                )
//        );
//    }
//}
//


package com.example.payment.security;

import com.example.payment.model.User;
import com.example.payment.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

// Spring will create an object of this class automatically
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // Repository used to communicate with database
    private final UserRepository userRepository;

    // Constructor Injection
    // Spring automatically passes UserRepository object here
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Spring Security automatically calls this method
    // whenever it needs user information
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        // Search database using username
        // Spring Data JPA automatically generates SQL:
        // SELECT * FROM users WHERE username = ?
        User user = userRepository.findByUsername(username);

        // If no user found, throw exception
        if (user == null) {
            throw new UsernameNotFoundException(
                    "User not found: " + username);
        }

        // Convert our User Entity into Spring Security UserDetails
        return new org.springframework.security.core.userdetails.User(

                // Username stored in database
                user.getUsername(),

                // Encrypted password stored in database
                user.getPassword(),

                // User roles/permissions
                List.of(
                        new SimpleGrantedAuthority("ROLE_USER")
                )
        );
    }
}
