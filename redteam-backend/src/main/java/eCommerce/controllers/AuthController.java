package eCommerce.controllers;

import eCommerce.entities.AuthToken;
import eCommerce.entities.Credential;
import eCommerce.entities.User;
import eCommerce.exceptions.BadRequest;
import eCommerce.exceptions.ConflictError;
import eCommerce.exceptions.FriendlyServerErrorException;
import eCommerce.interfaces.authentication.IAuthController;
import eCommerce.services.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerErrorException;

@RestController
@Api(value = "Authentication Controller", produces = "Produces a token, upon login, or allows someone to sign up.")
public class AuthController implements IAuthController {

    @Autowired
    private AuthService authService;

    /**
     * The login will "post" their credentials, from which we will determine their role and if they are in the system.
     * @param credential
     * @return Status of OK, and logged into system.
     */

    @PostMapping("/login")
    @ApiOperation("Posts the login information.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = AuthToken.class)
    })
    @Override
    public ResponseEntity<AuthToken> login(@RequestBody Credential credential) {
        try {
            return new ResponseEntity<>(authService.login(credential), HttpStatus.OK);
        } catch (Exception err) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Creates a new user in the system
     *
     * @param user Object containing user info
     * @return the added user
     */
    @PostMapping("/signUp")
    @ApiOperation("Creates a new user in the system")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created", response = User.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 400, message = "Bad Request", response = BadRequest.class),
            @ApiResponse(code = 409, message = "Conflict", response = ConflictError.class),
    })
    public ResponseEntity<User> signUp(@RequestBody User user) {
        try {
            return authService.signUp(user);
        } catch (ServerErrorException exc) {
            throw new FriendlyServerErrorException();
        }

    }


    /**
     * Gets the role information associated with the user who is logged in.
     * @return the role associated with the user.
     */
    @Override
    @GetMapping(value = "/login/roles")
    @ApiOperation("Gets the role associated with the user who has logged in.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK")
    })
    public String getRole() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            return authentication.getAuthorities().toArray()[0].toString();
        }catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }
    }
}
