package com.example.uwbggbackend.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, code = HttpStatus.CONFLICT, reason = "Account with such username exists!")
public class WrongUsernameException extends RuntimeException {
    public WrongUsernameException(String message) {
        super("Account with such username exists!");
    }
}
