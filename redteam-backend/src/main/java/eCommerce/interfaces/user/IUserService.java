package eCommerce.interfaces.user;

import eCommerce.entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService {
    ResponseEntity<List<User>> getUsers();

    ResponseEntity<List<User>> getUsersByPhone(String phoneNum);

    ResponseEntity<User> findUserByEmail(String email);

    ResponseEntity<User> getUserById(Integer id);

    ResponseEntity<User> createNewUser(User user);

    ResponseEntity<User> updateUser(Integer id, User user);

    ResponseEntity removeUser(Integer id);
}
