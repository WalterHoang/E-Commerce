package eCommerce.services;

import eCommerce.entities.User;
import eCommerce.exceptions.BadRequest;
import eCommerce.exceptions.ConflictError;
import eCommerce.exceptions.FriendlyServerErrorException;
import eCommerce.exceptions.NotFound;
import eCommerce.interfaces.user.IUserDao;
import eCommerce.interfaces.user.IUserService;
import eCommerce.services.validation.UserValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

import java.util.List;

import static eCommerce.constants.StringConstants.*;

@Service
public class UserService implements IUserService {

    private UserValidation userValid = new UserValidation();

    @Autowired
    private IUserDao udao;


    /**
     * This method gets a list of users
     *
     * @return a list of users
     */
    @Override
    public ResponseEntity<List<User>> getUsers()
    {
        try {
            return new ResponseEntity<>(udao.getUsers(), HttpStatus.OK);
        } catch (ServerErrorException exc) {
            throw new FriendlyServerErrorException();
        }
    }

    @Override
    public ResponseEntity<List<User>> getUsersByPhone(String phoneNum) {
        try {
            if (udao.getUsersByPhone(phoneNum).size() >= 1) {
                return new ResponseEntity<>(udao.getUsersByPhone(phoneNum), HttpStatus.OK);
            }
            throw new NotFound(USER_NOT_FOUND);
        } catch (ServerErrorException exc) {
            throw new FriendlyServerErrorException();
        }

    }

    /**
     * This method searches for a user by email
     *
     * @param email a user's email
     * @return a user if found
     */
    @Override
    public ResponseEntity<User> findUserByEmail(String email) {
        try {
            if (udao.findUserByEmail(email).isPresent()) {
                return new ResponseEntity<>(udao.findUserByEmail(email).get(), HttpStatus.OK) ;
            } else {
                throw new NotFound(USER_NOT_FOUND);
            }
        } catch (ServerErrorException exc) {
            throw new FriendlyServerErrorException();
        }
    }

    @Override
    public ResponseEntity<User> getUserById(Integer id) {
        try {
            if (udao.getUserById(id).isPresent()) {
                return new ResponseEntity<>(udao.getUserById(id).get(), HttpStatus.OK);
            } else {
                throw new NotFound(USER_NOT_FOUND);
            }
        } catch (ServerErrorException exc) {
            throw new FriendlyServerErrorException();
        }
    }

    /**
     * This method creates a new user
     *
     * @param user object with user info
     * @return the added user
     */
    @Override
    public ResponseEntity<User> createNewUser(User user) {
        try {
            if (udao.findUserByEmail(user.getEmail()).isPresent()) {
                throw new ConflictError(USER_EMAIL_CONFLICT);
            } else if (!userValid.validateUserData(user)) {
                throw new BadRequest(USER_VALIDATION_FAILED);
            }
            return new ResponseEntity<>(udao.createNewUser(user), HttpStatus.CREATED);
        } catch (ServerErrorException exc) {
            throw new FriendlyServerErrorException();
        }
    }

    /**
     * Updates a user in the system
     *
     * @param id   id of user currently in system
     * @param user object containing new user info
     * @return object with id of old user and info of new user
     */
    @Override
    public ResponseEntity<User> updateUser(Integer id, User user) {
        try {
            if (udao.getUserById(id).isPresent()) {
                if (udao.findUserByEmail(user.getEmail()).isPresent()) {
                    if (udao.findUserByEmail(user.getEmail()).get().getId().equals(id)) {
                        if (userValid.validateUserData(user)) {
                            return new ResponseEntity<>(udao.updateUser(id, user), HttpStatus.OK);
                        } else {
                            throw new BadRequest(USER_VALIDATION_FAILED);
                        }
                    }
                    throw new ConflictError(USER_EMAIL_CONFLICT);
                } else {
                    if (userValid.validateUserData(user)) {
                        return new ResponseEntity<>(udao.updateUser(id, user), HttpStatus.OK);
                    } else {
                        throw new BadRequest(USER_VALIDATION_FAILED);
                    }
                }
            } else {
                throw new NotFound(NOT_FOUND);
            }
        } catch (ServerErrorException exc) {
            throw new FriendlyServerErrorException();
        }


    }

    /**
     * Removes a user from database
     *
     * @param id of user to remove
     * @return http status code 204
     */
    @Override
    public ResponseEntity removeUser(Integer id) {
        try {
            if (udao.getUserById(id).isPresent()) {
                udao.removeUser(id);
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            } else {
                throw new NotFound(NOT_FOUND);
            }
        } catch (ServerErrorException exc) {
            throw new FriendlyServerErrorException();
        }
    }
}
