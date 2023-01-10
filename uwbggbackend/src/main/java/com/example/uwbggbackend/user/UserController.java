package com.example.uwbggbackend.user;

import com.example.uwbggbackend.security.AuthenticationFacade;
import com.example.uwbggbackend.user.models.UserEditDTO;
import com.example.uwbggbackend.user.models.UserNewPasswordDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserServiceImpl userService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping("/{nick}")
    @ResponseStatus(HttpStatus.OK)
    public List<UserSearchDTO> getUsersByNick(@PathVariable("nick") String nick) {
        return userService.findByNick(nick);
    }

    @PutMapping
    @ResponseStatus(code = HttpStatus.NO_CONTENT, reason = "Resource updated successfully")
    public void editUser(@RequestBody UserEditDTO dto) {
        userService.updateAnUser(authenticationFacade.getCurrentAuthenticatedUserId(), dto);
    }

    @PutMapping("newPassword")
    @ResponseStatus(code = HttpStatus.ACCEPTED, reason = "Password changed successfully")
    public void changePassword(@RequestBody UserNewPasswordDTO userNewPassword) {
        userService.changePassword(authenticationFacade.getCurrentAuthenticatedUser(), userNewPassword);
    }
}
