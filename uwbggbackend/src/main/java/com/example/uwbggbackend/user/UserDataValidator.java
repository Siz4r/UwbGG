package com.example.uwbggbackend.user;

import com.example.uwbggbackend.user.exception.WrongEmailException;
import com.example.uwbggbackend.user.exception.WrongUsernameException;
import com.example.uwbggbackend.user.models.UserRegisterDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserDataValidator {
    private final UserRepository userRepository;

    public void validateUserWebInput(UserRegisterDTO webInput) {
        checkIfUserWithSuchUsernameExists(webInput.getNick());
        checkIfUserWithSuchEmailExists(webInput.getEmail());
    }

    private void checkIfUserWithSuchEmailExists(String email) {
        if (userRepository.existsByEmail(email)) throw new WrongEmailException("User with such email already exists!");
    }

    private void checkIfUserWithSuchUsernameExists(String username) {
        if (userRepository.existsByNick(username)) {
            throw new WrongUsernameException("User with such username already exists!");
        }
    }
}
