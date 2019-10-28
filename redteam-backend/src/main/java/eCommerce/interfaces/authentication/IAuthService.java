package eCommerce.interfaces.authentication;

import eCommerce.entities.AuthToken;
import eCommerce.entities.Credential;
import eCommerce.entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IAuthService {
    AuthToken login(Credential credential);
    List<String> getUserRoleTypes(String email, String password);
    ResponseEntity<User> signUp(User user);
}
