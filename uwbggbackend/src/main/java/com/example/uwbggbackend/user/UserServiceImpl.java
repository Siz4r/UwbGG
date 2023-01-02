package com.example.uwbggbackend.user;

import com.example.uwbggbackend.user.models.User;
import com.example.uwbggbackend.user.models.UserEditDTO;
import com.example.uwbggbackend.user.models.UserNewPasswordDTO;
import com.example.uwbggbackend.user.models.UserRegisterDTO;
import com.example.uwbggbackend.util.exceptions.IncorrectIdInputException;
import com.example.uwbggbackend.util.exceptions.IncorrectInputDataException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserDataValidator userDataValidator;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ModelMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findUserByNick(username).orElseThrow(() -> new IncorrectInputDataException("Wrong username"));
        return new org.springframework.security.core.userdetails.User(user.getNick(), user.getPassword(), new ArrayList<>());
    }

    public UUID addUser(UserRegisterDTO dto) {
        userDataValidator.validateUserWebInput(dto);

        var password = bCryptPasswordEncoder.encode(dto.getPassword());

        var user = mapper.map(dto, User.class);
        user.setId(UUID.randomUUID());

        user.setPassword(password);
        return userRepository.save(user).getId();
    }



    public String getNick(UUID id) {
        return getUser(id).getNick();
    }

    public void updateAnUser(UUID id, UserEditDTO input) {
        var user = getUser(id);

        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        mapper.map(input, user);

        userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        User user = userRepository.findUserByNick(username).orElseThrow(() -> new IncorrectInputDataException("User with given username doesn't exist"));
        return mapper.map(user, User.class);
    }

    public User getUser(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new IncorrectIdInputException("Wrong id!"));
    }

    public void changePassword(User currentAuthenticatedUser, UserNewPasswordDTO userNewPassword) {
        if (!currentAuthenticatedUser.getPassword().equals(bCryptPasswordEncoder.encode(userNewPassword.getCurrentPassword()))) {
            throw new BadCredentialsException("Passwords don't match");
        }

        var newPassword = bCryptPasswordEncoder.encode(userNewPassword.getNewPassword());
        currentAuthenticatedUser.setPassword(newPassword);

        userRepository.save(currentAuthenticatedUser);
    }
}
