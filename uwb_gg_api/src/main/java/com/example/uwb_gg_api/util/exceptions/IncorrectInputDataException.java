package com.example.uwb_gg_api.util.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, code = HttpStatus.NOT_FOUND, reason = "Wrong data!")
public class IncorrectInputDataException extends IllegalArgumentException{
    public IncorrectInputDataException(String message) { super(message); }
}
