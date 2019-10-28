package eCommerce.controllers;

import eCommerce.entities.User;
import eCommerce.exceptions.BadRequest;
import eCommerce.exceptions.ConflictError;
import eCommerce.exceptions.FriendlyServerErrorException;
import eCommerce.exceptions.NotFound;
import eCommerce.interfaces.user.IUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerErrorException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/users")
@Api(value = "This is the controller for the users.", produces = "This is the base package for the User endpoints.")
public class UserController {
    public List<User> users = new ArrayList<>();
    @Autowired
    private IUserService svc;

    /**
     * This method gets a list of users
     *
     * @return a list of users
     */
    @GetMapping
    @ApiOperation("Gets all Users in the system.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseContainer = "List", response = User.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class)
    })
    public ResponseEntity<List<User>> getUsers() {
        return svc.getUsers();
    }

    /**
     * Gets a user by id
     *
     * @param id user's id
     * @return a user if found
     */
    @GetMapping(value = "/{id}")
    @ApiOperation("Gets a user by id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = User.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        return svc.getUserById(id);
    }

    @GetMapping(value = "/phone")
    @ApiOperation("Gets a user by phone#")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = User.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity<List<User>> getUsersByPhone(@RequestParam String phoneNum) {
        return svc.getUsersByPhone(phoneNum);
    }

    /**
     * This method is used to get a user by email
     * Note: this method may not be used and the auth controller
     * may be used instead
     *
     * @param email the user's email
     * @return the user if found
     */
    @GetMapping(value = "/email")
    @ApiOperation("Gets a user by email.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = User.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        return svc.findUserByEmail(email);
    }

    /**
     * Creates a new user in the system
     *
     * @param user Object containing user info
     * @return the added user
     */
    @PostMapping(value = "/signUp")
    @ApiOperation("Creates a new user in the system")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created", response = User.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 400, message = "Bad Request", response = BadRequest.class),
            @ApiResponse(code = 409, message = "Conflict", response = ConflictError.class),
    })
    public ResponseEntity<User> createNewUser(@RequestBody User user) {

        return svc.createNewUser(user);


    }

    /**
     * Updates a selected user
     *
     * @param id   id of user to update
     * @param user object containing new user info
     * @return the new user with the old user's id
     */
    @PutMapping(value = "/{id}")
    @ApiOperation("Updates a selected user.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = User.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 400, message = "Bad Request", response = BadRequest.class),
            @ApiResponse(code = 409, message = "Conflict", response = ConflictError.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class),
    })
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
        return svc.updateUser(id, user);
    }

    /**
     * Removes a user by id
     *
     * @param id of user to remove
     * @return http status code 204
     */
    @DeleteMapping(value = "/{id}")
    @ApiOperation("Removes a user by id.")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "No Content"),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity removeUser(@PathVariable Integer id) {
        return svc.removeUser(id);
    }
}
