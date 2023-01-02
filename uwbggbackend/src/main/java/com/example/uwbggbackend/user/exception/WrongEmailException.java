package com.example.uwbggbackend.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, code = HttpStatus.CONFLICT, reason = "Account with such email exists!")
public class WrongEmailException extends RuntimeException {
    public WrongEmailException(String message) {
        super("Account with such email exists!");
    }
}
