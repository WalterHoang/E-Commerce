package eCommerce.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import eCommerce.entities.AuthToken;
import eCommerce.entities.Credential;
import eCommerce.entities.Role;
import eCommerce.entities.User;
import eCommerce.exceptions.BadRequest;
import eCommerce.exceptions.ConflictError;
import eCommerce.exceptions.FriendlyServerErrorException;
import eCommerce.exceptions.NotFound;
import eCommerce.interfaces.authentication.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static eCommerce.constants.StringConstants.*;

@Service
public class AuthService implements IAuthService {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public AuthService(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public AuthToken login(Credential credential) {

        String password = credential.getPassword();
        String email = credential.getEmail();
        String userRole = "";
        try{
            if (email != null && password != null) {
                if (!email.equals("user@catalyte.io")
                        && !email.equals("admin@catalyte.io")
                        && !email.equals("customer@catalyte.io")) {
                    List<String> roles = getUserRoleTypes(email, password);
                    if (roles.contains(ADMIN_ROLE)) {
                        userRole = ADMIN_ROLE_TYPE;
                    } else if (roles.contains(EMPLOYEE_ROLE)) {
                        userRole = EMPLOYEE_ROLE_TYPE;
                    } else if (roles.contains(CUSTOMER_ROLE_TYPE)) {
                        userRole = CUSTOMER_ROLE_TYPE;
                    }
                }
                if (email.equals("user@catalyte.io") && password.equals("pass@word1")) {
                    userRole = EMPLOYEE_ROLE_TYPE;
                } else if (email.equals("admin@catalyte.io") && password.equals("pass@word1")) {
                    userRole = ADMIN_ROLE_TYPE;
                } else if (email.equals("customer@catalyte.io") && password.equals("pass@word1")) {
                    userRole = CUSTOMER_ROLE_TYPE;
                }
            } else {
                throw new BadRequest(INVALID_EMAIL_PASSWORD);
            }
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            String jwtToken = JWT.create().withIssuer(ISSUER).withClaim(ROLES_ATTRIBUTE, userRole)
                    .withSubject(email).withIssuedAt(new Date()).sign(algorithm);
            return new AuthToken(jwtToken);
        }catch(ServerErrorException ex){
            throw new FriendlyServerErrorException();
        }
    }

    @Override
    public List<String> getUserRoleTypes(String email, String password) {
        List<String> rolesA = new ArrayList<>();
        if(userService.findUserByEmail(email).getStatusCode() == HttpStatus.OK) {
            User loginUser = userService.findUserByEmail(email).getBody();
            if (loginUser != null) {
                Role[] roles = loginUser.getRole().stream().toArray(Role[]::new);
                if (password.equals(loginUser.getPassword())) {
                    for (Role role : roles) {
                        if (role.getRole().matches(EMPLOYEE_ROLE_TYPE)) {
                            rolesA.add(EMPLOYEE_ROLE);
                        }
                        if (role.getRole().matches(ADMIN_ROLE_TYPE)) {
                            rolesA.add(ADMIN_ROLE);
                        }
                        if (role.getRole().matches(CUSTOMER_ROLE_TYPE)) {
                            rolesA.add(CUSTOMER_ROLE);
                        }
                    }
                    return rolesA;
                } else {
                    throw new ConflictError(PASSWORD_INVALID);
                }
            } else {
                throw new ConflictError(EMAIL_INVALID);
            }
        }else if(userService.findUserByEmail(email).getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR){
            throw new FriendlyServerErrorException();
        }
        else{
            throw new NotFound(INVALID_EMAIL_PASSWORD);
        }
    }

    @Override
    public ResponseEntity<User> signUp(User user) {
        try{
            return userService.createNewUser(user);
        }catch(ServerErrorException ex){
            throw new FriendlyServerErrorException();
        }
    }
}

