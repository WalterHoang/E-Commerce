package eCommerce.interfaces.authentication;

import eCommerce.entities.AuthToken;
import eCommerce.entities.Credential;
import org.springframework.http.ResponseEntity;

public interface IAuthController {
    ResponseEntity<AuthToken> login(Credential credential);
    String getRole();
}
