package com.example.uwbggbackend.user;


import com.example.uwbggbackend.user.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);
    boolean existsByNick(String nick);
    Optional<User> findUserByNick(String nick);
    Optional<User> findByEmail(String email);
}
