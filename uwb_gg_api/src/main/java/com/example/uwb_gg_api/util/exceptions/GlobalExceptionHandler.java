package com.example.uwb_gg_api.util.exceptions;

import com.example.uwb_gg_api.authentication.models.ExpiredTokenException;
import com.example.uwb_gg_api.user.exception.WrongEmailException;
import com.example.uwb_gg_api.user.exception.WrongUsernameException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler({WrongEmailException.class,
            WrongUsernameException.class,
            BadCredentialsException.class,
            IllegalArgumentException.class})
    public ResponseEntity<Object> registerSimpleTextExceptions(RuntimeException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception) {
        Map<String, String> body = new HashMap<>();
        for (FieldError e : exception.getFieldErrors()) {
            body.put(e.getField(), e.getDefaultMessage());
        }
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(IncorrectInputDataException.class)
    public ResponseEntity<String> handleNotFoundResourceException(IncorrectInputDataException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<String> handleExpiredTokenException(ExpiredTokenException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
    }
}