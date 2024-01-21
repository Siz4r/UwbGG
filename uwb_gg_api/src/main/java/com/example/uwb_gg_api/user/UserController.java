package com.example.uwb_gg_api.user;

import com.example.uwb_gg_api.security.ActiveUserStore;
import com.example.uwb_gg_api.security.AuthenticationFacade;
import com.example.uwb_gg_api.user.models.UserEditDTO;
import com.example.uwb_gg_api.user.models.UserNewPasswordDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserServiceImpl userService;
    private final AuthenticationFacade authenticationFacade;

    private final ActiveUserStore activeUserStore;
    @Qualifier("sessionRegistry")
    private final SessionRegistry sessionRegistry;

    @GetMapping("/loggedUsers")
    public void getLoggedUsers(Locale locale, Model model) {
        model.addAttribute("users", activeUserStore.getUsers());
        sessionRegistry.getAllPrincipals().stream()
                .map(principal -> sessionRegistry.getAllSessions(principal, false))
                .forEach(System.out::println);
    }

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
