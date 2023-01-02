package com.example.uwbggbackend.authentication;

import com.example.uwbggbackend.authentication.models.ExpiredTokenException;
import com.example.uwbggbackend.user.UserRepository;
import com.example.uwbggbackend.util.exceptions.ForbiddenException;
import com.example.uwbggbackend.util.exceptions.IncorrectIdInputException;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;

@Service
@AllArgsConstructor
public class JwtUtil {
    private final String SECRET_KEY = "dupa";
    private final UserRepository userRepository;

    public String extractId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final var claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails, Integer time) {
        Map<String, Object> claims = new HashMap<>();
        var user = userRepository.findUserByNick(userDetails.getUsername()).get();
        return createToken(claims, user.getId().toString(), time);
    }

    private String createToken(Map<String, Object> claims, String subject, Integer time) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + time))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public String extractBearerFromHeader(String header) throws Exception{
        if (header.startsWith("Bearer ")) {
            return header.substring(7);
        } else {
            throw new Exception("Invalid bearer token structure");
        }
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final var email = userRepository.findById(UUID.fromString(extractId(token))).orElseThrow(() -> new IncorrectIdInputException("Wrong id!")).getNick();

        if (isTokenExpired(token) || !email.equals(userDetails.getUsername())) {
            throw new ExpiredTokenException("Token has expired");
        }
        return true;
    }

    public UUID getIdFromRequest(HttpServletRequest request) throws Exception {
        String token;
        var header = request.getHeader("Authorization");

        if (Objects.isNull(header)) {
            throw new ForbiddenException();
        }

        token = extractBearerFromHeader(header);

        return UUID.fromString(extractId(token));
    }

    public Boolean validateToken(String token, HttpServletRequest httpServletRequest) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        }catch (SignatureException ex){
            System.out.println("Invalid JWT Signature");
        }catch (MalformedJwtException ex){
            System.out.println("Invalid JWT token");
        }catch (ExpiredTokenException ex){
            System.out.println("Expired JWT token");
            httpServletRequest.setAttribute("expired",ex.getMessage());
        }catch (UnsupportedJwtException ex){
            System.out.println("Unsupported JWT exception");
        }catch (IllegalArgumentException ex){
            System.out.println("Jwt claims string is empty");
        }
        return false;
    }
}
